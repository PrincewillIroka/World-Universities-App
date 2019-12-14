import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import FallingDrawer from 'react-native-falling-drawer';
import AllUniversities from './src/views/AllUniversities';
import About from './src/views/About';
import AppDeveloper from './src/views/AppDeveloper';
import Favourites from './src/views/Favourites';


export default function App() {

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
  },
});
