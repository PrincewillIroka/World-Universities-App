import React from 'react'
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import MainLayout from '../components/MainLayout'

export default function Favourites() {
    return (
        <View style={styles.container}>
            <Text>
                Favourite Files
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
});


