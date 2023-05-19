import { Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, FlatList, Touchable, Alert, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'
import YoutubePlayer from "react-native-youtube-iframe";


const MovieClient = (props) => {
  const [playing, setPlaying] = useState(false);
  const [isLoading, setisLoading] = useState(true)
  const [ListVideo, setListVideo] = useState([])
  const [reloading, setreloading] = useState(false)

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
    let url_api = "http://192.168.96.154:3000/tb_videoyt";
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

    return (

      <View style={styles.item}>
        <Text style={{
          fontWeight: '500', color: '#1877f2', fontSize: 20, marginBottom: 10,
        }}>{item.title}</Text>
        <YoutubePlayer
          height={220}
          play={playing}
          videoId={item.idlink + ""}
          onChangeState={onStateChange}
        />
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
          Movies </Text>
      </View>
      <View style={{ flex: 1, marginTop: 20 }}>
     
          <FlatList
          data={ListVideo.reverse()}
            keyExtractor={item=>item.id}
         
          refreshControl={
            <RefreshControl refreshing={reloading} onRefresh={reloadData} />
          }
          renderItem={renderVideo}
          />
      </View>

    </View>
  )
}

export default MovieClient

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
    marginBottom: 10
  }

})