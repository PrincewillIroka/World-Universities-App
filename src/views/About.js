import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import Logo from '../assets/logo.png'

export default function About() {
    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logoImage} />
            <Text style={styles.aboutText} >
                This app provides users with information about
                thousands of universities around the world. From the app,
                users can also access the official websites of these institutions
                too.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    logoImage: {
        height: 170,
        width: '55%',
        marginTop: '20%'
    },
    aboutText: {
        marginTop: '20%',
        textAlign: 'center',
        width: '90%',
        fontSize: 16,
        lineHeight: 25,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        color: '#666',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        fontWeight: 'bold'
    }
});


