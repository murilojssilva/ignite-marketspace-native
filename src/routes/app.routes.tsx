import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { Home } from "@screens/Home";
import { CreateAd } from "@screens/CreateAd";
import { Details } from "@screens/Details";
import { EditAd } from "@screens/EditAd";
import { MyAdDetails } from "@screens/MyAdDetails";
import { MyAds } from "@screens/MyAds";
import { PreviewAd } from "@screens/PreviewAd";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Icon, useTheme } from "native-base";
import { Alert, Platform } from "react-native";
import { useAuth } from "@hooks/useAuth";
import { useEffect } from "react";
import { Loading } from "@components/Loading";
import { PreviewAdDTO } from "@dtos/PreviewAdDTO";

type AppRoutesProps = {
  home: undefined;
  myAds: undefined;
  editAd: undefined;
  previewAd: PreviewAdDTO;
  myAdDetails: { productId: string };
  createAd: undefined;
  details: { productId: string };
  logout: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesProps>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();
  const { signOut } = useAuth();

  async function handleSignOut() {
    return await Alert.alert(
      "Sair da aplicação",
      "Deseja fazer o logout do aplicativo?",
      [
        { text: "Sim", onPress: () => signOut() },
        { text: "Não", style: "cancel" },
      ]
    );
  }

  const iconSize = sizes[6];
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[100],
        tabBarInactiveTintColor: colors.gray[600],
        tabBarStyle: {
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : "96",
          paddingBottom: sizes[10],
          paddingTop: sizes[6],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              as={MaterialCommunityIcons}
              name="home"
              fill={color}
              width={iconSize}
              height={iconSize}
            />
          ),
        }}
      />
      <Screen
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              as={MaterialCommunityIcons}
              name="tag-outline"
              fill={color}
              width={iconSize}
              height={iconSize}
            />
          ),
        }}
      />
      <Screen
        name="logout"
        component={() => {
          handleSignOut();
          return <Home />;
        }}
        options={{
          tabBarIcon: () => (
            <Icon
              as={MaterialCommunityIcons}
              name="logout"
              width={iconSize}
              height={iconSize}
            />
          ),
          tabBarInactiveTintColor: colors.red[500],
          tabBarActiveTintColor: colors.red[500],
        }}
      />
      <Screen
        name="createAd"
        component={CreateAd}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="details"
        component={Details}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="editAd"
        component={EditAd}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="myAdDetails"
        component={MyAdDetails}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="previewAd"
        component={PreviewAd}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}
