import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

//FIREBASE
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Config";

export default function RegistroScreen({ navigation }: any) {
  const [correo, setcorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        navigation.navigate("Drawer_Welcome");

        //console.log('Registro exitoso')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode);
        if (errorCode === "auth/email-already-in-use") {
          Alert.alert("Error", "El correo ingresado ya esta en uso");
        }

        switch (errorCode) {
          case "auth/invalid-email": {
            Alert.alert("Error", "Las credenciales son incorrectas");
            //statements;
            break;
          }
          case "auth/missing-password": {
            Alert.alert("Error", "La contrasenia no se ha enviado");
            //statements;
            break;
          }
          default: {
            //statements;
            Alert.alert(errorCode, errorMessage);
            break;
          }
        }
      });
  }

  return (
    <View>
      <ImageBackground
        source={{
          uri: "https://p4.wallpaperbetter.com/wallpaper/216/871/649/dark-skull-green-wallpaper-preview.jpg",
        }}
        style={styles.img}
      />
      <Text style={styles.Text}>RegistroScreen</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#ededed"
        placeholder="ingrese email"
        onChangeText={(texto) => setcorreo(texto)}
      />

      <TextInput
        style={styles.input}
        placeholderTextColor="#ededed"
        placeholder="ingrese contrasenia"
        onChangeText={(texto) => setContrasenia(texto)}
      />

      <TouchableOpacity style={styles.button} onPress={() => registro()}>
        <Text style={styles.buttonText}>REGISTRARSE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    flex: 5,
    width: 800,
    height: 800,
    resizeMode: "center",
  },
  Text: {
    textAlign: "center",
    color: "rgb(238, 238, 238)",
    fontSize: 50,
  },
  container: {},
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
  buttonReg: {
    fontSize: 10,
    alignSelf: "center",
    borderRadius: 25,
    paddingVertical: 20,
    width: "50%",
    backgroundColor: "#166483",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,

    marginVertical: 10,
  },
  buttonTextReg: {
    textAlign: "center",
    color: "rgb(238, 238, 238)",
    fontSize: 12,
  },
  input: {
    fontSize: 15,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    width: "80%",
    marginVertical: 10,
  },
});
