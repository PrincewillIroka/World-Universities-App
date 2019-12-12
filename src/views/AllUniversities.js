import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View, Text, AsyncStorage } from 'react-native'
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
        country: 'Nigeria',
        index: 0,
        number: 10
    })

    useEffect(() => {
        fetchUniversitiesData()
    }, [])

    fetchUniversitiesData = async () => {
        // const newUrl = state.url + state.searchText
        const newUrl = url + '/' + state.criterion
        const data = {
            name: state.name,
            country: state.country,
            index: state.index,
            number: state.number
        }
        await fetch(newUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                let newData = []
                if (state.index >= 10) {
                    newData = [...state.universitiesData, ...data]
                } else {
                    newData = data
                }
                setState({
                    ...state, isLoading: false, isLoading2: false, universitiesData: newData,
                    index: (state.index + 10)
                })
            })

    }

    checkNetwork = () => {
        let isConnected = false
        NetInfo.fetch().then(state => {
            isConnected = state.isConnected
        })
        return isConnected
    }

    handleSearch = () => {
        if (checkNetwork)
            fetchUniversitiesData()
    }

    handleScrollToBottom = async () => {
        if (state.index >= 10) {
            await setState({ ...state, isLoading2: true })
            fetchUniversitiesData()
        }
    }

    (async function () {
        AsyncStorage.getItem('favourites').then(favourites => {
            if (!favourites) {
                AsyncStorage.setItem('favourites', JSON.stringify([])).then()
            }
        })

    })()

    contentLayout = () => {
        if (!checkNetwork) {
            return (
                <View style={styles.emptyLayout}>
                    <MaterialIcons name="network-check" size={60} color="gray" />
                    <Text style={styles.emptyText}>Please check your network connection.</Text>
                </View>
            )
        } else {
            return (
                state.isLoading ? (
                    <View style={styles.spinnerLayout}>
                        <ActivityIndicator size="large" color="#ec667a" />
                    </View>
                ) : state.universitiesData.length <= 0 ? (
                    <View style={styles.emptyLayout}>
                        <FontAwesome name="graduation-cap" size={60} color="gray" />
                        <Text style={styles.emptyText}>None Found</Text>
                    </View>
                ) : (
                            <View style={styles.contentLayout}>
                                <MainLayout universitiesData={state.universitiesData}
                                    scrolledToBottom={() => {
                                        handleScrollToBottom()
                                    }} />
                                {state.isLoading2 && <View style={styles.bottomLoader}>
                                    <ActivityIndicator size="small" color="#ec667a" />
                                </View>}
                            </View>
                        )
            )
        }
    }

    return (
        <View style={styles.container}>
            <SearchLayout setSearchText={async text => {
                await setState({
                    ...state, searchText: text, isLoading: true,
                    name: text, country: text
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

