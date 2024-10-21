import React, {Image, Pressable, Text} from "react-native";
import {style} from "./InitialScreenStyle";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinkAuthReg} from "../../../components/linkAuthReg/LinkAuthReg";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InitialScreen () {
  //Объявление хука навигации, для упрощенного использования
  const navigation = useNavigation();

  //SafeAreaView - отображения контента в пределах безопасной зоны устройства
  return (
    <SafeAreaView style={style.container}>
      <Image
        style={style.logo_image}
        source={require('../../../../assets/image/logo.png')}
      />
      <Text
        style={style.screen_title}
      >
        Твой любимец уже совсем рядом
      </Text>
      <Text
        style={style.screen_title_text}
      >
        Осталось чуть-чуть
      </Text>
      <Pressable
        style={style.bottom}
        onPress={async () => {
          //Запись в кэш, что был вход в приложение и переход на регистрацию
          await AsyncStorage.setItem('initScreen', 'true')
          navigation.navigate('RegistrationScreen')
        }}
      >
        <Text
          style={style.bottom_text}
        >
          Зарегистрироваться
        </Text>
      </Pressable>
      <LinkAuthReg type={'auth'} initScreen />
    </SafeAreaView>
  )
}
