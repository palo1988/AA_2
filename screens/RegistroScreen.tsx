import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

//FIREBASE
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';

export default function RegistroScreen( {navigation} : any) {
  const [correo, setcorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')


  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;

        navigation.navigate('Drawer_Welcome')
        
        //console.log('Registro exitoso')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
       console.log(errorCode)
        if ( errorCode === 'auth/email-already-in-use'){
          Alert.alert('Error', 'El correo ingresado ya esta en uso')
        }

      });
  }

  return (
    <View>
      <Text>RegistroScreen</Text>
      <TextInput
        placeholder='ingrese email'
        onChangeText={(texto) => setcorreo(texto)}
      />

      <TextInput
        placeholder='ingrese contrasenia'
        onChangeText={(texto) => setContrasenia(texto)}
      />

      <Button title='registrarse' onPress={()=> registro()} />

    </View>
  )
}

const styles = StyleSheet.create({})