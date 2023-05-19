import { StyleSheet, Text, TouchableOpacity, View , Image, FlatList, RefreshControl, Alert } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Follow = (props) => {
  const [reloading, setreloading] = useState(false)
  const [obju, setobju] = useState({})
  const [ListFl, setLisFl] = useState([])
  const [coler, setcoler] = useState("red")

  const reloadData = React.useCallback(() => {
    // xử lý công việc load lại dữ liệu đổ vào danh sách
    setreloading(true); // set trạng thái bắt đầu reload
    getDatafollow();
    // mô phỏng đợi reload, nếu là reload từ server thật thì không cần viết lệnh dưới
    setTimeout(() => {
      setreloading(false); // sau 2s thì đổi trạng thái không rload nữa
    }, 2000);

  });


  const getData = async () => {
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

  const getDatafollow = async () => {

    var url_cmt = 'http://192.168.96.154:3000/tb_follow?username_fl='+obju.username;
    try {
      const response = await fetch(url_cmt); //lấy dữ liệu về 
      const jsonSP = await response.json(); // chuyển dũ liêu thành đt json
      // console.log(jsonSP);
      setLisFl(jsonSP);

    } catch (error) {
      console.error(error);
    } finally {
    }
  }

  const renderPost = ({ item }) => {

    const handleDelete = () => {
      var url_apid = "http://192.168.96.154:3000/tb_follow";
      Alert.alert("Xóa", "Bạn có chắc chắn xóa bài viết này không?", [
        {
          text: 'Không',
          style: 'cancel'
        },
        {
          text: "Đồng ý", onPress: () => {
            fetch(url_apid + "/" + item.id, {
              method: 'DELETE'
            })
              .then((response => response.json()
              ))
              .then(data => {
                getDatafollow();
              })
              .catch(error => console.error(error));
          }
        }
      ])
    };

    return (

      <View style={styles.item}>
        <Text style={{
          fontWeight: '500', color: '#1877f2', fontSize: 15, marginBottom: 10,
        }}>{item.title_fl}</Text>
        <Text>{item.content_fl}</Text>
        <View style={{ width: '100%' }}>
          <Image source={{ uri: item.image_fl }} style={styles.imageSP} />
        </View>

        <View style={styles.bottonmenu}>
          <TouchableOpacity onPress={handleDelete}>
            <AntDesign name="hearto" size={24} color="black" style={{ margin: 5, color:coler}} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="comments-o" size={24} color="black" style={{ margin: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="send" size={24} color="black" style={{ margin: 5 }} />
          </TouchableOpacity>

        </View>

      </View>
    )
  }


  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // do something
      getDatafollow();
    });
    return unsubscribe;
  }, [props.navigation]);

  getData();

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
          Posts Followed </Text>
      </View>
      <View style={{ height: '85%' }}>
        <FlatList
          data={ListFl}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={reloading} onRefresh={reloadData} />
          }
          renderItem={renderPost}

        />
      </View>
    </View>
  )
}

export default Follow

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
    width: "100%", height: 400,
    marginTop: 10
  },
  bottonmenu: {
    margin: 5,
    flexDirection: 'row',
  },
  bottom: {
    width: '100%',
    height: '80%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center'
  }
})