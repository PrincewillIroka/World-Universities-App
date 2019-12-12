import React from 'react'
import { StyleSheet, Text, View, } from 'react-native';

export default function WebsiteModal() {
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Text>
                    WebsiteModal
            </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container2: {
        width: '90%',
        height: '90%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column'
    },
});


