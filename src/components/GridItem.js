import React from 'react'
import {
    StyleSheet, View, Text, TouchableOpacity,
} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'

const colors = [
    '#000066', '#ff0040', '#0040ff', '#C7C750', '#F95A05', '#54C750', '#50C7C7',
    '#000066', '#ff0040', '#0040ff'
]

const generateAlias = (name) => {
    const arr = name.split(' ')
    return `${arr[0].charAt(0)}${arr[1].charAt(0)}`
}

export default function GridItem({ universityData, index }) {
    return (
        <TouchableOpacity style={styles.cardContainer}>
            <View style={styles.cardLayout}>
                <View style={styles.multiLayout1}>
                    <Text style={[styles.aliasText, { backgroundColor: '#ddd' }]}>{generateAlias(universityData.name)}</Text>
                    <Text style={styles.nameText} numberOfLines={2} >{universityData.name}</Text>
                </View>
                <View style={styles.multiLayout2}>
                    <TouchableOpacity style={styles.goToWebsiteLayout}>
                        <Text style={styles.goToWebsiteText}>Visit Website</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Entypo name="heart-outlined" size={20} color="#ec667a" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
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
    aliasText: {
        borderRadius: 50,
        fontSize: 16,
        padding: 10,
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
