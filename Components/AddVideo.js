import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native'
import React, { useState } from 'react'
import Field from '../Properties/Field'
import YoutubePlayer from "react-native-youtube-iframe";

const AddVideo = ({navigation}) => {
    let urlvideo ='http://192.168.96.154:3000/tb_videoyt'
    
    const [VideoTitle, setVideoTitle] = useState("")
    const [LinkVideo, setLinkVideo] = useState("")
    const [errVideo, seterrVideo] = useState("")

    const Validate = () => {
        if (VideoTitle.length == 0) {
            seterrVideo('chưa nhập title')
            return false;
        } else
            if (LinkVideo.length == 0) {
                seterrVideo('Chưa nhập id video')
                return false
            } else {
                return true;
            }
    }

    var dataVideo = { 
        title:VideoTitle,
        idlink:LinkVideo
    }


    const AddVideo=()=>{
        if (Validate()==true) {
        fetch(urlvideo, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataVideo)
        })
            .then((response) => {
                console.log(response.status);
                // nếu log là 201 thì là tạo thành công
                if (response.status == 201)
                    alert("Thêm mới thành công");
                  
                    setVideoTitle("");
                    setLinkVideo("");
            }
            )
            
            .catch((err) => {
                console.log(err);
            });
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.Creat}>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../assets/arrow_back_FILL0_wght400_GRAD0_opsz48.png")}
                        style={{
                            alignContent: 'flex-end',
                            tintColor: 'white',
                            width: 40,
                            height: 40,

                        }}></Image>
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: 'white',
                        padding: 30,
                    }}>
                    New Video  </Text>
            </View>

            <View style={styles.container1}>
                <Field
                    onChangeText={(text) => { setVideoTitle(text) }}
                    placeholder="Title video"
                    multiline={true}
                />
                <Field
                    onChangeText={(text) => { setLinkVideo(text) }}
                    placeholder="Id video"
                    keyboardType={'link'}
                />

                <Text style={{color:'red',margin:10}} onChangeText={(text)=>{seterrVideo(text)}}>{errVideo}</Text>

                <TouchableOpacity onPress={AddVideo}>
                    <Text style={{
                        backgroundColor: '#1877f2',
                        padding: 5,
                        width: 100,
                        textAlign: 'center',
                        color: 'white',
                        borderRadius: 20,
                        fontSize:20
                    }} >Insert</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddVideo

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
    container1: {

        justifyContent: 'center',
        alignItems: 'center'
    }

})