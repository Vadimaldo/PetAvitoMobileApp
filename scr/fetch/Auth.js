import firestore from "@react-native-firebase/firestore";

//Запись обращение к коллекции(базе данных) user
const refUser = firestore().collection('user');

//Обращение к Firebase создает новую запись пользователя в базе
export const createNewUserUser = async (email, uid) => {
  refUser
    .add({
      avatar: '',
      email,
      uid
    })
    .then(() => console.log('user added'))
}

//Получение данных пользователя у которого совпадает передаваемый id
export const fetchUser = async (uid) => {
  return new Promise((resolve, reject) => {
    refUser
      .where('uid', '==', uid)
      .onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const {email, avatar, name, phone} = doc.data();
        list.push({email, avatar, name, phone});
      });
      resolve(list);
    }, (error) => {
      reject(error);
    });
  });
}