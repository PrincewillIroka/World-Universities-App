import React from 'react';
import { Platform, StyleSheet, YellowBox, View, AsyncStorage, StatusBar } from 'react-native';
import FallingDrawer from 'react-native-falling-drawer';
import Home from './src/views/Home';
import Suggestions from './src/views/Suggestions';
import AppDeveloper from './src/views/AppDeveloper';
import Favourites from './src/views/Favourites';


export default function App() {

  (async function () {
    console.disableYellowBox = true
    YellowBox.ignoreWarnings([
      'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
    ])
    let favourites = await AsyncStorage.getItem('favourites')
    if (!favourites) {
      AsyncStorage.setItem('favourites', JSON.stringify([]))
    }
  })()


  const SCREENS = [
    {
      key: "home",
      name: "Universities",
      color: "#ec667a",
      titleColor: "#fff",
      hamburgerColor: "#fff",
      render: () => <View style={styles.container}><Home /></View>
    },
    {
      key: "suggestions",
      name: "Suggestions",
      color: "#355878",
      titleColor: "#fff",
      hamburgerColor: "#fff",
      render: () => <View style={styles.container}><Suggestions /></View>
    },
    {
      key: "app_developer",
      name: "App Developer",
      color: "#ec667a",
      titleColor: "#fff",
      hamburgerColor: "#fff",
      render: () => <View style={styles.container}><AppDeveloper /></View>
    },
    {
      key: "fav_universities",
      name: "Favourites",
      color: "#355878",
      titleColor: "#fff",
      hamburgerColor: "#fff",
      render: () => <View style={styles.container}><Favourites /></View>
    }
  ]

  return (
    <FallingDrawer screens={SCREENS} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
});
