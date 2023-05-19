import { StyleSheet, Text, View, TouchableOpacity, RefreshControl, Image, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native';
import { TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const QlUser = ({navigation}) => {
    const [listcmt, setlistcmt] = useState([]);
    const [reloading, setreloading] = useState(false)
    var url_user = 'http://192.168.96.154:3000/tb_user';
    const reloadData = React.useCallback(() => {
        // xử lý công việc load lại dữ liệu đổ vào danh sách
        setreloading(true); // set trạng thái bắt đầu reload
        getDataUser();
        // mô phỏng đợi reload, nếu là reload từ server thật thì không cần viết lệnh dưới
        setTimeout(() => {
            setreloading(false); // sau 2s thì đổi trạng thái không rload nữa
        }, 2000);
    });

    const getDataUser = async () => {

    
        try {
            const response = await fetch(url_user); //lấy dữ liệu về 
            const jsonSP = await response.json(); // chuyển dũ liêu thành đt json
            console.log(jsonSP);
            setlistcmt(jsonSP);

        } catch (error) {
            console.error(error);
        } finally {
        }
    }

    const renderUser = ({ item }) => {

        const handleDelete = () => {
            Alert.alert("Xóa", "Bạn có chắc chắn xóa bài viết này không?", [
                {
                    text: 'Không',
                    style: 'cancel'
                },
                {
                    text: "Đồng ý", onPress: () => {
                        if (item.username=="admin") {
                            alert('Không thể xóa Admin')
                        }else {
                        fetch(url_user + "/" + item.id, {
                            method: 'DELETE'
                        })
                            .then((response => response.json()
                            ))
                            .then(data => {
                               getDataUser();
                            })
                            .catch(error => console.error(error));
                    }
                }
                }
            ])
        };

        return (

            <View style={styles.item}>
                <Text style={{
                    fontWeight: '500', color: '#1877f2', fontSize: 15, marginBottom: 5,
                }}>Tên đăng nhập: {item.username}</Text>
                <Text style={{ fontStyle: 'italic' }}>Họ và Tên: {item.firstname} {item.lastname}</Text>
                <Text style={{ fontStyle: 'italic' }}>Số điện thoại: {item.phone}</Text>
                <Text style={{ fontStyle: 'italic' }}>Mật khẩu: *******</Text>


                <View style={{ flexDirection: 'row-reverse' }}>
                    <TouchableOpacity onPress={handleDelete}>
                        <Image style={{ width: 30, height: 30, margin: 10, tintColor: 'red' }} source={require("../assets/delete-icon.png")}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // do something
            getDataUser();
            // getDataComment(); 
        });
        return unsubscribe;
    }, [navigation.navigation]);

  return (
      <View style={{ flex: 1 }}>
          <View style={{
              height: 60,
              backgroundColor: 'white',
              elevation: 10,
              alignItems: "center",
              justifyContent: 'space-between',
              paddingTop: 10,
              paddingLeft: 10,
              flexDirection: 'row'
          }}>
              <TouchableOpacity onPress={() => navigation.goBack()} >
                  <Ionicons name="arrow-back-outline" size={24} color="black" style={{}} />
              </TouchableOpacity>
              <Text style={{ justifyContent: 'center', marginRight: '40%', fontWeight: 'bold', fontSize: 17 }}>List User</Text>
          </View>


          <FlatList
              data={listcmt}
              keyExtractor={item => item.id}
              refreshControl={
                  <RefreshControl refreshing={reloading} onRefresh={reloadData} />
              }
              renderItem={renderUser}
          >
          </FlatList>

      </View>
  )
}

export default QlUser

const styles = StyleSheet.create({
    bottom: {
        bottom: 0,
        position: 'absolute',
        justifyContent: 'space-between',
        alignContent: "space-between",
    },
    item: {
        marginTop: 5,
        marginLeft: 5,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        elevation: 10,
        borderRadius: 10,
        padding: 10
    }
})