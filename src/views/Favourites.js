import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import MainLayout from '../components/MainLayout'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function Favourites() {

    const [state, setState] = useState({
        isLoading: true
    })

    return (
        state.isLoading ? (
            <View style={styles.spinnerLayout}>
                <ActivityIndicator size="large" color="#ec667a" />
            </View>
        ) : state.universitiesData.length <= 0 ? (
            <View style={styles.emptyLayout}>
                <FontAwesome name="graduation-cap" size={60} color="gray" />
                <Text style={styles.emptyText}>None Found</Text>
            </View>
        ) : (
                    <View style={styles.contentLayout}>
                        <MainLayout universitiesData={state.universitiesData}
                            scrolledToBottom={() => {
                                handleScrollToBottom()
                            }} />
                        {state.isLoading2 && <View style={styles.bottomLoader}>
                            <ActivityIndicator size="small" color="#ec667a" />
                        </View>}
                    </View>
                )
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
});


