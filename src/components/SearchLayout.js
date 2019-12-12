import React, { useState } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity, Keyboard } from 'react-native';
import CheckBox from 'react-native-check-box'
import FeatherIcon from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function SearchLayout({ setSearchText, setSearchCriterion }) {

    const [state, setState] = useState({
        searchByName: false,
        searchByCountry: true,
        searchText: ''
    })

    changeSearchCriterion = () => {
        if (state.searchByName) {
            setSearchCriterion('getUniversitiesByName')
        } else if (state.searchByCountry) {
            setSearchCriterion('getUniversitiesByCountry')
        }
    }

    clearSearchText = () => {
        setState({ ...state, searchText: '' })
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <TextInput style={styles.searchBar} placeholder='Search'
                    defaultValue={state.searchText}
                    onChangeText={value => setState({ ...state, searchText: value })} />
                {state.searchText != '' && <View style={styles.clearSearchContainer}>
                    <TouchableOpacity onPress={() => {
                        clearSearchText()
                    }}>
                        <AntDesign name="closecircleo" size={20} color="gray" />
                    </TouchableOpacity>
                </View>}
                <TouchableOpacity style={styles.searchButton} onPress={() => {
                    if (state.searchText) {
                        setSearchText(state.searchText)
                        Keyboard.dismiss()
                    }
                }}>
                    <FeatherIcon name="search" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.optionsContainer}>
                <CheckBox
                    style={styles.checkBoxStyle}
                    onClick={async () => {
                        await setState({
                            ...state, searchByName: !state.searchByName,
                            searchByCountry: !state.searchByCountry
                        })
                        changeSearchCriterion()
                    }}
                    isChecked={state.searchByName}
                    leftText={"Name of University"}
                />
                <CheckBox
                    style={[styles.checkBoxStyle, styles.checkBoxStyle1]}
                    onClick={async () => {
                        await setState({
                            ...state, searchByName: !state.searchByName,
                            searchByCountry: !state.searchByCountry
                        })
                        changeSearchCriterion()
                    }}
                    isChecked={state.searchByCountry}
                    leftText={"Country"}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        padding: 8,
        paddingTop: 16,
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    searchBarContainer: {
        height: 40,
        display: 'flex',
        flexDirection: 'row',
    },
    optionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        alignItems: 'center'
    },
    checkBoxStyle: {
        flex: 1,
        padding: 5
    },
    checkBoxStyle1: {
        marginLeft: 10
    },
    searchBar: {
        backgroundColor: '#eee',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        flex: 1,
        height: '100%',
        fontSize: 16,
        paddingLeft: 16
    },
    clearSearchContainer: {
        backgroundColor: '#eee',
        width: '20%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchButton: {
        width: '20%',
        backgroundColor: '#ec667a',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 1,
        borderColor: '#ec667a',
    }
});

