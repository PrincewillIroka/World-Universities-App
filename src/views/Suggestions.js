import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import { API } from "react-native-dotenv";


export default function About() {
  const [state, setState] = useState({
    nameOfUniverity: "",
    website: "",
    country: "",
    isMessageShown: false,
    message: "",
    hasResponse: false,
    isLoading: false
  });

  handleSubmit = () => {
    Keyboard.dismiss();

    let name, website, country;
    name = state.nameOfUniverity;
    website = state.website;
    country = state.country;

    if (!name) {
      setState({
        ...state,
        isMessageShown: true,
        message: "Name of University cannot be empty"
      });
    } else {
      const newUrl = API + "/suggestAUniversity";
      const data = { name, website, country };

      setState({ ...state, message: "", isLoading: true })

      fetch(newUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          setState({
            ...state,
            hasResponse: true,
            isMessageShown: true,
            nameOfUniverity: "",
            website: "",
            country: "",
            message: `Thanks. We'll review your suggestion`,
            isLoading: false
          });
        });
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container2}
        behavior="padding"
        enabled
      >
        <Text style={styles.titleText}>
          Make a suggestion for a University to be added to the app.
        </Text>
        <View style={styles.container3}>
          {state.isMessageShown && (
            <Text
              style={[
                !state.nameOfUniverity && !state.hasResponse
                  ? styles.errorText
                  : state.hasResponse
                  ? styles.hasResponseText
                  : null
              ]}
            >
              {state.message}
            </Text>
          )}
          <TextInput
            placeholder="Name of University"
            style={styles.tInput}
            value={state.nameOfUniverity}
            onChangeText={nameOfUniverity => {
              setState({
                ...state,
                nameOfUniverity,
                isMessageShown: false,
                message: "",
                hasResponse: false
              });
            }}
          />
          <TextInput
            placeholder="Website"
            style={styles.tInput}
            value={state.website}
            onChangeText={website => {
              setState({
                ...state,
                website,
                isMessageShown: false,
                message: "",
                hasResponse: false
              });
            }}
          />
          <TextInput
            placeholder="Country"
            style={styles.tInput}
            value={state.country}
            onChangeText={country => {
              setState({
                ...state,
                country,
                isMessageShown: false,
                message: "",
                hasResponse: false
              });
            }}
          />
          <TouchableOpacity
            style={styles.submitButtonStyle}
            activeOpacity={0.5}
            onPress={()=>{
              if(!state.isLoading){
                this.handleSubmit()
              }
            }}
          >
            {state.isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.submitTextStyle}> SUBMIT </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  container2: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "90%",
    backgroundColor: "#fff",
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
    elevation: 5
  },
  titleText: {
    marginTop: 10,
    marginBottom: 40,
    textAlign: "center",
    width: "80%",
    fontSize: 15,
    fontWeight: "bold",
    color: "#666"
  },
  container3: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    paddingTop: 25
  },
  tInput: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 25,
    borderRadius: 3,
    paddingLeft: 5,
    paddingRight: 5
  },
  submitButtonStyle: {
    width: "50%",
    marginTop: 15,
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#355878",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2
  },
  submitTextStyle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5
  },
  hasResponseText: {
    color: "green",
    fontSize: 12,
    marginBottom: 5
  }
});
