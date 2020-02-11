import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Logo from "../assets/logo.png";

export default function About() {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logoImage} />
      <View style={styles.info}>
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Disclaimer:</Text>
        <Text>
          This app is intended for informational purposes only, you could still make
          a proper search online for any information you find here.
        </Text>
        <Text style={{ fontWeight: "bold", marginBottom: 5, marginTop: 15 }}>Features:</Text>
        <Text style={styles.ftText}>
          (1) Provide users with information about thousands of universities
          around the world.
        </Text>
        <Text style={styles.ftText}>
          (2) Users can access the official websites of these institutions.
        </Text>
        <Text style={styles.ftText}>(3) Users can add univerities as favourites. </Text>
        <Text style={styles.ftText}>
          (4) Users can also make suggestions for universities to be added to
          the app (Note: We'll properly review every suggestion before adding
          it).
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "column"
  },
  logoImage: {
    height: 170,
    width: "55%",
    marginTop: "10%"
  },
  info: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    width: "90%",
    padding: 10,
    borderRadius: 5,
    color: "#666",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
  },
  ftText:{
      marginBottom: 3
  }
});
