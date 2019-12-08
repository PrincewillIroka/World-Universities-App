import React from 'react'
import {
    StyleSheet, View, Text, FlatList, TouchableOpacity,
    SafeAreaView, ScrollView
} from 'react-native'
import GridItem from './GridItem'

export default function MainLayout({ universitiesData }) {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <FlatList
                    data={universitiesData}
                    keyExtractor={universityData => universityData.name}
                    renderItem={this.renderGridItem}
                    horizontal={false}
                    numColumns={2}
                    contentContainerStyle={styles.gridLayout} /> */}
                <View style={styles.gridLayout}>
                    {universitiesData.map((universityData, index) => {
                        return <GridItem universityData={universityData} index={index} key={index} />
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
    },
    gridLayout: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    }
});
