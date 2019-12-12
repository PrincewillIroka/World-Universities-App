import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import ProfilePic from '../assets/portfolio_pic.jpg'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Foundation from 'react-native-vector-icons/Foundation'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function AppDeveloper() {

    loadInBrowser = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileInfoContainer}>
                <Image source={ProfilePic} style={styles.profilePic} />
                <Text style={styles.profileName}>Princewill Iroka</Text>
                <Text style={styles.profileDescription}>Software Developer with experience at developing web and mobile apps.</Text>
            </View>
            <View style={styles.profileDetailsContainer}>
                <View style={styles.singleRow}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="laptop" size={15} color="#fff" />
                    </View>
                    <Text>React, React Native, Vue JS, and Node JS</Text>
                </View>
                <View style={styles.singleRow}>
                    <View style={styles.iconContainer}>
                        <Foundation name="web" size={15} color="#fff" />
                    </View>
                    <TouchableOpacity onPress={() => { loadInBrowser('https://princewilliroka.com') }}>
                        <Text style={styles.singleRowText}>https://princewilliroka.com</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.singleRow}>
                    <View style={styles.iconContainer}>
                        <AntDesign name="github" size={15} color="#fff" />
                    </View>
                    <TouchableOpacity onPress={() => { loadInBrowser('https://github.com/PrincewillIroka') }}>
                        <Text style={styles.singleRowText}>https://github.com/PrincewillIroka</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.singleRow}>
                    <View style={styles.iconContainer}>
                        <AntDesign name="twitter" size={15} color="#fff" />
                    </View>
                    <TouchableOpacity onPress={() => { loadInBrowser('https://twitter.com/PrincewilIroka') }}>
                        <Text style={styles.singleRowText}>https://twitter.com/PrincewilIroka</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.singleRow}>
                    <View style={styles.iconContainer}>
                        <AntDesign name="linkedin-square" size={15} color="#fff" />
                    </View>
                    <TouchableOpacity onPress={() => { loadInBrowser('https://www.linkedin.com/in/princewill-iroka') }}>
                        <Text style={styles.singleRowText}>https://www.linkedin.com/in/princewill-iroka</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.actionColumn}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5 }}>Have a Project ?</Text>
                    <Text>Feel free to contact me using any of the handles above.</Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fafafa'
    },
    profileInfoContainer: {
        width: '75%',
        padding: 16,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center'
    },
    profilePic: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    profileName: {
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 10
    },
    profileDescription: {
        fontSize: 13,
        marginTop: 10,
        textAlign: 'center'
    },
    profileDetailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
        paddingTop: 30,
    },
    singleRow: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        width: 20,
        backgroundColor: '#222',
        marginRight: 10,
        borderRadius: 3
    },
    singleRowText: {
        color: '#3366ff'
    },
    actionColumn: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 30
    }

})


