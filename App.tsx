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
import { AuthContextProvider } from "@contexts/AuthContext";
import { ProductsContextProvider } from "@contexts/ProductContext";

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

      <AuthContextProvider>
        <ProductsContextProvider>
          {fontsLoaded ? <Routes /> : <Loading />}
        </ProductsContextProvider>
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
