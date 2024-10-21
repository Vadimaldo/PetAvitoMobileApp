import {style} from "./MyOrderScreenStyle";
import {SafeAreaView} from "react-native-safe-area-context";
import React, {FlatList, Image, Pressable, Text, View} from "react-native";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useCallback, useState} from "react";
import {getMyPetInfo} from "../../../fetch/PetFetch";
import {PetItem} from "../../../components/PetItem/PetItem";


export const MyOrderScreen = (props) => {
  //Объявление хука навигации, для упрощенного использования
  const navigation = useNavigation();

  //Объявление стэйт переменных, которые будут отслеживать в работе экрана
  const [petArray, setPetArray] = useState([]);

  //При получение фокуса на экране получается информация об объявлениях пользователя
  useFocusEffect(
    useCallback(() => {
      getUserOrder();
    }, [])
  );

  const getUserOrder = async () => {
    const petInfo = await getMyPetInfo();

    setPetArray(petInfo);
  }

  return (
    <SafeAreaView style={style.container}>
      <View
        style={style.header_container}
      >
        <Pressable
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../../../../assets/image/icons/left-arrow.png')} />
        </Pressable>
        <Text style={style.header_text}>
          Мои объявления
        </Text>
        <View style={{ width: 30 }} />
      </View>
      <View>
        <FlatList
          data={petArray}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            rowGap: 10
          }}
          showsVerticalScrollIndicator={false}
          style={{
            width: '100%',
            marginTop: 20,
            marginBottom: 120
          }}
          renderItem={({ item, index }) => (
            <PetItem item={item} index={index} />
          )}
        />
      </View>
    </SafeAreaView>
  )
}