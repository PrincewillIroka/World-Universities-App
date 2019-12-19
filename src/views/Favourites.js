import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import MainLayout from '../components/MainLayout'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function Favourites() {

    const [state, setState] = useState({
        isLoading: true,
        universitiesData: [],
        index: 0,
        number: 10,
    })

    useEffect(() => {
        fetchUniversitiesData()
    }, [])

    fetchUniversitiesData = () => {
        AsyncStorage.getItem('favourites').then(async result => {
            let nData = []
            if (result) {
                if (result.length > 0) {
                    nData = JSON.parse(result)
                }
            }
            await setState({
                ...state, isLoading: false, universitiesData: nData
            })
        })
    }

    handleRemoveFromFavourites = (uName) => {
        const newUniversitiesData = state.universitiesData.filter(ud => ud.name != uName)
        setState({ ...state, universitiesData: newUniversitiesData })
    }

    return (
        <View style={styles.container}>
            {state.isLoading ? (
                <View style={styles.spinnerLayout}>
                    <ActivityIndicator size="large" color="rgb(182, 119, 3)" />
                </View>
            ) : state.universitiesData.length <= 0 ? (
                <View style={styles.emptyLayout}>
                    <FontAwesome name="graduation-cap" size={60} color="gray" />
                    <Text style={styles.emptyText}>None Found</Text>
                </View>
            ) : (
                        <View style={styles.contentLayout}>
                            <MainLayout parentLayout='Favourites'
                                universitiesData={state.universitiesData}
                                removeFromFavourites={(index) => {
                                    handleRemoveFromFavourites(index)
                                }} />
                        </View>
                    )}</View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#eee',
        height: '100%'
    },
    spinnerLayout: {
        flexDirection: 'row',
        height: '100%',
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


