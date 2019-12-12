import React, { useState, useEffect } from 'react'
import {
    StyleSheet, View, Text, FlatList, TouchableOpacity,
    SafeAreaView, ScrollView, Modal
} from 'react-native'
import GridItem from './GridItem'
import WebsiteModal from './WebsiteModal'

export default function MainLayout({ universitiesData, scrolledToBottom }) {

    const [state, setState] = useState({
        modalIsOpen: false
    })

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 0;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    return (
        <SafeAreaView style={styles.container}>
            {state.modalIsOpen && (
                <Modal
                    animationType="slide"
                    transparent
                    visible={state.modalIsOpen}
                    onRequestClose={() => {
                        setState({
                            ...state,
                            modalIsOpen: false
                        })
                    }}
                >
                    <WebsiteModal />
                </Modal>
            )}
            <ScrollView showsVerticalScrollIndicator={false}
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        scrolledToBottom();
                    }
                }}
                scrollEventThrottle={400}>
                <View style={styles.gridLayout}>
                    {universitiesData.map((universityData, index) => {
                        return <GridItem universityData={universityData} index={index} key={index}
                            openWebsite={(website) => {
                                if (website) {
                                    setState({
                                        ...state,
                                        modalIsOpen: true
                                    })
                                }
                            }} />
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
