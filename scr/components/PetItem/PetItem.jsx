import {Image, Pressable, Text, View} from "react-native";
import React from "react";
import {style} from "./PetItemStyle";
import {ItemActionSheet} from "../../screens/MainStack/MainScreen/component/ItemActionSheet/ItemActionSheet";

//Вынесенный компонент объявления для использования в разных местах приложения
export const PetItem = ({ item, index }) => {
  const [openItemActionSheet, setOpenItemActionSheet] = React.useState(false);

  return (
    <>
      {openItemActionSheet
        && <ItemActionSheet setOpenItemActionSheet={setOpenItemActionSheet} item={item} index={index} />
      }
      <Pressable onPress={() => setOpenItemActionSheet(true)} style={style.item_container}>
        <Image
          style={style.image_item}
          source={item?.image
            ? { uri: item?.image }
            : require('../../../assets/image/no-photo-placeholder.jpg')
          }
        />
        <View style={style.item_text_container}>
          <View style={style.item_name_container}>
            <Text style={style.item_name_text} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={style.item_years_text}>
              {item.years} год
            </Text>
          </View>
          <Text style={style.item_years_description} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={style.item_years_price}>
            {item.price} ₽
          </Text>
        </View>
      </Pressable>
    </>
  )
}