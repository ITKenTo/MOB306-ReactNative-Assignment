import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Backgound from './Backgound'
import { darkGreen } from './Constans'
import Field from './Field'
import Btn from './Btn'

let url ='http://192.168.96.154:3000/tb_user'
const Signup = (props) => {
  const [firstname, setfirstname] = useState("")
  const [error, seterror] = useState("")
  const [lastname, setlastname] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [password, setpassword] = useState("")
  const [confirmpassword, setconfirmpassword] = useState("")


  const validate = () => {
    if (firstname.length == 0) {
      seterror('Vui lập nhập first name');
      return false;
    } else if (lastname.length == 0) {
      seterror('Vui lập nhập last name');
      return false;
    } else if (email.length == 0) {
      seterror('Vui lập nhập email or username');
      return false;
    } else if (phone.length == 0) {
      seterror('Vui lập nhập phone');
      return false;
    } else if (password.length == 0) {
      seterror('Vui lập nhập password');
      return false;
    } else if (confirmpassword.length == 0) {
      seterror('Vui lập nhập confirm password');
      return false;
    }else{
      seterror("");
      return true;
    }
  }

  var data={
      
      firstname: firstname,
      lastname: lastname,
      username: email,
      phone: phone,
      passwd: password
  }

  const SignupApp=()=>{
    if (validate()==true) {
      fetch(url, {
        method: 'POST',
        headers: { 
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) 
      })
        .then((response) => {
          console.log(response.status);
          // nếu log là 201 thì là tạo thành công
          if (response.status == 201)
            alert("Thêm mới thành công");
            props.navigation.navigate("Login")
        })
        .catch((err) => { 
          console.log(err);
        });
    }
  }
  return (


    <Backgound>
      <View style={{ alignItems: 'center', width: 460 }}>
        <Text style={{ color: '#F8F8FF', fontSize: 35, fontWeight: 'bold', marginVertical: 10 }}>Register</Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 15,
          }}>
          Create a new account
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{
            backgroundColor: '#FFFAF0',
            height: 700,
            width: 460,
            flex: 1,
            borderTopLeftRadius: 130,
            paddingTop: 40,
            alignItems: 'center'
          }}>

            <Field placeholder="First Name" onChangeText={(text) => { setfirstname(text) }} value={firstname} />
            <Field placeholder="Last Name" onChangeText={(text) => { setlastname(text) }} value={lastname} />
            <Field
              placeholder="Email / Username"
              keyboardType={'email-address'}
              onChangeText={(text) => { setemail(text) }} value={email}
            />
            <Field placeholder="Contact Number" keyboardType='numeric' onChangeText={(text) => { setphone(text) }} value={phone} />
            <Field placeholder="Password" secureTextEntry={true} onChangeText={(text) => { setpassword(text) }} value={password} />
            <Field placeholder="Confirm Password" secureTextEntry={true} onChangeText={(text) => { setconfirmpassword(text) }} value={confirmpassword} />

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '78%',
                paddingRight: 16
              }}>
              <Text style={{ color: 'grey', fontSize: 13 }}>
                By signing in, you agree to our{' '}
              </Text>
              <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 13 }}>
                Terms & Conditions
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "center",
                width: '78%',
                paddingRight: 16,
                marginBottom: 10
              }}>
              <Text style={{ color: 'grey', fontSize: 13 }}>
                and {" "}
              </Text>
              <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 13 }}>
                Privacy Policy
              </Text>

            </View>

            <Text style={{ color: 'red' }}>{error}</Text>
            <Btn textColor="white" bgColor={darkGreen} btnLabel="Signup" Press={SignupApp}/>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                Already have an account ?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Login')}>
                <Text
                  style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>


      </View>
    </Backgound>

  )
}

export default Signup

const styles = StyleSheet.create({})