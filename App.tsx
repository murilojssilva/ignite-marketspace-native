import { StatusBar } from "react-native";

import {
  useFonts,
  Karla_300Light,
  Karla_400Regular,
  Karla_600SemiBold,
  Karla_700Bold,
} from "@expo-google-fonts/karla";

import { Routes } from "./src/routes";
import { Loading } from "@components/Loading";
import { NativeBaseProvider } from "native-base";
import { THEME } from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_300Light,
    Karla_400Regular,
    Karla_600SemiBold,
    Karla_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}
