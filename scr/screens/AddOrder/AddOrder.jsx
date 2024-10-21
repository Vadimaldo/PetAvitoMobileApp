import {SafeAreaView} from "react-native-safe-area-context";
import {style} from "./AddOrderStyle";
import React, {Image, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {useEffect, useState} from "react";
import {COLORS} from "../../constants/COLORS";
import {createNewUserUser} from "../../fetch/PetFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ActionSheet} from "../../components/ActionSheet/ActionSheet";
import {getCategory} from "../../fetch/CategoryFetch";
import {useNavigation} from "@react-navigation/native";

export const AddOrder = () => {
  //Объявление хука навигации, для упрощенного использования
  const navigation = useNavigation();

  //Объявление стэйт переменных, которые будут отслеживать в работе экрана
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  //Категории питомцев
  const [categoryData, setCategoryData] = useState([]);

  //Переменная использующаяся для открытия экшеншита с категориями
  const [openActionChooseCategory, setOpenActionChooseCategory] = useState(false);

  //Получение категорий, при монтировании экрана
  useEffect(() => {
    const fetchCategory = async () => {
      const category = await getCategory();
      setCategoryData(category)
    }

    fetchCategory();
  }, []);

  //Функция добавление объявления по кнопке
  const handleAddOrder = async () => {
    const uid = await AsyncStorage.getItem("uid");
    //Проверка, что пользователь авторизован
    if (!!uid) {
      //Функция вызова добавление новой записи в коллекцию объявлений
      await createNewUserUser({name, price, description, year, type, uid, image});
    } else {
      //Переход на экран профиля, для авторизации
      navigation.navigate('ProfileStack')
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <ActionSheet
        open={openActionChooseCategory}
        active={type}
        setActive={setType}
        data={categoryData}
        handleClose={() => setOpenActionChooseCategory(false)}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View
          style={style.header_container}
        >
          <Text style={style.header_text}>
            Добавление нового объявления
          </Text>
        </View>
        <View style={style.text_input_container}>
          <Text style={style.text_input_title}>
            Укажите название
          </Text>
          <TextInput
            value={name}
            onChangeText={(el) => setName(el)}
            placeholder="Имя"
            placeholderTextColor={COLORS.grayText}
            style={style.text_input}
          />
        </View>
        <View style={style.text_input_container}>
          <Text style={style.text_input_title}>
            Выберите категорию
          </Text>
          <Pressable
            style={style.choose_category_container}
            onPress={() => setOpenActionChooseCategory(true)}
          >
            <Text
              disabled
              style={style.choose_category_text}
            >
              {!!type ? categoryData.filter(el => el.type === type)[0].name : "Категория"}
            </Text>
            <Image source={require("../../../assets/image/icons/dowr_arrow_icon.png")} />
          </Pressable>
        </View>
        <View style={style.text_input_container}>
          <Text style={style.text_input_title}>
            Укажите возвраст
          </Text>
          <TextInput
            value={year}
            onChangeText={(el) => setYear(el)}
            placeholder="Возраст"
            placeholderTextColor={COLORS.grayText}
            style={style.text_input}
          />
        </View>
        <View style={style.text_input_container}>
          <Text style={style.text_input_title}>
            Опишите животное
          </Text>
          <TextInput
            value={description}
            onChangeText={(el) => setDescription(el)}
            placeholder="Описание"
            placeholderTextColor={COLORS.grayText}
            style={style.text_input}
          />
        </View>
        <View style={style.text_input_container}>
          <Text style={style.text_input_title}>
            Укажите стоимость
          </Text>
          <TextInput
            value={price}
            onChangeText={(el) => setPrice(el)}
            placeholder="Стоимость"
            placeholderTextColor={COLORS.grayText}
            style={style.text_input}
          />
        </View>
        <Pressable
          onPress={handleAddOrder}
          style={style.bottom}
        >
          <Text
            style={style.bottom_text}
          >
            Создать объявление
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}