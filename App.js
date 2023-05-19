import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet, Text, View } from 'react-native';
import HomeAd from './Components/HomeAd';
import HomeAdmin from './Components/HomeAdmin';
import Posts from './Components/Posts'
import HomeClient from './Components/HomeClient'
import Home from './Home';
import Login from './Properties/Login';
import Signup from './Properties/Signup';
import Setting from './Components/Setting';
import AddVideo from './Components/AddVideo';
import EditVideo from './Components/EditVideo';
import Comment from './Components/Comment';
import EditPosts from './Components/EditPost';
import Person from './Components/Person';
import Splash from './Components/Splash';
import QlUser from './Components/QlUser';

const Stack= createNativeStackNavigator();

 function App() {
  return (
     <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash' screenOptions= {{headerShown:false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
        <Stack.Screen name='HomeClient' component={HomeClient}/>

        <Stack.Screen name='Setting' component={Setting} />
        
        <Stack.Screen name="Posts" component={Posts} />
        <Stack.Screen name="HomeAd" component={HomeAd} />
        <Stack.Screen name="AddVideo" component={AddVideo} />
        <Stack.Screen name="EditVideo" component={EditVideo} />
        <Stack.Screen name="Comment" component={Comment} />
        <Stack.Screen name="EditPost" component={EditPosts} />
        <Stack.Screen name="Person" component={Person} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="QlUser" component={QlUser} />





      </Stack.Navigator>
     </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
