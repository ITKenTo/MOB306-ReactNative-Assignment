import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native'
import React, { useState } from 'react'
import Field from '../Properties/Field'

const EditVideo = ({navigation,route}) => {

    const [VideoTitle, setVideoTitle] = useState(route.params.title)
    const [LinkVideo, setLinkVideo] = useState(route.params.idlink)
    const [id, setid] = useState(route.params.id)


    const updateVideo = (id) => {
        let apiupdate = 'http://192.168.96.154:3000/tb_videoyt';
        fetch(apiupdate + "/" + id, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                title:VideoTitle,
                idlink:LinkVideo
            }
            )
        }).then((res) => {
            alert('Cập nhật thành công')
            navigate('/');
        }).catch((err) => {
            console.log(err.message)
        })
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
                    Edit Video  </Text>
            </View>

            <View style={styles.container1}>
                <Field
                    onChangeText={(text) => { setVideoTitle(text) }}
                    placeholder="Title video"
                    multiline={true}
                    value={VideoTitle}
                />
                <Field
                    onChangeText={(text) => { setLinkVideo(text) }}
                    placeholder="Link video"
                    keyboardType={'link'}
                    value={LinkVideo}
                />

                <TouchableOpacity  onPress={()=>{updateVideo(id)}}>
                    <Text style={{
                        backgroundColor: '#1877f2',
                        padding: 5,
                        width: 100,
                        textAlign: 'center',
                        color: 'white',
                        borderRadius: 20,
                        fontSize: 20
                    }} >Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditVideo

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