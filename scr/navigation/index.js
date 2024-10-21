import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Image, View} from "react-native";
import {COLORS} from "../constants/COLORS";
import SplashScreen from "../screens/SplashScreen/SplashScreen";
import InitialScreen from "../screens/AuthorizationStack/InitialScreen/InitialScreen";
import AuthorizationScreen from "../screens/AuthorizationStack/AuthorizationScreen/AuthorizationScreen";
import RegistrationScreen from "../screens/AuthorizationStack/RegistrationScreen/RegistrationScreen";
import {MainScreen} from "../screens/MainStack/MainScreen/MainScreen";
import {FilterScreen} from "../screens/MainStack/FilterScreen/FilterScreen";
import {AddOrder} from "../screens/AddOrder/AddOrder";

import HomeIcon from "../../assets/image/icons/tabs/home.png";
import HomeActiveIcon from "../../assets/image/icons/tabs/home-active.png";
import AddIcon from "../../assets/image/icons/tabs/add.png";
import AddActiveIcon from "../../assets/image/icons/tabs/add-icon.png";
import ProfileIcon from "../../assets/image/icons/tabs/profile.png";
import ProfileActiveIcon from "../../assets/image/icons/tabs/profile-active.png";
import {ProfileScreen} from "../screens/ProfileStack/ProfileScreen/ProfileScreen";
import {MyOrderScreen} from "../screens/ProfileStack/MyOrderScreen/MyOrderScreen";

//Создание образов для Стэков и Табов навигации
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Функция для рэндера иконок табов под фокусом и без него
const renderIcon = (inactiveIcon, activeIcon) => ({ focused, horizontal, tintColor }) =>
  <Image source={focused ? activeIcon : inactiveIcon} resizeMethod="scale" style={{ width: 25, height: 25 }} />

//Стэк навигации главного экрана. Два окна: Главный экран и экран фильтрации.
const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLORS.white
        }
      }}
    >
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
    </Stack.Navigator>
  )
}

//Стэк навигации по профилю. Два окна: Экран профиля и экран пользовательских объявлений.
const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLORS.white
        }
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="MyOrderScreen" component={MyOrderScreen} />
    </Stack.Navigator>
  )
}

//Табовая навигация. Представляет 3 стэка с экранами: Главный, добавление объявления и стэк профиля.
const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel: '',
        tabBarStyle: {
          height: "7%",
          display: 'flex',
          alignItems: 'center',
          borderTopColor: 'rgba(43, 53, 88, 0.15)',
          paddingTop: 11,
          paddingBottom: 5
        }
      }}
      initialRouteName='MainStack'
      sceneContainerStyle={{
        backgroundColor: '#FFFFFF',
        gesturesEnabled: false,
      }}
    >
      <Tab.Screen
        name='MainStack'
        component={MainStack}
        options={{
          tabBarIcon: renderIcon(HomeIcon, HomeActiveIcon),
        }}
      />
      <Tab.Screen
        name='AddOrder'
        component={AddOrder}
        options={{
          tabBarIcon: renderIcon(AddIcon, AddActiveIcon),
        }}
      />
      <Tab.Screen
        name='ProfileStack'
        component={ProfileStack}
        options={{
          tabBarIcon: renderIcon(ProfileIcon, ProfileActiveIcon),
        }}
      />
    </Tab.Navigator>
  )
}

//Стэк навигации экранов авторизации. Три окна: Инициализирующий экран(первый вход) и экран авторизации и регистрации.
const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="InitialScreen"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="InitialScreen" component={InitialScreen} />
      <Stack.Screen name="AuthorizationScreen" component={AuthorizationScreen} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
    </Stack.Navigator>
  )
}

//Объявление навигационного контейнера. Объявление сплэш скрина. Стэки авторизации и таб навигации.
export const AppNavigation = () => {
  return (
    <View style={{
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: COLORS.white
    }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'SplashScreen'}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
          />
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
          />
          <Stack.Screen
            name="TabStack"
            component={TabStack}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}
