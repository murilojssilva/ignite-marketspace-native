import { HStack, Icon } from "native-base";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export function HeaderBack() {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <HStack pt={12} p={8}>
      <TouchableOpacity onPress={handleGoBack}>
        <Icon as={Feather} name="arrow-left" size={6} color="gray.1" />
      </TouchableOpacity>
    </HStack>
  );
}
