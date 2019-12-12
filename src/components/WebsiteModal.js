import React, { useState } from 'react'
import {
    StyleSheet, Text, View, TouchableOpacity,
    WebView, ActivityIndicator, TouchableWithoutFeedback,
    Clipboard
} from 'react-native';
import Toast from 'react-native-simple-toast'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function WebsiteModal({ activeUniData, closeModal }) {

    const [state, setState] = useState({
        visible: true
    })

    hideSpinner = () => {
        setState({ ...state, visible: false });
    }

    copyToClipBoard = async () => {
        await Clipboard.setString(activeUniData)
        Toast.show(
            'Copied to clipboard!',
            Toast.SHORT
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <View style={styles.header}>
                    <TouchableWithoutFeedback onLongPress={() => {
                        copyToClipBoard()
                    }}>
                        <Text style={styles.uniText}>{activeUniData}</Text>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity style={styles.closeButton} onPress={() => {
                        closeModal()
                    }}>
                        <AntDesign name="close" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <WebView
                        style={styles.webView}
                        onLoad={() => hideSpinner()}
                        source={{ uri: activeUniData }}
                    />
                    {state.visible && (
                        <View style={styles.spinnerContainer}>
                            <ActivityIndicator color="#ec667a" size="large" />
                        </View>
                    )}
                </View>
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
        justifyContent: 'center',
        borderRadius: 5
    },
    container2: {
        width: '90%',
        height: '90%',
        backgroundColor: 'rgba(0,0,0, 0.5)',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0, 0.5)',
        alignItems: 'center'
    },
    body: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0, 0.5)'
    },
    spinnerContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    webView: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0, 0.5)'
    },
    uniText: {
        fontSize: 16,
        color: '#fff'
    },
    closeButton: {
        marginLeft: 10
    }
});


