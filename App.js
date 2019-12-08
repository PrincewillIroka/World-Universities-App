import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import FallingDrawer from 'react-native-falling-drawer';
import AllUniversities from './src/views/AllUniversities'


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
      key: "fav_universities",
      name: "Favourite Universities",
      color: "#f8af91",
      titleColor: "#fff",
      hamburgerColor: "#fff",
      render: () => <View style={styles.container}><Text>Favourite Universities</Text></View>
    },
    {
      key: "about_app",
      name: "About App",
      color: "#695777",
      titleColor: "#fff",
      hamburgerColor: "#fff",
      render: () => <View style={styles.container}><Text>About App</Text></View>
    },
    {
      key: "app_developer",
      name: "App Developer",
      color: "#355878",
      titleColor: "#fff",
      hamburgerColor: "#fff",
      render: () => <View style={styles.container}><Text>App Developer</Text></View>
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
