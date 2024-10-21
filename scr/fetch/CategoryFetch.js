import firestore from '@react-native-firebase/firestore';

//Запись обращение к коллекции(базе данных) CategoryPets
const categoryCollection = firestore().collection('categoryPets');

//Обращение к Firebase получение всех категорий питомцев из бд
export const getCategory = async () => {
  return new Promise((resolve, reject) => {
    categoryCollection.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const {name, image, type} = doc.data();
        list.push({name, image, type});
      });
      resolve(list);
    }, (error) => {
      reject(error);
    });
  });
}