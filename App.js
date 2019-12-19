import React from 'react';
import { Platform, StyleSheet, YellowBox, View, AsyncStorage, StatusBar } from 'react-native';
import FallingDrawer from 'react-native-falling-drawer';
import AllUniversities from './src/views/AllUniversities';
import About from './src/views/About';
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
      key: "all_universities",
      name: "All Universities",
      color: "#ec667a",
      titleColor: "#fff",
      hamburgerColor: "#fff",
      render: () => <View style={styles.container}><AllUniversities /></View>
    },
    {
      key: "about_app",
      name: "About App",
      color: "#695777",
      titleColor: "#fff",
      hamburgerColor: "#fff",
      render: () => <View style={styles.container}><About /></View>
    },
    {
      key: "app_developer",
      name: "App Developer",
      color: "#355878",
      titleColor: "#fff",
      hamburgerColor: "#fff",
      render: () => <View style={styles.container}><AppDeveloper /></View>
    },
    {
      key: "fav_universities",
      name: "Favourites",
      color: "rgb(182, 119, 3)",
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
    marginTop: Platform.OS === 'ios' ? 60 : 50,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});
