import React from 'react'
import {
    StyleSheet, View, Text, FlatList, TouchableOpacity,
    SafeAreaView,
} from 'react-native'

export default function MainLayout({ universitiesData }) {

    renderGridItem = ({ universityData, index }) => (
        <TouchableOpacity>
            <View style={styles.cardContainer}>
                <Text>{index}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <FlatList
                    data={universitiesData}
                    keyExtractor={universityData => universityData.name}
                    renderItem={this.renderGridItem}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        paddingTop: 30,
    },
    cardContainer: {
        backgroundColor: '#fff',
        marginBottom: 15,
        height: 120,
        shadowColor: '#fff',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2
    }
});
