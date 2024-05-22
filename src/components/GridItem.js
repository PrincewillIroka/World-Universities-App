import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function GridItem({
  parentLayout,
  universityData,
  itemIndex,
  addToFavourites,
  removeFromFavourites,
  openWebsite,
}) {
  const [state, setState] = useState({
    isInFavourite: false,
  });

  handleFavourites = async (uData, itemIndex) => {
    let favourites = await AsyncStorage.getItem("favourites"),
      fav = {},
      isUpdated = false,
      message = "";
    if (favourites) {
      favourites = JSON.parse(favourites);
      if (favourites.length > 0) {
        fav = favourites.find(
          (favourite, index) => favourite.name == uData.name
        );
        if (fav) {
          favourites = favourites.filter((ud) => ud.name != uData.name);
          removeFromFavourites(uData.name);
          message = "Removed favourites";
          isUpdated = true;
        } else {
          addToFavourites(uData.name);
          favourites.push(uData);
          message = "Added to favourites";
          isUpdated = true;
        }
      } else {
        addToFavourites(uData.name);
        favourites.push(uData);
        message = "Added to favourites";
        isUpdated = true;
      }
      isUpdated
        ? await AsyncStorage.setItem("favourites", JSON.stringify(favourites))
            .then
            // Toast.show(
            //     message,
            //     Toast.SHORT
            // )
            ()
        : null;
    }
  };

  hasWhiteSpace = (s) => {
    return s.indexOf(" ") >= 0;
  };

  generateAlias = () => {
    let value = "";
    if (hasWhiteSpace(universityData.name)) {
      const arr = universityData.name.split(" ");
      value = `${arr[0].charAt(0)}${arr[1].charAt(0)}`;
    } else {
      value = universityData.name.substring(0, 2).toUpperCase();
    }

    return value;
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardLayout}>
        <View style={styles.multiLayout1}>
          <View style={styles.aliasContainer}>
            <Text style={[{ color: "#ec667a" }, styles.aliasText]}>
              {generateAlias()}
            </Text>
          </View>
          <Text style={styles.nameText} numberOfLines={2}>
            {universityData.name}
          </Text>
        </View>
        <View style={styles.multiLayout2}>
          <TouchableOpacity
            onPress={() => {
              openWebsite(universityData.web_pages[0]);
            }}
          >
            <Text
              style={[{ backgroundColor: "#ec667a" }, styles.goToWebsiteText]}
            >
              Visit Website
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleFavourites(universityData, itemIndex);
            }}
          >
            {parentLayout == "Favourites" ? (
              <Entypo name="heart" size={20} color={"#ec667a"} />
            ) : universityData.isInFavourite ? (
              <Entypo name="heart" size={20} color={"#ec667a"} />
            ) : (
              <Entypo name="heart-outlined" size={20} color={"#ec667a"} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    marginBottom: 15,
    height: 150,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
    borderRadius: 3,
    width: "48%",
    padding: 5,
    paddingTop: 8,
    paddingBottom: 10,
  },
  cardLayout: {
    display: "flex",
    flexDirection: "column",
  },
  multiLayout1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "75%",
    marginBottom: 10,
  },
  aliasContainer: {
    borderRadius: 20,
    backgroundColor: "#ddd",
    height: 35,
    width: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  aliasText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  nameText: {
    textAlign: "center",
  },
  multiLayout2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  goToWebsiteText: {
    fontSize: 11,
    color: "#fff",
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
