import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import Field from '../Properties/Field';

const Person = ({navigation}) => {

  
  const [obju, setobju] = useState({})
  const [username, setusername] = useState(obju.username)
  const [firstname, setfirstname] = useState("")
  const [lastname, setlastname] = useState("")
  const [phone, setphone] = useState("")
  const [password, setpassword] = useState("")

  // console.log(obju.username);
 
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('Login')
      if (value !== null) {
        // value previously stored
        setobju(JSON.parse(value));
        // console.log(obju.username);
        setusername(obju.username)

      }
    } catch (e) {
      // error reading value
    }
  }

  var obj ={
    username:username,
    firstname:firstname,
    lastname:lastname,
    phone:phone,
    passwd:password
  }
  const updatePersion = () => {
    let apiupdate = 'http://192.168.96.154:3000/tb_user';
    fetch(apiupdate + "/" + obju.id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj)
    }).then((res) => {
      alert('Cập nhật thành công')
      navigate('/');
    }).catch((err) => {
      console.log(err.message)
    })
  }

  React.useEffect(() => {
      getData();
    });
  

  return (

    <View style={styles.container}> 
    <View style={{flexDirection:'row', width:'100%', height:'10%',alignItems:'center', backgroundColor:'white', elevation:10, paddingTop:5}}> 
    <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="black" />
    </TouchableOpacity>
        <Text style={{marginLeft:20, fontSize:20}}>Thông tin</Text>
    </View>
    <View style={{justifyContent:'center', alignItems:'center'}}>
        <View style={styles.box}>
          <Text style={{ fontSize: 25, alignContent: 'center', textAlign: 'center', margin: 10, fontStyle: 'italic', fontWeight: '800' }}>Thông Tin Tài Khoản</Text>
         
          <Text style={{ fontSize: 17}}>Tên Tài Khoản</Text>
          <Field
            onChangeText={(text) => { setusername(text) }}
            placeholder="Username"
            multiline={true}
            value={username}
            editable={false}
          />
          <Text style={{ fontSize: 17 }}>Họ</Text>
          <Field
            onChangeText={(text) => { setfirstname(text) }}
            placeholder="Họ"
            multiline={true}
            value={obju.firstname}
            editable={false}
          />
          <Text style={{ fontSize: 17 }}>Tên:</Text>
          <Field
            onChangeText={(text) => { setlastname(text) }}
            placeholder="Tên"
            multiline={true}
            value={obju.lastname}
            editable={false}
          />
          <Text style={{ fontSize: 17, }}>Sô Điện Thoại</Text>
          <Field
            onChangeText={(text) => { setphone(text) }}
            placeholder="Phone"
            multiline={true}
            value={obju.phone}
            editable={false}
          />

          <Text style={{ fontSize: 17 }}>Mật Khẩu</Text>
          <Field
            onChangeText={(text) => { setpassword(text) }} value={obju.passwd}
            placeholder="Password" secureTextEntry={true}
            editable={false}
             />

            <View style={{alignItems:'center'}}>
            <TouchableOpacity  onPress={updatePersion}>
              <Text style={{
                backgroundColor: '#1877f2',
                padding: 5,
                width: 100,
                textAlign: 'center',
                color: 'white',
                borderRadius: 20,
                fontSize: 20
              }} >Cập Nhật</Text>
            </TouchableOpacity>
            </View>
       
        </View>
    </View>
   
     
    </View>
  )
}

export default Person

const styles = StyleSheet.create({

  container:{
    flex:1,
    // alignItems:'center',
    // justifyContent:'center'
  },
  box:{
    width:'90%',
    height:'90%',
    backgroundColor:'white',
    elevation:10,
     borderRadius:20, 
     padding:10,
     
  }

})