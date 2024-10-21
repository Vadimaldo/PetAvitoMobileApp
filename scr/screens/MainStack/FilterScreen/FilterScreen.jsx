import React, {Image, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {COLORS} from "../../../constants/COLORS";
import {SafeAreaView} from "react-native-safe-area-context";
import {style} from "./FilterScreenStyle";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";

export const FilterScreen = () => {
  //Объявление хука навигации, для упрощенного использования
  const navigation = useNavigation();

  //Объявление стэйт переменных, которые будут отслеживать в работе экрана
  const [oldAt, setOldAt] = useState('')
  const [oldFrom, setOldFrom] = useState('')
  const [priceAt, setPriceAt] = useState('')
  const [priceFrom, setPriceFrom] = useState('')

  //Отрабатывает после нажатия на кнопку, отправляет данные фильтров на главны экран
  const handleChooseFilter = () => {
    navigation.navigate(
      'MainScreen',
      {oldAt, oldFrom, priceAt, priceFrom}
    )
  }

  return (
    <SafeAreaView style={style.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View
          style={style.header_container}
        >
          <Pressable
            onPress={() => navigation.goBack()}
          >
            <Image source={require('../../../../assets/image/icons/left-arrow.png')} />
          </Pressable>
          <Text style={style.header_text}>
            Фильтрация
          </Text>
          <View style={{ width: 30 }} />
        </View>
        <View style={style.text_input_container}>
          <Text style={style.text_input_title}>
            Укажите возраст питомца
          </Text>
          <View style={style.text_input_second_container}>
            <TextInput
              value={oldAt}
              onChangeText={(el) => setOldAt(el)}
              placeholder="От"
              placeholderTextColor={COLORS.grayText}
              style={style.text_input}
            />
            <TextInput
              value={oldFrom}
              onChangeText={(el) => setOldFrom(el)}
              placeholder="До"
              placeholderTextColor={COLORS.grayText}
              style={style.text_input}
            />
          </View>
        </View>
        <View style={style.text_input_container}>
          <Text style={style.text_input_title}>
            Укажите стоимость
          </Text>
          <View style={style.text_input_second_container}>
            <TextInput
              value={priceAt}
              onChangeText={(el) => setPriceAt(el)}
              placeholder="От"
              placeholderTextColor={COLORS.grayText}
              style={style.text_input}
            />
            <TextInput
              value={priceFrom}
              onChangeText={(el) => setPriceFrom(el)}
              placeholder="До"
              placeholderTextColor={COLORS.grayText}
              style={style.text_input}
            />
          </View>
        </View>

        <Pressable
          onPress={handleChooseFilter}
          style={style.bottom}
        >
          <Text
            style={style.bottom_text}
          >
            Применить фильтр
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}
