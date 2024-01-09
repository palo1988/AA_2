import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

export default function LoginScreen({navigation}: any) {

const [correo, setCorreo] = useState('')
const [contrasenia, setContrasenia] = useState('')

  return (
    <View>
      <Text style={{fontSize:30}}>Login</Text>
      <TextInput 
        placeholder='Ingrese correo'
        onChangeText={ (texto)=> setCorreo(texto)}
        keyboardType='email-address'
        autoCapitalize='none'
      />

      <TextInput 
        placeholder='Ingresar contraseña'
        onChangeText={ (texto)=> setContrasenia(texto)}
      />

     
      <Button title='Ingresar' onPress={()=> navigation.navigate('Drawer_Welcome') }/>

      <Text onPress={()=> navigation.navigate('Registro')}> 👉 Regístrate aquí 👈</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{

  }
})