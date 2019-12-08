import React, { useState } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box'
import FeatherIcon from 'react-native-vector-icons/Feather'

export default function SearchLayout() {

    const [state, setState] = useState({
        searchByName: true,
        searchByCountry: false
    })

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <TextInput style={styles.searchBar} placeholder='Search' />
                <TouchableOpacity style={styles.searchButton}>
                    <FeatherIcon name="search" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.optionsContainer}>
                <CheckBox
                    style={styles.checkBoxStyle}
                    onClick={() => {
                        setState({ ...state, searchByName: !state.searchByName, searchByCountry: false })
                    }}
                    isChecked={state.searchByName}
                    leftText={"Name of University"}
                />
                <CheckBox
                    style={[styles.checkBoxStyle, styles.checkBoxStyle1]}
                    onClick={() => {
                        setState({ ...state, searchByName: false, searchByCountry: !state.searchByCountry })
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
        width: '85%',
        height: '100%',
        fontSize: 16,
        paddingLeft: 16
    },
    searchButton: {
        flex: 1,
        backgroundColor: '#ec667a',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 1,
        borderColor: '#ec667a',
    }
});

