import { Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, FlatList, Touchable, Alert, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'
import YoutubePlayer from "react-native-youtube-iframe";

const Movie = (props) => {
  const [playing, setPlaying] = useState(false);
  const [isLoading, setisLoading] = useState(true)
  const [ListVideo, setListVideo] = useState([])
  const [reloading, setreloading] = useState(false)

  let url_api = "http://192.168.96.154:3000/tb_videoyt";

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const reloadData = React.useCallback(() => {
    // xử lý công việc load lại dữ liệu đổ vào danh sách
    setreloading(true); // set trạng thái bắt đầu reload
    getData();
    // mô phỏng đợi reload, nếu là reload từ server thật thì không cần viết lệnh dưới
    setTimeout(() => {
      setreloading(false); // sau 2s thì đổi trạng thái không rload nữa
    }, 2000);


  });

  const getData = async () => {
  
    try {
      const response = await fetch(url_api); //lấy dữ liệu về 
      const jsonSP = await response.json(); // chuyển dũ liêu thành đt json
      console.log(jsonSP);
      setListVideo(jsonSP);

    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  }

  const renderVideo = ({ item }) => {
    const handleDelete = () => {

      Alert.alert("Xóa", "Bạn có chắc chắn xóa Video này không?", [
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
                const newPosts = ListVideo.filter(ListVideo => ListVideo.id !== item.id);
                setListVideo(newPosts);
              })
              .catch(error => console.error(error));
          }
        }
      ])
    };

    const chuyentrangUpadate=()=>{
      props.navigation.navigate('EditVideo', { id: item.id, title: item.title, idlink:item.idlink}) 
    }
    return (

      <View style={styles.item}>
        <Text style={{ fontWeight: '500', color:'#1877f2',fontSize:20, marginBottom:10, 
        }}>{item.title}</Text>
        <YoutubePlayer
          height={220}
          play={playing}
          videoId={item.idlink+ ""}
          onChangeState={onStateChange}
        />

      <View style={{flexDirection:'row-reverse'}}>
          <TouchableOpacity onPress={chuyentrangUpadate}>
            <Image style={{width:30, height:30, margin:10, tintColor:'blue'}} source={require("../assets/edit.png")}></Image>
        </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Image style={{ width: 30, height: 30, margin: 10,tintColor:'red' }} source={require("../assets/delete-icon.png")}></Image>
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
          Video entertainment </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("AddVideo")}>
          <Image source={require("../assets/add_FILL0_wght400_GRAD0_opsz48.png")}
            style={{
              alignContent: 'flex-end',
              tintColor: 'white',
              width: 40,
              height: 40
            }}></Image>
        </TouchableOpacity>

      </View>
      <View style={{flex:1,marginTop:20}}>
  
          <FlatList
            data={ListVideo.reverse()}
            keyExtractor={({ id }) => id}
              refreshControl={
                <RefreshControl refreshing={reloading} onRefresh={reloadData} />
              }
            renderItem={renderVideo}
          />
      </View>

    </View>

  )
}

export default Movie

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
  item:{
    borderColor:'#1877f2',
    padding:10,
    backgroundColor:'white',
    elevation:10,
    marginBottom:10
  }

})