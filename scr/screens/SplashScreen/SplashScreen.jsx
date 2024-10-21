import {Image, View} from "react-native";
import {style} from "./SplashScreenStyle";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

export default function SplashScreen () {
  //Объявление хука навигации, для упрощенного использования
  const navigation = useNavigation();

  React.useEffect(() => {
    //Функция проверки первичности входа и раннее авторизированного аккаунта
    const getInitScreen = async () => {
      //Получение переменной первичного входа
      const init = await AsyncStorage.getItem("initScreen");
      //Получение переменной id пользователя
      const uid = await AsyncStorage.getItem("uid");
      //Если пользователь авторизовался ранее, то переход на табы
      if (!!uid) {
        navigation.navigate("TabStack");
      } else {
        //Если пользователь входил в приложение раньше, переход на авторизацию
        if (!!init) {
          navigation.navigate("AuthStack", {
            screen: "AuthorizationScreen"
          });
        } else {
          //Переход на первоначальный экран
          navigation.navigate("AuthStack", {
            screen: "InitialScreen"
          });
        }
      }
    }

    getInitScreen();
  }, []);

  return (
    <View style={style.container}>
      <Image
        style={style.logo_image}
        source={require('../../../assets/image/logo.png')}
      />
    </View>
  )
}
