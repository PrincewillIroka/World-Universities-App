import React, { useState } from 'react'
import {
    StyleSheet, View, Text, TouchableOpacity,
    AsyncStorage
} from 'react-native'
import Toast from 'react-native-simple-toast'
import Entypo from 'react-native-vector-icons/Entypo'

export default function GridItem({ universityData, index, openWebsite, addToFavourites }) {

    const [state, setState] = useState({
        uniData: universityData
    })


    isInFavourites = (universityData) => {
        let value = false
        // AsyncStorage.getItem('favourites').then(result => {
        //     if (result.length > 0) {
        //         console.log(result.length)
        //         let favourites = JSON.parse(result)
        //         const fav = favourites.find(favourite => favourite.name == universityData.name)
        //         if (fav) {
        //             value = true
        //         }
        //     }
        // })
        return value
    }

    addToFavourites = async (universityData) => {
        let favourites = await AsyncStorage.getItem('favourites'), fav = {}
        if (favourites) {
            favourites = JSON.parse(favourites)
            if (favourites.length > 0) {
                fav = favourites.find(favourite => favourite.name == universityData.name)
                if (!fav) {
                    favourites.push(universityData)
                }
            } else {
                favourites.push(universityData)
                AsyncStorage.setItem('favourites', JSON.stringify(favourites)).then()
                let dummy = await AsyncStorage.getItem('favourites')
                console.log(dummy)
                Toast.show(
                    'Added to favourites',
                    Toast.SHORT
                )
            }
        }
    }

    generateAlias = (name) => {
        const arr = name.split(' ')
        return `${arr[0].charAt(0)}${arr[1].charAt(0)}`
    }

    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardLayout}>
                <View style={styles.multiLayout1}>
                    <View style={styles.aliasContainer}>
                        <Text style={styles.aliasText}>{generateAlias(state.uniData.name)}</Text>
                    </View>
                    <Text style={styles.nameText} numberOfLines={2} >{state.uniData.name}</Text>
                </View>
                <View style={styles.multiLayout2}>
                    <TouchableOpacity style={styles.goToWebsiteLayout} onPress={() => {
                        openWebsite(state.uniData.web_pages[0])
                    }}>
                        <Text style={styles.goToWebsiteText}>Visit Website</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        addToFavourites(state.uniData)
                    }}>
                        {isInFavourites(state.uniData) ? (
                            <Entypo name="heart" size={20} color="#ec667a" />
                        ) : (
                                <Entypo name="heart-outlined" size={20} color="#ec667a" />
                            )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        marginBottom: 15,
        height: 150,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 2,
        borderRadius: 3,
        width: '48%',
        padding: 5,
        paddingTop: 8,
        paddingBottom: 10
    },
    cardLayout: {
        display: 'flex',
        flexDirection: 'column'
    },
    multiLayout1: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '75%',
        marginBottom: 10,
    },
    aliasContainer: {
        borderRadius: 20,
        backgroundColor: '#ddd',
        height: 35,
        width: 35,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    aliasText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ec667a'
    },
    nameText: {
        textAlign: 'center'
    },
    multiLayout2: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    goToWebsiteLayout: {

    },
    goToWebsiteText: {
        fontSize: 11,
        color: '#fff',
        backgroundColor: '#ec667a',
        borderRadius: 3,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 5,
        paddingBottom: 5
    }
});
