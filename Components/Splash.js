import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const Splash = (props) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            props.navigation.navigate('Home');
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
       <Image source={require('../assets/social-media-5187243__340-removebg-preview.png')}></Image>
       <Text  style={{fontSize:20, fontWeight:'bold', fontStyle:"italic"}}>Hello You </Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})