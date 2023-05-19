import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image, TouchableOpacity, RefreshControl, Share, Alert } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FacebookIcon, FacebookShareButton } from 'react-share';


const HomeCli = (props) => {
  var url_api = "http://192.168.96.154:3000/tb_post"
  const [isLoading, setisLoading] = useState(true)
  const [ListPost, setListPost] = useState([])
  const [reloading, setreloading] = useState(false)
  const [obju, setobju] = useState({})
  const [color, setcolor] = useState("black")


    const reloadData = React.useCallback(() => {
        // xử lý công việc load lại dữ liệu đổ vào danh sách
        setreloading(true); // set trạng thái bắt đầu reload
        getData();
        // mô phỏng đợi reload, nếu là reload từ server thật thì không cần viết lệnh dưới
        setTimeout(() => {
            setreloading(false); // sau 2s thì đổi trạng thái không rload nữa
        }, 2000);


    });

  const getDataLogin = async () => {
    try {
      const value = await AsyncStorage.getItem('Login')
      if (value !== null) {
        // value previously stored
        setobju(JSON.parse(value));
        // console.log(obju.username);

      }
    } catch (e) {
      // error reading value
    }
  }

  const getData = async () => {

    try {
      const response = await fetch(url_api); //lấy dữ liệu về 
      const jsonSP = await response.json(); // chuyển dũ liêu thành đt json
      // console.log(jsonSP);
      setListPost(jsonSP);

    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  }


  const renderPost = ({ item }) => {

    const chuyentrangUpadate = () => {
      props.navigation.navigate('Comment', { id: item.id, title: item.title, idlink: item.idlink })
    }

    const Follow = () => {

        var data = {
          username_fl:obju.username,
          title_fl: item.title_post,
          content_fl: item.content,
          image_fl: item.image,
          id_post: item.id
        }

      var urlw ="http://192.168.96.154:3000/tb_follow";
        fetch(urlw, {
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
              alert("Đã Follow")
            }
          })
          .catch((err) => {  // cách để bắt lỗi ngoại lệ 
            console.log(err);
          });
    }

    const onShare = async () => {
      try {
        const result = await Share.share({
          title:item.title,
          message: item.content,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        Alert.alert(error.message);
      }
    };

    const myCustomShare = async () => {
      const shareOptions = {
        title:item.title_post,
        message: item.content,
        url: item.image,
        // urls: [files.image1, files.image2]
      }

      try {
        const ShareResponse = await Share.share(shareOptions);
        console.log(JSON.stringify(ShareResponse));
      } catch (error) {
        console.log('Error => ', error);
      }
    };

      const select=()=>{
          Follow();
      }
    return (

      <View style={styles.item}>
        <Text style={{
          fontWeight: '500', color: '#1877f2', fontSize: 15, marginBottom: 10,
        }}>{item.title_post}</Text>
        <Text>{item.content}</Text>
        <View style={{width:'100%'}}>
          <Image source={{ uri: item.image }} style={styles.imageSP} />
        </View>
        
        <View style={styles.bottonmenu}>
        <TouchableOpacity onPress={select}>
            <AntDesign name="hearto" size={24} color="black" style={{ margin: 5, color: color}} />
        </TouchableOpacity>
         <TouchableOpacity onPress={chuyentrangUpadate}>
            <FontAwesome name="comments-o" size={24} color="black" style={{ margin: 5 }} />
         </TouchableOpacity>
          <TouchableOpacity onPress={onShare}>
            <Feather name="send" size={24} color="black" style={{ margin: 5 }} />
          </TouchableOpacity>
      
        </View>
       
      </View>
    )
  }



  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // do something
      getData();
    
    });

    return unsubscribe;
  }, [props.navigation]);
  getDataLogin();
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
          Home Me </Text>
      </View>
      <View style={{height:'85%'}}>
        <FlatList
          data={ListPost}
          keyExtractor={item=>item.id}
          refreshControl={
            <RefreshControl refreshing={reloading} onRefresh={reloadData} />
          }
          renderItem={renderPost}


        />
      </View>


      {/* <SafeAreaView>
        <BottomSheet
          visible={visible}
          onBackButtonPress={toggleBottomNavigationView}
          onBackdropPress={toggleBottomNavigationView}
        >

          <View style={styles.bottom}>
               <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                <TextInput placeholder='Viết Bình Luận....' style={{
                  width:'70%', margin:10,
                }} multiline={true}></TextInput>
                <TouchableOpacity>
                  <Text style={{margin:10}}>Gửi</Text>
                </TouchableOpacity>
               </View>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                data={listcmt}
                keyExtractor={({ id }) => id}
                renderItem={renderCmt}
              />
            )}
          </View>
        </BottomSheet>
      </SafeAreaView> */}
     
    </View>
  )
}

export default HomeCli

const styles = StyleSheet.create({

  container: {
    flex: 1
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
  item: {
    borderColor: '#1877f2',
    padding: 10,
    backgroundColor: 'white',
    elevation: 10,
    marginBottom: 10,
  },
  itemSP: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 10,
  },
  imageSP: {
    width: "100%", height:400,
    marginTop: 10
  },
  bottonmenu: {
    margin: 5,
    flexDirection: 'row',
  },
  bottom:{
    width:'100%',
    height:'80%',
    borderTopRightRadius:30,
    borderTopLeftRadius:30,
    backgroundColor:'white',
    alignItems:'center'
  }
})