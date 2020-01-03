import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View, Text, AsyncStorage } from 'react-native'
import { connect } from "react-redux";
import NetInfo from '@react-native-community/netinfo'
import SearchLayout from '../components/SearchLayout'
import MainLayout from '../components/MainLayout'
import { url } from '../config/config'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


export default function AllUniversities() {

    const [state, setState] = useState({
        isLoading: true,
        isLoading2: false,
        universitiesData: [],
        searchText: '',
        criterion: 'getUniversitiesByCountry',
        name: '',
        country: 'United States',
        index: 0,
        number: 10,
        refreshData: false
    })

    useEffect(() => {
        getUserCountry()
    }, [])

    getUserCountry = () => {
        fetch(`http://api.ipstack.com/197.210.64.28?access_key=b545d1c2218d973a3dfdaaedb41eabe3`)
            .then((response) => response.json())
            .then(async (responseJson) => {
                const { country_name } = responseJson
                if (country_name) {
                    await setState({
                        ...state, country: country_name,
                    })
                }
                fetchUniversitiesData()
            })
            .catch((error) => {
                console.error(error);
            });
    }

    fetchUniversitiesData = () => {
        const newUrl = url + '/' + state.criterion
        const data = {
            name: state.name,
            country: state.country,
            index: state.index,
            number: state.number
        }
        fetch(newUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {

                if (data.length > 0) {

                    (function () {
                        AsyncStorage.getItem('favourites').then(async result => {
                            let newData = [], favourites = [], mData = []
                            if (result) {
                                if (result.length > 0) {
                                    favourites = JSON.parse(result)
                                }
                            }


                            if (favourites.length > 0) {
                                mData = data.map(dt => {
                                    const fav = favourites.find(favourite => favourite.name == dt.name)
                                    if (fav != 'undefined' && fav != null) {
                                        dt.isInFavourite = true
                                    } else {
                                        dt.isInFavourite = false
                                    }
                                    return dt
                                })
                            } else {
                                mData = data
                            }

                            state.refreshData ? newData = mData : newData = [...state.universitiesData, ...mData]
                            await setState({
                                ...state, isLoading: false, isLoading2: false, universitiesData: newData,
                                index: (state.index + 10)
                            })


                        })

                    })()

                } else {
                    if (state.index >= 10) {
                        data = state.universitiesData
                    }
                    setState({
                        ...state, isLoading: false, isLoading2: false,
                        universitiesData: data
                    })
                }
            })

    }

    checkNetwork = () => {
        let isConnected = false
        NetInfo.fetch().then(state => {
            isConnected = state.isConnected
            if (isConnected) {
            }
        })
        return isConnected
    }

    handleSearch = async () => {
        // if (checkNetwork)
            fetchUniversitiesData()
    }

    handleScrollToBottom = async () => {
        if (state.index >= 10) {
            await setState({ ...state, isLoading2: true, refreshData: false })
            fetchUniversitiesData()
        }
    }

    handleAddToFavourites = async (uName) => {
        const newUniversitiesData = state.universitiesData.map(ud => {
            if (ud.name == uName) {
                ud.isInFavourite = true
            }
            return ud
        })
        setState({ ...state, universitiesData: newUniversitiesData })
    }

    handleRemoveFromFavourites = async (uName) => {
        const newUniversitiesData = state.universitiesData.map(ud => {
            if (ud.name == uName) {
                ud.isInFavourite = false
            }
            return ud
        })
        setState({ ...state, universitiesData: newUniversitiesData })
    }

    contentLayout = () => {
        // if (!checkNetwork) {
        //     return (
        //         <View style={styles.emptyLayout}>
        //             <MaterialIcons name="network-check" size={60} color="gray" />
        //             <Text style={styles.emptyText}>Please check your network connection.</Text>
        //         </View>
        //     )
        // } else {
            return (
                !state.isLoading && state.universitiesData.length <= 0 ? (
                    <View style={styles.emptyLayout}>
                        <FontAwesome name="graduation-cap" size={60} color="gray" />
                        <Text style={styles.emptyText}>None Found</Text>
                    </View>
                ) : !state.isLoading ? (
                    <View style={styles.contentLayout}>
                        <MainLayout parentLayout='AllUniversities'
                            universitiesData={state.universitiesData}
                            addToFavourites={uName => {
                                handleAddToFavourites(uName)
                            }}
                            removeFromFavourites={(uName) => {
                                handleRemoveFromFavourites(uName)
                            }}
                            scrolledToBottom={() => {
                                handleScrollToBottom()
                            }} />
                        {state.isLoading2 && <View style={styles.bottomLoader}>
                            <ActivityIndicator size="small" color="#ec667a" />
                        </View>}
                    </View>
                ) : (
                            <View style={styles.spinnerLayout}>
                                <ActivityIndicator size="large" color="#ec667a" />
                            </View>)
            )
        // }
    }

    return (
        <View style={styles.container}>
            <SearchLayout setSearchText={async (text, searchByName, searchByCountry) => {
                let name = '', country = ''
                searchByName ? name = text : country = text
                await setState({
                    ...state, searchText: text, isLoading: true,
                    name, country, refreshData: true, index: 0
                })
                handleSearch()
            }} setSearchCriterion={async criterion => {
                await setState({ ...state, criterion: criterion })
            }} />
            {contentLayout()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#eee',
        height: '100%'
    },
    spinnerLayout: {
        flexDirection: 'row',
        height: '80%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyLayout: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    emptyText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        color: 'gray'
    },
    contentLayout: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    bottomLoader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        paddingBottom: 5
    }
});

