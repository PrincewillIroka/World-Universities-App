import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native'
import SearchLayout from '../components/SearchLayout'
import MainLayout from '../components/MainLayout'

export default function AllUniversities() {

    const [state, setState] = useState({
        isLoading: true,
        universitiesData: [],
        searchText: 'United States',
        url: `http://universities.hipolabs.com/search?country=`
    })

    useEffect(() => {
        fetchUniversitiesData()
    }, [])

    fetchUniversitiesData = async () => {
        const newUrl = state.url + state.searchText
        await fetch(newUrl)
            .then(response => response.json())
            .then(data => {
                const newData = data.splice(0, 4)
                setState({ ...state, isLoading: false, universitiesData: newData })
                // console.log(newData)
            })

    }

    return (
        <View style={styles.container}>
            <SearchLayout />
            {state.isLoading ? (
                <View style={styles.spinnerLayout}>
                    <ActivityIndicator size="large" color="#ec667a" />
                </View>
            ) : (<MainLayout universitiesData={state.universitiesData} />)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
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

