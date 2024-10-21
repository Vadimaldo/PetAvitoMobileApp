import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Запись обращение к коллекции(базе данных) PetInfo
const petInfoCollection = firestore().collection('petInfo');

//Обращение к Firebase создает новую запись (новое объявление)
export const createNewUserUser = async ({name, price, description, year, type, uid, image}) => {
  petInfoCollection
    .add({name, price, description, year, type, uid, image})
    .then(() => console.log('order added'))
}

//Обращение к Firebase. Получение всех записей объявлений о животных. Не своих.
export const getPetInfo = async () => {
  const uid = await AsyncStorage.getItem('uid');

  return new Promise((resolve, reject) => {
    petInfoCollection
      .where('uid', '!=', uid)
      .onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const {name, image, price, description, years, uid, type} = doc.data();
        list.push({name, image, price, description, years, uid, type});
      });
      resolve(list);
    }, (error) => {
      reject(error);
    });
  });
}

//Обращение к Firebase. Получение всех своих записей объявлений о животных.
export const getMyPetInfo = async () => {
  const uid = await AsyncStorage.getItem('uid');

  return new Promise((resolve, reject) => {
    petInfoCollection
      .where('uid', '==', uid)
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const {name, image, price, description, years, uid, type} = doc.data();
          list.push({name, image, price, description, years, uid, type});
        });
        resolve(list);
      }, (error) => {
        reject(error);
      });
  });
}

//Обращение к Firebase. Получение объявлений о выбранных животных. Не своих объявлений.
export const getFilterPetInfo = async (type) => {
  const uid = await AsyncStorage.getItem('uid');
  return new Promise((resolve, reject) => {
    petInfoCollection
      .where('uid', '!=', uid)
      .where('type', '==', `${type}`)
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const {name, image, price, description, years, uid, type} = doc.data();
          list.push({name, image, price, description, years, uid, type});
        });
        resolve(list);
      }, (error) => {
        reject(error);
      });
  });
}

//Обращение к Firebase. Удаление выбранного объявления
export const deletePetInfoByFields = async (item) => {
  return new Promise((resolve, reject) => {
    petInfoCollection
      .where('name', '==', item.name)
      .where('uid', '==', item.uid)
      .where('type', '==', item.type)
      .onSnapshot((querySnapshot) => {
        console.log(querySnapshot)
        if (!querySnapshot.empty) {
          // Если есть совпадение, удаляем документ
          querySnapshot.forEach((doc) => {
            const documentId = doc.id; // Получаем documentId
            petInfoCollection
              .doc(documentId)
              .delete()
              .then(() => {
                console.log('Document successfully deleted!');
                resolve(true);
              })
              .catch((error) => {
                console.error('Error removing document: ', error);
                reject(error);
              });
          });
        } else {
          console.log('No matching documents.');
          resolve(false);
        }
      })
      .catch((error) => {
        console.error('Error getting document: ', error);
        reject(error);
      });
  });
};