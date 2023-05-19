import { Alert, BackHandler, Text, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeCli from './HomeCli'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MovieClient from './MovieClient'
import Follow from './Follow'
import Setting from './Setting'
import Comment from '../Components/Comment'

const Tabs = createBottomTabNavigator();
import LottieView from "lottie-react-native";
import HomeAd from './HomeAd';
import Movie from './Movie';


const Stack = createNativeStackNavigator();
  function Home2() {
  return (

    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let filePath;

          switch (route.name) {
            case "Home":
              filePath = require('../assets/Lottie/home.json')
              break;
            case "Follow":
              filePath = require('../assets/Lottie/115528-follow-button.json')
              break;
            case "Movies":
              filePath = require("../assets/Lottie/movie-cut.json");
              break;
            case "Setting":
              filePath = require("../assets/Lottie/95282-setting-icon.json");
              break;
            default:
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
          }
          // return <Ionicons name={iconName} size={size} color={color} />;
          return <LottieView source={filePath} autoPlay={focused} />;
        },
      })}
    >

      <Tabs.Screen name="Home" component={HomeCli} options={{ headerShown: false }} />
      <Tabs.Screen name="Follow" component={Follow} options={{ headerShown: false }} />
      <Tabs.Screen name="Movies" component={MovieClient} options={{ headerShown: false }} />
      <Tabs.Screen name="Setting" component={Setting} options={{ headerShown: false }} />

    </Tabs.Navigator>

  );
}
export default class HomeClient extends Component {
  
  backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }
    render() {
        return (
            //   <View>
            //     <Text>HomeAdmin</Text>
            //   </View>
          <Tabs.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let filePath;

                switch (route.name) {
                  case "Home":
                    filePath = require('../assets/Lottie/home.json')
                    break;
                  case "Follow":
                    filePath = require('../assets/Lottie/115528-follow-button.json')
                    break;
                  case "Movies":
                    filePath = require("../assets/Lottie/movie-cut.json");
                    break;
                  case "Setting":
                    filePath = require("../assets/Lottie/95282-setting-icon.json");
                    break;
                  default:
                    iconName = focused
                      ? "ios-information-circle"
                      : "ios-information-circle-outline";
                }
                // return <Ionicons name={iconName} size={size} color={color} />;
                return <LottieView source={filePath} autoPlay={focused} />;
              },
            })}
          >

            <Tabs.Screen name="Home" component={HomeCli} options={{ headerShown: false }} />
            <Tabs.Screen name="Follow" component={Follow} options={{ headerShown: false }} />
            <Tabs.Screen name="Movies" component={MovieClient} options={{ headerShown: false }} />
            <Tabs.Screen name="Setting" component={Setting} options={{ headerShown: false }} />

          </Tabs.Navigator>

          
        )
    }
}