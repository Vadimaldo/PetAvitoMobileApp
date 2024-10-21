//Запись обращение к коллекции(базе данных) CategoryPets
import firestore from "@react-native-firebase/firestore";

//Запись обращение к коллекции(базе данных) комментариев
const commentsCollection = firestore().collection('comments');

//Обращение к Firebase получение всех комментариев о пользователе из бд
export const getCommentsAboutUser = async (uid) => {
  return new Promise((resolve, reject) => {
    commentsCollection
      .where('uid_uset', '==', uid)
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const {text, value} = doc.data();
          list.push({text, value});
        });
        resolve(list);
    }, (error) => {
      reject(error);
    });
  });
}