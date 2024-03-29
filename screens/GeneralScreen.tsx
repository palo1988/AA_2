import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";

import * as ImagePicker from "expo-image-picker";

//FIREBASE
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/Config";

export default function GeneralScreen() {
  const [imagen, setImagen] = useState(
    " https://www.shutterstock.com/image-vector/dj-avatar-male-musician-character-600nw-1985403074.jpg"
  );

  // ABRIR LA CAMARA
  const seleccionarImagen = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  ///SUBIR LA IMAGEN
  async function subirImagen(nombre: string) {
    const storageRef = ref(storage, "usuarios/" + nombre);

    try {
      const response = await fetch(imagen);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, {
        contentType: "image/jpg",
      });

      console.log("La imagen se subió con éxito");
      Alert.alert("Mensaje", "Imagen subida con exito");

      // Obtiene la URL de la imagen
      const imageURL = await getDownloadURL(storageRef);
      console.log("URL de desacarga de la imagen", imageURL);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View>
      <ImageBackground
        source={{
          uri: "https://previews.123rf.com/images/hatza/hatza1312/hatza131200050/24578578-arte-pop-de-c%C3%A1mara.jpg",
        }}
        style={styles.img1}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => seleccionarImagen()}
      >
        <Text style={styles.buttonText}>ABRIR CAMARA</Text>
      </TouchableOpacity>
      <Image source={{ uri: imagen }} style={styles.img} />

      <TouchableOpacity
        style={styles.buttonReg}
        onPress={() => subirImagen("avatar2")}
      >
        <Text style={styles.buttonTextReg}>SUBIR IMAGEN A FIREBASE</Text>
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
    width: 400,
    height: 300,
    resizeMode: "contain",
  },
  img1: {
    flex: 5,
    width: 800,
    height: 800,
    resizeMode: "center",
  },
  container: {},
  button: {
    alignSelf: "center",
    borderRadius: 10,
    paddingVertical: 15,
    width: "50%",
    backgroundColor: "#7e03ab",
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
    backgroundColor: "##ebef0b",
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
