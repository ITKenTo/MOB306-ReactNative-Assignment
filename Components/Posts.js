import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, Image, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { FontAwesome5 } from '@expo/vector-icons';

const Posts = ({navigation}) => {

  const [title, settitle] = useState("")
  const [content, setcontent] = useState("")
  const [image, setimage] = useState("")
  const [img_base64, setimg_base64] = useState(null)
  const [img_source, setimg_source] = useState(null)



  var url = "http://192.168.96.154:3000/tb_post"

  const Validate = () => {
    if (title == "") {
      alert('Không để trống tiêu đề')
      return false;
    }
    return true;
  }

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect:[4,3],
      quality:1,
    });
    
     if (!result.canceled) {
      setimg_source(result.assets[0].uri);
      let _uri = result.assets[0].uri;
      let file_ext = _uri.substring(_uri.lastIndexOf('.')+1);

      FileSystem.readAsStringAsync(result.assets[0].uri, {encoding: 'base64'})
      .then((res)=>{
        setimg_base64("data:image/"+file_ext+";base64,"+res);
        console.log(img_base64);
        setimage(img_base64);
      })
     }
  }


  /// hàm thêm tin tức 

  const Add = () => {
    if (Validate() == true) {
      var data = {
        title_post: title,
        content: content,
        image: image
      }

      fetch(url, {
        method: 'POST', // post : thêm mới, put sử, delete: xóa, get : lấy 
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // chuyển đt thành chuỗi
      })
        .then((response) => {
          console.log(response.status);
          // nếu log là 201 thì là tạo thành công 
          if (response.status == 201) {
            alert("Thêm thành công")
          }
        })
        .catch((err) => {  // cách để bắt lỗi ngoại lệ 
          console.log(err);
        });
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.Creat}>

        <TouchableOpacity onPress={()=>navigation.goBack()}>
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
            marginLeft:20
          }}>
          New Posts  </Text>


      </View>



      <View style={styles.Edx}>
        <TouchableOpacity>
          <Text style={{
            width: 100,
            height: 40,
            fontSize: 20,
            paddingTop: 5,
            fontWeight: 'bold',
            textAlign: 'center',
            alignItems: 'center',
            backgroundColor: '#1877f2',
            alignSelf: 'flex-end',
            marginBottom: 10,
            color: 'white'

          }} onPress={Add}>Đăng</Text>
        </TouchableOpacity>

        <TextInput style={styles.edittex1} placeholder="Tiêu đề" multiline={true} onChangeText={(text) => settitle(text)} value={title}></TextInput>

        <View>
          <TouchableOpacity style={{ flexDirection: "row-reverse", margin: 10 }} onPress={pickImage}>
            <FontAwesome5 name="images" size={30} color="black" />
          </TouchableOpacity>
          <TextInput style={styles.edittex} placeholder="Bạn đang nghĩ gì?" multiline={true} onChangeText={(text) => setcontent(text)} value={content}></TextInput>

          {img_base64 && <Image source={{ uri: img_base64 }} style={{ width: "100%", height: 250, backgroundColor: "cyan",  }} />}
          {/* 
                        <Image style={{ backgroundColor: 'white', width: 80, height: 80, borderRadius: 50, }} source={require("../assets/icons8-add-image-80.png")}></Image> */}


        </View>


      </View>
    </View>
  )
}

export default Posts

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white'
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

  Edx: {
    height: "100%",
    width: "100%",
    padding: 10,
  },
  edittex: {
    width: '100%',
    height: '25%',
    padding: 10,
    backgroundColor: 'white',
    textAlignVertical: 'top',
  },
  edittex1: {
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    textAlignVertical: 'top',
    marginBottom: 10,
  }

})