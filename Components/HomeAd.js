import { Alert, Image, Modal, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { RefreshControl } from 'react-native'
import { FlatList } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Share } from 'react-native'

const HomeAd = (props) => {

  var url_api = "http://192.168.96.154:3000/tb_post"

  const [reloading, setreloading] = useState(false)
  const [ListPost, setListPost] = useState([])
  const [img_base64, setiimg_base64] = useState(null)
  const [showhide, setshowhide] = useState(true)
  const [isLoading, setisLoading] = useState(true)

  const [showModalDialog, setshowModalDialog] = useState(false)

    const realoadData = React.useCallback(() => {
    setreloading(true); ///set trang thai 

    getData();
    //moo phong doi reload, neesu laf reload tu sever that thi khong can 
    setTimeout(() => {
      setreloading(false);
    }, 2000);

  })




  const menu=()=>{

    <Modal visible={showModalDialog}
      transparent={true}
      animationType="slide"
      onRequestClose={() => {
        // hàm này bắt buộc trong android, xử lý sự kiện khi người dùng bấm back
        setshowModalDialog(false);// ẩn dialog
      }}
    >
      <View style={styles.modal_dialog_view}>

        <TouchableOpacity>
          <Text>Xóa</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setshowModalDialog(false) }}>
          <Text>Hủy</Text>
        </TouchableOpacity>
      </View>
    </Modal>

  }
  
  const getData = async () => {

    try {
      const response = await fetch(url_api); //lấy dữ liệu về 
      const jsonSP = await response.json(); // chuyển dũ liêu thành đt json
      console.log(jsonSP);
      setListPost(jsonSP);

    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false)
    }
  }

  const renderPost = ({ item }) => {
    // console.log(item.image);
    setiimg_base64(item.image)

    // if (img_base64=="") {
    //   setcheckimage("hidden");
    // }else{
    //   setcheckimage("visible");
    // }
    const check=()=>{
      if (item.image=='' || item.image=='null') {
        setshowhide(false)
      }else{setshowhide(true)}
    }
    const handleDelete = () => {
      Alert.alert("Xóa", "Bạn có chắc chắn xóa bài viết này không?", [
        {
          text: 'Không',
          style: 'cancel'
        },
        {
          text: "Đồng ý", onPress: () => {
            fetch(url_api + "/" + item.id, {
              method: 'DELETE'
            })
              .then((response => response.json()
              ))
              .then(data => {
                const newPosts = ListPost.filter(ListPost => ListPost.id !== item.id);
                setListPost(newPosts);
              })
              .catch(error => console.error(error));
          }
        }
      ])
    };

    const chuyenupdate=()=>{
      props.navigation.navigate("EditPost",{id:item.id, title_post:item.title_post, content:item.content, image:item.image});
    }

    const chuyentrangUpadate = () => {
      props.navigation.navigate('Comment', { id: item.id, title: item.title, idlink: item.idlink })
    }
    
    const onShare = async () => {
      try {
        const result = await Share.share({
          title: item.title,
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

    return (
        <View style={styles.item}>
          <Text style={{
            fontWeight: '500', color: '#1877f2', fontSize: 15, marginBottom: 10,
          }}>{item.title_post}</Text>
          <Text>{item.content}</Text>
        
            <Image source={{ uri: item.image ? item.image : null }} style={styles.imageSP} />
          <View style={styles.bottonmenu}>
            <TouchableOpacity>
              <AntDesign name="hearto" size={24} color="black" style={{ margin: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={chuyentrangUpadate}>
              <FontAwesome name="comments-o" size={24} color="black" style={{ margin: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onShare}>
              <Feather name="send" size={24} color="black" style={{ margin: 5 }} />
            </TouchableOpacity>
         
            <TouchableOpacity onPress={handleDelete}>
              <MaterialIcons name="clear" size={24} color="black" style={{margin:5}}/>       
            </TouchableOpacity>
            <TouchableOpacity onPress={chuyenupdate}>
              <Entypo name="edit" size={24} color="black" style={{ margin: 5 }} />          
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
          Create new notification ?</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("Posts")}>
          <Image source={require("../assets/add_FILL0_wght400_GRAD0_opsz48.png")}
            style={{
              alignContent: 'flex-end',
              tintColor: 'white',
              width: 40,
              height: 40
            }}></Image>
        </TouchableOpacity>
      </View>
      <View style={{height:'85%'}}>

    <FlatList
          data={ListPost}
          keyExtractor={item=>item.id}
          refreshControl={
            <RefreshControl refreshing={reloading} onRefresh={realoadData} />
          }
          renderItem={renderPost}


        />
      </View>

      {/* <SafeAreaView>
        <ScrollView
          //   horizontal={true}
          contentContainerStyle={styles.danhsach}
          horizontal={true}
          refreshControl={
            <RefreshControl refreshing={reloading}
              onRefresh={realoadData}
            >
            </RefreshControl>
          }
        >
          <View style={{ flex: 1, padding: 10 }}>

            <View>
              <FlatList
                horizontal={false}
                data={ListPost}
                keyExtractor={({ id }) => id}
                renderItem={renderPost}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView> */}
       
  
    </View>

  )
}

export default HomeAd

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
  danhsach: {
    flex: 1,
    width: '100%',
    height: 1000,

  },
  item: {
    borderColor: '#1877f2',
    padding: 10,
    backgroundColor: 'white',
    elevation: 10,
    marginBottom: 10
  },
  itemSP: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 10,
  
  },
  imageSP: {
    width: "100%", height: 400,
    marginTop: 10
  },
  bottonmenu: {
    margin: 5,
    flexDirection: 'row',
  },
})