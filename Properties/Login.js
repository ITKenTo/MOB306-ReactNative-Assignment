import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Backgound from './Backgound'
import { darkGreen } from './Constans'
import Field from './Field'
import Btn from './Btn'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = (props) => {

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [err, seterr] = useState("")


    const loginApp = () => {
        let url ='http://192.168.96.154:3000/tb_user?username='+username;
        if (validate()==true) {
              
            fetch(url)
            .then((res)=>{
                return res.json();
            })
            .then (async(res_login)=>{
                if (res_login.length!=1) {
                seterr("không tồn tại hoặc bị trùng");
                return;
                }else{
                    let obj=res_login[0];
                    if (obj.passwd==password) {

                        try {
                            await AsyncStorage.setItem("Login", JSON.stringify(obj));
                            //alert("Ghi xong dữ liệu")
                            // chuuen trang 

                            if (obj.username=="admin") {
                            props.navigation.navigate('HomeAdmin');
                            }else {
                                props.navigation.navigate('HomeClient');
                            }
                        } catch (e) {
                            // saving error
                            console.log(e);
                        }
                    }else{
                        seterr("Sai password")
                    }
                }
            }
            
            )
            // if (username == "Admin") {
            //     props.navigation.navigate("HomeAdmin");
            // } else {
            //     props.navigation.navigate("HomeClient");
            // }
        }
    }


    const validate = () => {
        if (username.length ==0) {
            seterr("Vui lòng nhập tên đăng nhập");
            return false;

        } else if (password.length==0) {
            seterr("Vui lòng nhập mật khẩu");
            return false;
        } else {
            seterr("");
            return true;

        }
    }
    return (

        <Backgound>
            <View style={{ alignItems: 'center', width: 460 }}>
                <Text style={{ color: '#F8F8FF', fontSize: 50, fontWeight: 'bold', marginVertical: 10 }}>Login</Text>
                <View style={{
                    backgroundColor: '#FFFAF0',
                    height: 700,
                    width: 460,
                    borderTopLeftRadius: 130,
                    paddingTop: 100,
                    alignItems: 'center'

                }}>

                    <Text style={{ fontSize: 40, color: darkGreen, fontWeight: 'bold' }}>
                        Welcome Back
                    </Text>
                    <Text style={{ color: 'grey', fontSize: 19, fontWeight: 'bold', marginBottom: 20, }}>
                        Login to your account
                    </Text>

                    <Field
                        onChangeText={(text) => { setusername(text) }} value={username}
                        placeholder="Email / Username"
                        keyboardType={'email-address'}

                    />
                    <Field
                        onChangeText={(text) => { setpassword(text) }} value={password}
                        placeholder="Password" secureTextEntry={true} />
                    <View
                        style={{ alignItems: 'flex-end', width: '78%', paddingRight: 16, marginBottom: 80 }}>
                        <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
                            Forgot Password ?
                        </Text>
                        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 13, alignSelf: 'center', marginTop: 10 }}>
                            {err}
                        </Text>

                    </View>

                    <Btn textColor='white' bgColor={darkGreen} btnLabel="Login"
                        Press={loginApp} />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", }}>Don't have an account ? </Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
                            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>


        </Backgound>

    )
}

export default Login

const styles = StyleSheet.create({})