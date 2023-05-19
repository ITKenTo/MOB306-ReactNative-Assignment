import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Backgound = ({children}) => {
  return (
    <View>
      <ImageBackground source={require("../assets/backapp.jpg")} style={{ height: '100%' }} />
      <View style={{ position: "absolute" }}>
        {children}
      </View>
    </View>
  )
}

export default Backgound;

const styles = StyleSheet.create({})