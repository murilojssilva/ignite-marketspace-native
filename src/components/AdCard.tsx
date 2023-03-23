import { HStack, Heading, Icon, Text, VStack } from "native-base";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { ProductDTO } from "@dtos/ProductDTO";
import { useCallback, useState } from "react";

export function AdCard() {
  const [products, setProducts] = useState<ProductDTO[]>([] as ProductDTO[]);
  async function fetchProducts() {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      throw error;
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

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
          <Heading fontFamily="bold" fontSize="md" color="gray.2">
            {products.filter((product) => product.is_active).length}
          </Heading>
          <Text fontFamily="regular" fontSize="xs" color="gray.2">
            anúncios ativos
          </Text>
        </VStack>
      </HStack>
      <TouchableOpacity onPress={handleMyAds}>
        <HStack alignItems="center">
          <Heading fontFamily="bold" fontSize="xs" color="blue.normal">
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
