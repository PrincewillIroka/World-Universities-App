import React, { useState, useEffect } from 'react'
import {
    StyleSheet, View, SafeAreaView, ScrollView, Modal
} from 'react-native'
import GridItem from './GridItem'
import WebsiteModal from './WebsiteModal'

export default function MainLayout({ parentLayout, universitiesData,
    scrolledToBottom, addToFavourites, removeFromFavourites }) {

    const [state, setState] = useState({
        modalIsOpen: false,
        activeUniData: ''
    })

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    closeModal = () => {
        setState({
            ...state,
            modalIsOpen: false
        })
    }

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
                    <WebsiteModal activeUniData={state.activeUniData} closeModal={() => {
                        closeModal()
                    }} />
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
                        return <GridItem parentLayout={parentLayout} universityData={universityData}
                            itemIndex={index} key={index}
                            addToFavourites={uName => {
                                addToFavourites(uName)
                            }}
                            removeFromFavourites={uName => {
                                removeFromFavourites(uName)
                            }}
                            openWebsite={(website) => {
                                if (website) {
                                    setState({
                                        ...state,
                                        activeUniData: universityData.web_pages[0],
                                        modalIsOpen: true,
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
