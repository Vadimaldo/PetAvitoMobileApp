import {Image, Pressable, Text} from "react-native";
import {style} from "./CarouselTypeStyle";

//Вынесение компонента для улучшения производительности
export const CarouselType = ({ item, index, handlePressCategory }) => {
  return (
    <Pressable
      onPress={() => handlePressCategory(index)}
      style={[
        style.carousel_item_container,
        item?.selected && style.carousel_item_container_selected
      ]}
    >
      <Image
        style={style.carousel_item_image}
        source={{ uri: item.image }}
        alt=''
      />
      <Text
        style={[
          style.carousel_item_title,
          item?.selected && style.carousel_item_title_selected
        ]}
      >
        {item.name}
      </Text>
    </Pressable>
  )
}