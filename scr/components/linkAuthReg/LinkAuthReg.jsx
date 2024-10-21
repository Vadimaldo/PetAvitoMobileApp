import React, {Pressable, Text, View} from "react-native";
import {style} from "./LinkAuthRegStyle";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Вынесенный компонент нижнего перехода между авторизацией и регистрацией
export const LinkAuthReg = ({ type, initScreen }) => {
  //Объявление хука навигации, для упрощенного использования
  const navigation = useNavigation();

  //В зависимости от приходящего типа, меняется отрисовка
  return (
    <View
      style={style.auth_link}
    >
      <Text
        style={style.auth_link_text}
      >
        {
          type === 'auth' ? (
            'Уже есть аккаунт?'
          ) : (
            'Еще нету аккаунта?'
          )
        }
      </Text>
      <Pressable
        onPress={async () => {
          //Если переход с первичного экрана - записывается в кэш, что заход в приложение был
          if (initScreen) {
            await AsyncStorage.setItem('initScreen', 'true')
          }
          if (type === 'auth') {
            navigation.navigate('AuthorizationScreen')
          } else {
            navigation.navigate('RegistrationScreen')
          }
        }}
      >
        <Text
          style={style.auth_link_text_button}
        >
          {
            type === 'auth' ? (
              'Войти'
            ) : (
              'Зарегистрироваться'
            )
          }
        </Text>
      </Pressable>
    </View>
  )
}
