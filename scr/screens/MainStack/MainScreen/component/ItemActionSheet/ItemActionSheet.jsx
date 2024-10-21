import {Actionsheet} from "native-base";
import React, {Image, Linking, Modal, Pressable, ScrollView, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {fetchUser} from "../../../../../fetch/Auth";
import {COLORS} from "../../../../../constants/COLORS";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {deletePetInfoByFields} from "../../../../../fetch/PetFetch";


export const ItemActionSheet = ({ item, index, setOpenItemActionSheet }) => {
  const [userData, setUserData] = useState({});
  const [isYouOrder, setIsYouOrder] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  //получение данных при монтирование экрана
  useEffect(() => {
    getUser();
  }, []);

  //получение данных пользователя
  const getUser = async () => {
    const uid = await AsyncStorage.getItem("uid");
    if (uid === item.uid) {
      setIsYouOrder(true)
    }
    const user = await fetchUser(item.uid);
    setUserData(user[0]);
  }

  //удаление объявления о питомце, если оно пользователя
  const handleDeleteOrder = async (item) => {
    await deletePetInfoByFields(item)
    handleClose();
  }

  //закрытие экшена
  const handleClose = () => {
    setOpenItemActionSheet(false)
  };

  //Отображение экшена с информацией о питомце
  //Экшен содержит основную информацию и два состояния
  //Если объявление пользователя, то убирается информация о пользователе и кнопка "Отобразить контакты", добавляется "Удалить объявление"
  //Иначе, отображается информация о пользователе и кнопка "Отобразить контакты", нажатие на которую открывает модальное окно
  //Модальное окно содержит информацию о владельце. Нажатие на телефон перенаправляет в контакты. Нажатие на почту - в отправку письма.
  return (
    <>
      <Modal
        animationType={"fade"}
        visible={modalVisible}
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
              backgroundColor: COLORS.white,
              borderRadius: 20,
              borderColor: COLORS.lightGrayText,
              borderWidth: 0.5
            }}
          >
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                marginTop: 20,
                fontSize: 18,
                textAlign: 'center'
              }}
            >
              Данные владельца
            </Text>
            <Pressable
              onPress={() => Linking.openURL(`mailto:${userData.email}`)}
            >
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  marginTop: 10,
                  fontSize: 16,
                  textAlign: 'center'
                }}
              >Почта для связи: <Text style={{color: COLORS.blue}}>{userData.email}</Text></Text>
            </Pressable>
            <Pressable
              onPress={() => Linking.openURL(`tel:${userData.phone}`)}
            >
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  marginTop: 10,
                  fontSize: 16,
                  textAlign: 'center'
                }}
              >Телефон для связи: <Text style={{color: COLORS.blue}}>{userData.phone}</Text></Text>
            </Pressable>
            <Pressable
              style={{
                width: '100%',
                alignItems: 'center',
                backgroundColor: COLORS.mainPink,
                borderRadius: 10,
                marginTop: 20,
                marginBottom: 20,
              }}
              onPress={() => {
                setModalVisible(false)
              }}
            >
              <Text
                style={{
                  color: '#FFF',
                  fontFamily: 'Montserrat-Regular',
                  marginVertical: 5,
                  fontSize: 16,
                  marginHorizontal: 20
                }}
              >Закрыть</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Actionsheet
        padding={0}
        isOpen
        position="relative"
        onClose={handleClose}
      >
        <Actionsheet.Content
          style={{
            elevation: 0,
            width: '100%',
          }}
          padding={0}
          backgroundColor="#fff"
        >
          <ScrollView
            style={{ width: '100%', paddingHorizontal: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <Image
              style={{
                width: 350,
                height: 350,
                borderRadius: 26,
                marginBottom: 20,
                alignSelf: 'center'
              }}
              source={item?.image
                ? { uri: item?.image }
                : require('../../../../../../assets/image/no-photo-placeholder.jpg')
              }
            />
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 26,
              }}
            >
              {item.price} ₽
            </Text>
            <Text
              style={{
                marginBottom: 34,
                fontFamily: 'Montserrat-Medium',
                fontSize: 22,
              }}
            >
              {item?.name}
            </Text>
            {
              !isYouOrder ? (
                <>
                  <Text
                    style={{
                      marginBottom: 34,
                      fontFamily: 'Montserrat-Medium',
                      fontSize: 22,
                    }}
                  >
                    Владелец - {userData?.name}
                  </Text>
                  <Pressable
                    onPress={() => setModalVisible(true)}
                    style={{
                      width: '100%',
                      paddingVertical: 16,
                      backgroundColor: COLORS.mainPink,
                      borderRadius: 16,
                      alignItems: 'center',
                      marginBottom: 20
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.white,
                        fontFamily: 'Montserrat-Regular',
                        fontSize: 16,
                      }}
                    >
                      Обменять контакты
                    </Text>
                  </Pressable>
                </>
              ) : null
            }
            <Text
              style={{
                marginBottom: 20,
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 24,
              }}
            >
              Характеристики
            </Text>
            <View
              style={{
                width: 85,
                backgroundColor: '#DBF1FF',
                paddingHorizontal: 12,
                paddingVertical: 10,
                marginBottom: 20,
                borderRadius: 26
              }}
            >
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 16,
                  color: COLORS.grayText,
                }}
              >
                {item.years}-й год
              </Text>
            </View>
            <Text
              style={{
                marginBottom: 40,
                fontFamily: 'Montserrat-Regular',
                fontSize: 14,
                color: COLORS.grayText,
              }}
            >
              {item.description}
            </Text>
            {
              isYouOrder ? (
                <Pressable
                  onPress={() => handleDeleteOrder(item)}
                  style={{
                    width: '100%',
                    paddingVertical: 16,
                    backgroundColor: COLORS.mainPink,
                    borderRadius: 16,
                    alignItems: 'center',
                    marginBottom: 20
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 16,
                    }}
                  >
                    Удалить объявление
                  </Text>
                </Pressable>
              ) : null
            }
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  )
}