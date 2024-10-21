import {style} from "./ProfileScreenStyle";
import {SafeAreaView} from "react-native-safe-area-context";
import React, {Image, Pressable, Text, View} from "react-native";
import {useCallback, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {fetchUser} from "../../../fetch/Auth";
import {COLORS} from "../../../constants/COLORS";
import auth from '@react-native-firebase/auth';
import {getCommentsAboutUser} from "../../../fetch/CommentsFetch";
import {getMyPetInfo} from "../../../fetch/PetFetch";

export const ProfileScreen = () => {
  //Объявление хука навигации, для упрощенного использования
  const navigation = useNavigation();

  //Объявление стэйт переменных, которые будут отслеживать в работе экрана
  const [uid, setUid] = useState(true);
  const [userData, setUserData] = useState({});
  const [dataCommentsAboutMe, setDataCommentsAboutMe] = useState({});
  const [petArray, setPetArray] = useState([]);

  //При получение фокуса на экране получается информация о пользователе
  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [])
  );

  //Получение информации о пользователе
  const getUser = async () => {
    const uid = await AsyncStorage.getItem("uid");
    //Если авторизован - получаются комментарии о пользователе и созданные им заявления
    if (!!uid) {
      setUid(true);
      const user = await fetchUser(uid);
      setUserData(user[0]);

      getComments(uid);
      getUserOrder();
    } else {
      setUid(false)
    }
  }

  //Получение информации комментариев о пользователе
  const getComments = async (uid) => {
    const commentAboutUser = await getCommentsAboutUser(uid);

    setDataCommentsAboutMe(commentAboutUser)
  }

  //Получение количества объявлений созданных пользователем
  const getUserOrder = async () => {
    const petInfo = await getMyPetInfo();

    setPetArray(petInfo);
  }

  //Усреднение оценки комментариев о пользователе
  let getAverage = (arr) => {
    const arrTemp = arr.map(arr => arr.value);
    let reducer = (total, currentValue) => total + currentValue;
    let sum = arrTemp.reduce(reducer)
    return sum / arrTemp.length;
  }

  //Если пользователь авторизован - показывается профиль, если нет - экран с переходи на авторизацию/регистрацию
  return (
    <SafeAreaView style={style.container}>
      {
        uid ? (
          <View
            style={{
              height: '100%'
            }}
          >
            <View
              style={{
                alignItems: 'center',
                marginTop: 40,
                marginBottom: 37
              }}
            >
              <Image
                style={{
                  width: 74,
                  height: 74,
                  borderRadius: 37,
                  borderWidth: 1,
                  borderColor: COLORS.mainPink,
                  marginBottom: 12
                }}
                source={userData?.avatar
                  ? { uri: userData?.avatar }
                  : require('../../../../assets/image/no-photo-placeholder.jpg')
                }
              />
              <Text style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 16,
                marginBottom: 16
              }}>
                {userData.email}
              </Text>
              <Text style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 14,
                color: COLORS.grayText,
                marginBottom: 8
              }}>
                Средняя оценка: {dataCommentsAboutMe.length ? getAverage(dataCommentsAboutMe) : 0}
              </Text>
              <Text style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                color: COLORS.grayText
              }}>
                Отзывов обо мне: {dataCommentsAboutMe.length}
              </Text>
            </View>
            <Pressable
              onPress={() => navigation.navigate('MyOrderScreen')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 12
              }}
            >
              <View>
                <Text style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 14,
                }}>
                  Объявления
                </Text>
                <Text style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 12,
                  color: COLORS.grayText
                }}>
                  Активных: {petArray.length}
                </Text>
              </View>
              <Image
                source={require('../../../../assets/image/icons/right-arrow.png')}
              />
            </Pressable>
            <Pressable
              style={{
                position: 'absolute',
                bottom: 25,
                paddingLeft: '25%',
              }}
              onPress={() => {
                auth()
                  .signOut()
                AsyncStorage.removeItem('uid')
                navigation.navigate('AuthStack', {
                  screen: 'AuthorizationScreen'
                })
              }}
            >
              <Text style={style.sign_out_text}>
                Выход из приложения
              </Text>
            </Pressable>
          </View>
        ) : (
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={style.bottom_title_text}>
              Авторизуйтесь/Зарегистрируйтесь
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate('AuthStack', {
                  screen: 'AuthorizationScreen'
                })
             }
              style={style.bottom}
            >
              <Text style={style.bottom_text}>
                Авторизоваться
              </Text>
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate('AuthStack', {
                  screen: 'RegistrationScreen'
                })
              }
              style={style.bottom}
            >
              <Text style={style.bottom_text}>
                Зарегистрироваться
              </Text>
            </Pressable>
          </View>
        )
      }
    </SafeAreaView>
  )
}