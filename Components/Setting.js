import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { Link, useHistory } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Setting = (props) => {

  const [showhide, setshowhide] = useState(true)
  const [obju, setobju] = useState({})
  const logout=()=>{
    props.navigation.navigate('Login');

  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('Login')
      if (value !== null) {
        // value previously stored
        setobju(JSON.parse(value));
        // console.log(obju.username);
        if (obju.username=='admin') {
          setshowhide(true)
        }else{
          setshowhide(false)
        }

      }
    } catch (e) {
      // error reading value
    }
  }

  React.useEffect(() => {
    getData();
  });

  return (
    <View style={styles.container}>
      <View style={styles.Creat}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: 'white',
            padding: 30,
          }}>
          Settings </Text>
      </View>

      <View style={styles.nd}>

        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', marginBottom:10 }} 
        
         onPress={()=>props.navigation.navigate('Person')}>
          <View style={{ flexDirection: 'row', width: '100%', elevation: 10, backgroundColor: '#33CCFF', borderRadius: 15, padding: 10 }}>
            <Image source={require("../assets/person_FILL0_wght400_GRAD0_opsz48.png")}></Image>
            <Text style={{ fontSize: 25, fontWeight: '500', color: '#555555', margin: 7, color:'white' }}>Person</Text>
          </View>
        </TouchableOpacity>
        <View>
          {
            showhide ? (
              <TouchableOpacity style={{ flexDirection: 'row', width: '100%', marginBottom: 10 }} onPress={() => props.navigation.navigate('QlUser')}>
                <View style={{ flexDirection: 'row', width: '100%', elevation: 10, backgroundColor: '#33CCFF', borderRadius: 15, padding: 10 }}>
                  <Image source={require("../assets/badge_FILL0_wght400_GRAD0_opsz48.png")}></Image>
                  <Text style={{ fontSize: 25, fontWeight: '500', color: '#555555', margin: 7, color: 'white' }}>Danh Sách User</Text>
                </View>
              </TouchableOpacity>
            ) : null
          }

        </View>
        <TouchableOpacity style={{ flexDirection: 'row', width: '100%'}} onPress={logout}>
          <View style={{ flexDirection: 'row', width: '100%', elevation: 10, backgroundColor: '#33CCFF', borderRadius: 15,padding:10 }}>
            <Image source={require("../assets/logout_FILL0_wght400_GRAD0_opsz48.png")}></Image>
            <Text style={{ fontSize: 25, fontWeight: '500', color: '#555555', margin:7, color:'white'}}>Log out</Text>
         </View>
        </TouchableOpacity> 
     
     
        
        
      </View>
    </View>
  )
}

export default Setting

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  Creat: {
    backgroundColor: '#1877f2',
    height: "15%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40

  }, 
  nd:{
    height:'75%',
    backgroundColor:'white',
    margin:10,
    borderRadius:30,
    elevation:10,
    padding:20
  }
})