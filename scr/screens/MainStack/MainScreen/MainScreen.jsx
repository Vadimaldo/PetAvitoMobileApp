import {FlatList, Image, Pressable, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {style} from "./MainScreeStyle";
import {useCallback, useEffect, useState} from "react";
import {getCategory} from "../../../fetch/CategoryFetch";
import {CarouselType} from "./component/CaruselType/CarouselType";
import {PetItem} from "../../../components/PetItem/PetItem";
import {getFilterPetInfo, getPetInfo} from "../../../fetch/PetFetch";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";

export const MainScreen = () => {
  //Объявление хука навигации, для упрощенного использования
  const navigation = useNavigation();
  //Объявление хука рутов, для для получения параметров из других экранов
  const route = useRoute();

  //Объявление начальных стэйт переменных, которые будут отслеживать в работе экрана
  const [categoryArray, setCategoryArray] = useState([{
    name: 'Все',
    selected: true,
    image: 'https://firebasestorage.googleapis.com/v0/b/petshopapp-3275d.appspot.com/o/f9312f57bbb254ce4b34c214c379b939%201.png?alt=media&token=09fe456f-b8eb-4f11-bc63-97b6fd3792f8'
  }]);
  const [petArray, setPetArray] = useState([]);
  const [filter, setFilter] = useState(
    route?.params
    || {"oldAt": "0", "oldFrom": "0", "priceAt": "0", "priceFrom": "0"}
  );

  //получения всех питомцев при изменение состояния переменной фильтра
  useEffect(() => {
    getPet(0)
  }, [filter]);

  //изменения значения фильтра, если изменилось значение параметра из рутов
  useEffect(() => {
    setFilter(route?.params)
  }, [route?.params])

  //получение информации от всех питомцев
  const getPet = async (index) => {
    //изначальное состояние
    let pet = [];
    setPetArray(pet)
    //если индекс категории нулевой - выводятся все питомцы, если отличный - то определенная категория
    if (index === 0) {
      pet = await getPetInfo()
    } else {
      pet = await getFilterPetInfo(categoryArray[index]?.type)
    }

    //сохранение отфильтрованных значений массива
    setPetArray(
      pet.filter(el => {
        const oldAt = filter?.oldAt || 0;
        const oldFrom = filter?.oldFrom || 100;
        const priceAt = filter?.priceAt || 0;
        const priceFrom = filter?.priceFrom || 1000000;

        return +el.price >= +priceAt && +el.price <= +priceFrom && +el.years >= +oldAt && +el.years <= +oldFrom;
      })
    )
  }

  //Получение категорий и информации о питомце при получение фокуса на экране
  useFocusEffect(
    useCallback(() => {
      const fetchCategory = async () => {
        const category = await getCategory();
        setCategoryArray([{
          name: 'Все',
          selected: true,
          image: 'https://firebasestorage.googleapis.com/v0/b/petshopapp-3275d.appspot.com/o/f9312f57bbb254ce4b34c214c379b939%201.png?alt=media&token=09fe456f-b8eb-4f11-bc63-97b6fd3792f8'
        },
          ...category
        ])
        await getPet(0);
      }

      fetchCategory();
    }, [])
  )

  //Отслеживание нажатия на одну из категорий питомца
  const handlePressCategory = async (index) => {
    //идет перебор массива категорий, и установка флага выбранного типа
    categoryArray.map((el, categoryIndex) =>
      index === categoryIndex ? el.selected = true : el.selected = false
    )

    //Запись массива с выбранной категорией
    setCategoryArray([...categoryArray])
    await getPet(index);
  }

  return (
    <SafeAreaView style={style.container}>
      <View
        style={style.header_container}
      >
        <Image
          style={style.image_logo}
          source={require('../../../../assets/image/logo.png')}
        />
        <Pressable onPress={() => navigation.navigate('FilterScreen')}>
          <Image
            style={style.image_filter_icon}
            source={require('../../../../assets/image/icons/filter-icon.png')}
          />
        </Pressable>
      </View>
      <FlatList
        data={categoryArray}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <CarouselType item={item} index={index} handlePressCategory={handlePressCategory} />
        )}
      />
      <FlatList
        data={petArray}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          rowGap: 10
        }}ц
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
    </SafeAreaView>
  )
}
