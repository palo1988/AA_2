import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
//firebase
import { getAuth, signOut } from "firebase/auth";
import LoginScreen from "./LoginScreen";
export default function WelcomeScreen({ navigation }: any) {
  function logOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });

    navigation.navigate("Login");
  }

  return (
    <View>
      <ImageBackground
        source={{
          uri: "https://p4.wallpaperbetter.com/wallpaper/427/652/979/music-skull-wallpaper-preview.jpg",
        }}
        style={styles.img}
      />
      <Text style={styles.Text}>WelcomeScreen</Text>

      <TouchableOpacity style={styles.button} onPress={() => logOut()}>
        <Text style={styles.buttonText}>CERRAR SESION</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Text: {
    textAlign: "center",
    color: "rgb(238, 238, 238)",
    fontSize: 50,
  },
  img: {
    flex: 5,
    width: 800,
    height: 800,
    resizeMode: "center",
  },
  button: {
    alignSelf: "center",
    borderRadius: 10,
    paddingVertical: 15,
    width: "50%",
    backgroundColor: "#168354",
  },
  buttonText: {
    textAlign: "center",
    color: "rgb(238, 238, 238)",
    fontSize: 16,
  },
});
