import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import FallingDrawer from "react-native-falling-drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./src/views/Home";
import Suggestions from "./src/views/Suggestions";
import About from "./src/views/About";
import Favourites from "./src/views/Favourites";

export default function App() {
  const getFavourites = async () => {
    console.disableYellowBox = true;
    let favourites = await AsyncStorage.getItem("favourites");
    if (!favourites) {
      await AsyncStorage.setItem("favourites", JSON.stringify([]));
    }
  };

  useEffect(() => {
    getFavourites();
  }, []);

  const SCREENS = [
    {
      key: "home",
      name: "Universities",
      color: "#ec667a",
      titleColor: "#fff",
      hamburgerColor: "#fff",
      render: () => (
        <View style={styles.container}>
          <Home />
        </View>
      ),
    },
    {
      key: "suggestions",
      name: "Suggestions",
      color: "#355878",
      titleColor: "#fff",
      hamburgerColor: "#fff",
      render: () => (
        <View style={styles.container}>
          <Suggestions />
        </View>
      ),
    },
    {
      key: "fav_universities",
      name: "Favourites",
      color: "#ec667a",
      titleColor: "#fff",
      hamburgerColor: "#fff",
      render: () => (
        <View style={styles.container}>
          <Favourites />
        </View>
      ),
    },
    {
      key: "app_developer",
      name: "About",
      color: "#355878",
      titleColor: "#fff",
      hamburgerColor: "#fff",
      render: () => (
        <View style={styles.container}>
          <About />
        </View>
      ),
    },
  ];

  return <FallingDrawer screens={SCREENS} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
  },
});
