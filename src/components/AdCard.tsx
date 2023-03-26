import { HStack, Heading, Icon, Text, VStack, useToast } from "native-base";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useProduct } from "@hooks/useProduct";

export function AdCard() {
  const { myProducts } = useProduct();

  const activeAds = myProducts.filter((product) => product.is_active).length;

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  function handleMyAds() {
    navigate("myAds");
  }
  return (
    <HStack
      py={8}
      px={4}
      bg="blue.1"
      borderRadius={6}
      rounded="lg"
      my={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <HStack alignItems="center">
        <Icon
          as={MaterialCommunityIcons}
          name="tag-outline"
          color="blue.normal"
          size={8}
        />
        <VStack px={2}>
          <Heading fontFamily="heading" fontSize="md" color="gray.2">
            {activeAds}
          </Heading>
          <Text fontFamily="regular" fontSize="xs" color="gray.2">
            {activeAds === 1 ? "anúncio ativo" : "anúncios ativos"}
          </Text>
        </VStack>
      </HStack>
      <TouchableOpacity onPress={handleMyAds}>
        <HStack alignItems="center">
          <Heading fontFamily="heading" fontSize="xs" color="blue.normal">
            Meus anúncios
          </Heading>
          <Icon
            as={MaterialCommunityIcons}
            name="arrow-right"
            color="blue.normal"
            size={8}
          />
        </HStack>
      </TouchableOpacity>
    </HStack>
  );
}
