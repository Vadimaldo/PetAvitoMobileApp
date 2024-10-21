import React, {Image, Modal, Pressable, Text, TextInput, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinkAuthReg} from "../../../components/linkAuthReg/LinkAuthReg";
import {style} from "./RegistrationScreenStyle";
import {useState} from "react";
import {COLORS} from "../../../constants/COLORS";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import {createNewUserUser} from "../../../fetch/Auth";
import {useNavigation} from "@react-navigation/native";

export default function RegistrationScreen () {
  //Объявление хука навигации, для упрощенного использования
  const navigation = useNavigation();

  //Объявление стэйт переменных, которые будут отслеживать в работе экрана
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalText, setModalText] = useState('')

  //Чистка состояний экрана, чтобы при повторном входе поля инпута были пустые
  const clearState = () => {
    setEmail('')
    setPassword('')
  }

  //Отлов нажатия на кнопку регистрации
  const handleRegistrationPress = () => {
    //проверка что поля не пустые, если да, показывается модальное окно с ошибкой
    if (email?.trim() === '' || password?.trim() === '') {
      clearState()
      const titleError = 'Возникла ошибка!'
      let textError = 'Все поля должны быть заполненны!'

      setModalTitle(titleError)
      setModalText(textError)
      setModalVisible(true)
      return true
    }

    //если поля заполнены происходит регистрация
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (res) => {
        console.log('User account created & signed in!');
        //успешная регистрация, запись пользовательского id в кэш и переход в таббар
        const uid = res.user.uid
        await createNewUserUser(email, uid)
        await AsyncStorage.setItem('uid', uid)
        navigation.navigate('TabStack')
        clearState()
      })
      .catch(error => {
        //отлавливается ошибка и выводится модальное окно с ней
        const titleError = 'Возникла ошибка!'
        let textError = ''

        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          textError = 'Этот email уже используется!';
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          textError = 'Этот email не корректен!';
        }

        clearState()

        setModalTitle(titleError)
        setModalText(textError)
        setModalVisible(true)

        console.error(error);
      });
  }

  return (
    <SafeAreaView style={style.container}>
      <Image
        style={style.logo_image}
        source={require('../../../../assets/image/logo.png')}
      />
      <Text
        style={style.screen_title}
      >Регистрация</Text>
      <View
        style={style.text_input_container}
      >
        <TextInput
          value={email}
          onChangeText={(el) => setEmail(el)}
          placeholder="Почта"
          placeholderTextColor={COLORS.grayText}
          style={style.text_input}
        />
        <TextInput
          value={password}
          secureTextEntry
          onChangeText={(el) => setPassword(el)}
          placeholder="Пароль"
          placeholderTextColor={COLORS.grayText}
          style={style.text_input}
        />
      </View>
      <Pressable
        onPress={handleRegistrationPress}
        style={style.button}
      >
        <Text
          style={style.button_text}
        >
          Зарегистрироваться
        </Text>
      </Pressable>
      <LinkAuthReg type={'auth'} />
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
            >{modalTitle}</Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                marginTop: 10,
                fontSize: 16,
                textAlign: 'center'
              }}
            >{modalText}</Text>
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
    </SafeAreaView>
  )
}
