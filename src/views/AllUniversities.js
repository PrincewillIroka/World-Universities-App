import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native'
import SearchLayout from '../components/SearchLayout'
import MainLayout from '../components/MainLayout'
import { url } from '../config/config'

export default function AllUniversities() {

    const [state, setState] = useState({
        isLoading: true,
        universitiesData: [],
        searchText: 'United States',
        url: `http://universities.hipolabs.com/search?country=`,
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
                console.log(data)
                setState({ ...state, isLoading: false, universitiesData: data })
            })

    }

    return (
        <View style={styles.container}>
            <SearchLayout setSearchText={async text => {
                await setState({ ...state, searchText: text })
            }} />
            {state.isLoading ? (
                <View style={styles.spinnerLayout}>
                    <ActivityIndicator size="large" color="#ec667a" />
                </View>
            ) : <MainLayout universitiesData={state.universitiesData} />}
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
    }
});

