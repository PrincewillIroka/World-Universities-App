import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import SearchLayout from "../components/SearchLayout";
import MainLayout from "../components/MainLayout";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ACCESS_KEY, API } from "react-native-dotenv";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Home() {
  const [state, setState] = useState({
    isLoading: true,
    isLoading2: false,
    universitiesData: [],
    searchText: "",
    criterion: "getUniversitiesByCountry",
    name: "",
    country: "United States",
    index: 0,
    number: 10,
    refreshData: false,
    isNetworkAvailable: false
  });

  useEffect(() => {
    checkNetwork("initialRequest");
  }, []);

  checkNetwork = async value => {
    const network = await NetInfo.fetch();
    const isConnected = network.isConnected;
    console.log('Inside checkNetwork')

    if (isConnected) {
      if (value === "initialRequest") {
        getUserCountry();
      } else if (value === "search" || value === "reconnect") {
        fetchUniversitiesData();
      } else if (value === "loadMore") {
        if (state.index >= 10) {
          await setState({ ...state, isLoading2: true, refreshData: false });
          fetchUniversitiesData();
        }
      }
    } else if (!isConnected && value !== "loadMore") {
      setState({ ...state, isLoading: false, isNetworkAvailable: isConnected });
    }
  };

  getUserCountry = async () => {
    let userCountry = await AsyncStorage.getItem("country");
    if (userCountry) {
      await setState({
        ...state,
        country: JSON.parse(userCountry),
        isNetworkAvailable: true
      });
      fetchUniversitiesData();
    } else {
      fetch(`http://api.ipstack.com/197.210.64.28?access_key=${ACCESS_KEY}`)
        .then(response => response.json())
        .then(async responseJson => {
          const { country_name } = responseJson;
          if (country_name) {
            await AsyncStorage.setItem("country", JSON.stringify(country_name));
            await setState({
              ...state,
              country: country_name,
              isNetworkAvailable: true
            });
          }
          fetchUniversitiesData();
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  fetchUniversitiesData = () => {
    const newUrl = API + "/" + state.criterion;
    const data = {
      name: state.name,
      country: state.country,
      index: state.index,
      number: state.number
    };

    fetch(newUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          (function() {
            AsyncStorage.getItem("favourites").then(async result => {
              let newData = [],
                favourites = [],
                mData = [];
              if (result) {
                if (result.length > 0) {
                  favourites = JSON.parse(result);
                }
              }

              if (favourites.length > 0) {
                mData = data.map(dt => {
                  const fav = favourites.find(
                    favourite => favourite.name == dt.name
                  );
                  if (fav != "undefined" && fav != null) {
                    dt.isInFavourite = true;
                  } else {
                    dt.isInFavourite = false;
                  }
                  return dt;
                });
              } else {
                mData = data;
              }

              state.refreshData
                ? (newData = mData)
                : (newData = [...state.universitiesData, ...mData]);
              await setState({
                ...state,
                isLoading: false,
                isLoading2: false,
                universitiesData: newData,
                index: state.index + 10,
                isNetworkAvailable: true
              });
            });
          })();
        } else {
          if (state.index >= 10) {
            data = state.universitiesData;
          }
          setState({
            ...state,
            isLoading: false,
            isLoading2: false,
            universitiesData: data,
            isNetworkAvailable: true
          });
        }
      });
  };

  handleAddToFavourites = uName => {
    const newUniversitiesData = state.universitiesData.map(ud => {
      if (ud.name == uName) {
        ud.isInFavourite = true;
      }
      return ud;
    });
    setState({ ...state, universitiesData: newUniversitiesData });
  };

  handleRemoveFromFavourites = uName => {
    const newUniversitiesData = state.universitiesData.map(ud => {
      if (ud.name == uName) {
        ud.isInFavourite = false;
      }
      return ud;
    });
    setState({ ...state, universitiesData: newUniversitiesData });
  };

  contentLayout = () => {
    return !state.isLoading && !state.isNetworkAvailable ? (
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={async () => {
          await setState({ ...state, isLoading: true });
          checkNetwork("reconnect");
        }}
      >
        <View style={styles.emptyLayout}>
          <MaterialIcons name="network-check" size={60} color="gray" />
          <Text style={styles.emptyText}>
            Please check your network connection.
          </Text>
        </View>
      </TouchableOpacity>
    ) : !state.isLoading && state.universitiesData.length <= 0 ? (
      <View style={styles.emptyLayout}>
        <FontAwesome name="graduation-cap" size={60} color="gray" />
        <Text style={styles.emptyText}>None Found</Text>
      </View>
    ) : !state.isLoading ? (
      <View style={styles.contentLayout}>
        <MainLayout
          parentLayout="Home"
          universitiesData={state.universitiesData}
          addToFavourites={uName => {
            handleAddToFavourites(uName);
          }}
          removeFromFavourites={uName => {
            handleRemoveFromFavourites(uName);
          }}
          scrolledToBottom={() => {
            if (!state.isLoading2) {
              checkNetwork("loadMore");
            }
          }}
        />
        {state.isLoading2 && (
          <View style={styles.bottomLoader}>
            <ActivityIndicator size="small" color="#ec667a" />
          </View>
        )}
      </View>
    ) : (
      <View style={styles.spinnerLayout}>
        <ActivityIndicator size="large" color="#ec667a" />
      </View>
    );
    // }
  };

  return (
    <View style={styles.container}>
      <SearchLayout
        setSearchText={async (text, searchByName, searchByCountry) => {
          let name = "",
            country = "";
          searchByName ? (name = text) : (country = text);
          await setState({
            ...state,
            searchText: text,
            isLoading: true,
            name,
            country,
            refreshData: true,
            index: 0
          });
          checkNetwork("search");
        }}
        setSearchCriterion={async criterion => {
          await setState({ ...state, criterion: criterion });
        }}
      />
      {contentLayout()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#eee",
    height: "100%"
  },
  spinnerLayout: {
    flexDirection: "row",
    height: "80%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
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
  contentLayout: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  bottomLoader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    paddingBottom: 5
  }
});
