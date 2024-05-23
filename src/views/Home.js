import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchLayout from "../components/SearchLayout";
import MainLayout from "../components/MainLayout";

const { EXPO_PUBLIC_SERVER_API } = process.env;

export default function Home() {
  const [state, setState] = useState({
    isLoading: true,
    isLoading2: false,
    universitiesData: [],
    searchText: "",
    criterion: "getDefaultUniversities",
    name: "",
    country: "",
    skip: 0,
    limit: 10,
    refreshData: false,
    isNetworkAvailable: false,
  });

  useEffect(() => {
    checkNetwork("initialRequest");
  }, []);

  checkNetwork = async (value) => {
    const network = await NetInfo.fetch();
    const isConnected = network.isConnected;

    if (isConnected) {
      if (
        value === "initialRequest" ||
        value === "search" ||
        value === "reconnect"
      ) {
        fetchUniversitiesData();
      } else if (value === "loadMore") {
        if (state.skip >= 10) {
          await setState({ ...state, isLoading2: true, refreshData: false });
          fetchUniversitiesData();
        }
      }
    } else if (!isConnected && value !== "loadMore") {
      setState({ ...state, isLoading: false, isNetworkAvailable: isConnected });
    }
  };

  fetchUniversitiesData = () => {
    const newUrl = `${EXPO_PUBLIC_SERVER_API}/api/${state.criterion}`;
    const data = {
      name: state.name,
      country: state.country,
      skip: state.skip,
      limit: state.limit,
    };

    fetch(newUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          (async function () {
            await AsyncStorage.getItem("favourites").then(async (result) => {
              let newData = [],
                favourites = [],
                mData = [];
              if (result) {
                if (result.length > 0) {
                  favourites = JSON.parse(result);
                }
              }

              if (favourites.length > 0) {
                mData = data.map((dt) => {
                  const fav = favourites.find(
                    (favourite) => favourite.name == dt.name
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
                skip: state.skip + 10,
                isNetworkAvailable: true,
              });
            });
          })();
        } else {
          if (state.skip >= 10) {
            data = state.universitiesData;
          }
          setState({
            ...state,
            isLoading: false,
            isLoading2: false,
            universitiesData: data,
            isNetworkAvailable: true,
          });
        }
      })
      .catch((error) => console.error(error));
  };

  handleAddToFavourites = (uName) => {
    const newUniversitiesData = state.universitiesData.map((ud) => {
      if (ud.name == uName) {
        ud.isInFavourite = true;
      }
      return ud;
    });
    setState({ ...state, universitiesData: newUniversitiesData });
  };

  handleRemoveFromFavourites = (uName) => {
    const newUniversitiesData = state.universitiesData.map((ud) => {
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
          addToFavourites={(uName) => {
            handleAddToFavourites(uName);
          }}
          removeFromFavourites={(uName) => {
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
  };

  return (
    <View style={styles.container}>
      <SearchLayout
        setSearchText={async (text, searchByName) => {
          let name = "",
            country = "";
          if (searchByName) {
            name = text.trim();
          } else {
            country = text.trim();
          }
          await setState({
            ...state,
            searchText: text,
            isLoading: true,
            name,
            country,
            refreshData: true,
            skip: 0,
          });
          checkNetwork("search");
        }}
        setSearchCriterion={async (criterion) => {
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
    height: "100%",
  },
  spinnerLayout: {
    flexDirection: "row",
    height: "80%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyLayout: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    color: "gray",
  },
  contentLayout: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  bottomLoader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
});
