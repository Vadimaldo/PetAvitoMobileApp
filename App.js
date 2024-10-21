import {StatusBar} from 'expo-status-bar';
import {AppNavigation} from "./scr/navigation";
import {useFonts} from "expo-font";
import {NativeBaseProvider} from "native-base";

export default function App() {
  //Загрузка шрифтов
  const [fontsLoaded, fontError] = useFonts({
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  });

  return (
    <>
      <NativeBaseProvider>
        <StatusBar style="auto" />
        <AppNavigation />
      </NativeBaseProvider>
    </>
  );
}
