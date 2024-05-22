import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Clipboard
} from "react-native";
import Toast from "react-native-simple-toast";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { WebView } from 'react-native-webview';

export default function WebsiteModal({ activeUniData, closeModal }) {
  const [state, setState] = useState({
    visible: true,
    hasFailedToLoad: false,
    hideWebView: false
  });

  copyToClipBoard = async () => {
    await Clipboard.setString(activeUniData);
    Toast.show("Copied to clipboard!", Toast.SHORT);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.header}>
          <TouchableWithoutFeedback
            onLongPress={() => {
              copyToClipBoard();
            }}
          >
            <Text style={styles.uniText}>{activeUniData}</Text>
          </TouchableWithoutFeedback>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              closeModal();
            }}
          >
            <AntDesign name="close" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          {!state.hideWebView && (
            <WebView
              style={styles.webView}
              onLoad={() => {
                setState({ ...state, visible: false });
              }}
              onError={() => {
                setState({ ...state, hasFailedToLoad: true, hideWebView: true });
              }}
              source={{ uri: activeUniData }}
            />
          )}
          {state.visible && (
            <View style={styles.spinnerContainer}>
              <ActivityIndicator color="#ec667a" size="large" />
            </View>
          )}
          {state.hasFailedToLoad && (
            <View style={styles.emptyLayout}>
              <MaterialIcons name="error-outline" size={60} color="gray" />
              <Text style={styles.emptyText}>
                Sorry! World Universities couldn't
              </Text>
              <Text style={styles.emptyText2}>
                find this page now.
              </Text>
              <Text style={styles.emptyText3}>
                We'll get it soon. Thanks
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  container2: {
    width: "95%",
    height: "90%",
    backgroundColor: "rgba(0,0,0, 0.5)",
    borderRadius: 3,
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0, 0.5)",
    alignItems: "center"
  },
  body: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0, 0.5)"
  },
  spinnerContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  webView: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0, 0.5)"
  },
  uniText: {
    fontSize: 16,
    color: "#fff"
  },
  closeButton: {
    marginLeft: 10
  },
  emptyLayout: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    color: "gray"
  },
  emptyText2: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray"
  },
  emptyText3: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    color: "gray"
  }
});
