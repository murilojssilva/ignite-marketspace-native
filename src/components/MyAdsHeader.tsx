import { HStack, Heading, Icon, Pressable } from "native-base";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function MyAdsHeader() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  function handleCreateAd() {
    navigate("createAd");
  }
  return (
    <HStack pt={12} pb={5} justifyContent="space-around" alignItems="center">
      <Heading color="gray.1" fontFamily="heading" fontSize="xl">
        Meus anúncios
      </Heading>
      <Pressable onPress={handleCreateAd}>
        <Icon as={Feather} name="plus" color="gray.1" />
      </Pressable>
    </HStack>
  );
}
