import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Btn from './Properties/Btn';
import { blue, darkGreen, green } from './Properties/Constans';
import Backgound from './Properties/Backgound';

const Home = (props) => {
  return (
    <Backgound>
      <View style={{ marginHorizontal: 40, marginVertical: 100 }}>
        <Text style={{ color: 'white', fontSize: 50, }}>Welcom to</Text>
        <Text style={{ color: 'white', fontSize: 50, marginBottom: 40 }}>The App</Text>
      <Btn bgColor={blue} textColor='white' btnLabel="Login" Press={() => props.navigation.navigate("Login")} />
      <Btn bgColor='white' textColor={darkGreen} btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} />
      </View>
    </Backgound>
  );
}

const styles = StyleSheet.create({})

export default Home;