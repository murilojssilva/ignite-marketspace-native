import { HeaderBack } from "@components/HeaderBack";
import {
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";

import BicicleImage from "@assets/Bicycle.png";
import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

import { UserPhoto } from "@components/UserPhoto";
import { Badge } from "@components/Badge";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "@components/Form/Button";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ProductDTO } from "@dtos/ProductDTO";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { Dimensions, Linking } from "react-native";
import { Loading } from "@components/Loading";
import { PaymentIcons } from "@components/PaymentIcons";

type RouteParams = {
  productId: string;
};

export function Details() {
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const route = useRoute();
  const { productId } = route.params as RouteParams;

  async function fetchProduct() {
    try {
      setIsLoading(true);
      const response = await api.get(`/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os produtos";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenWhatsApp() {
    try {
      setIsLoading(true);
      Linking.openURL(`https://wa.me/${product.user?.tel}`);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os dados.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProduct();
    }, [productId])
  );
  return (
    <VStack flex={1}>
      <HeaderBack />
      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1}>
          <ScrollView>
            <ScrollView
              w="full"
              flex={1}
              mt={2}
              horizontal
              showsHorizontalScrollIndicator={true}
            >
              {product.product_images ? (
                product.product_images.map((image) => (
                  <HStack alignItems="center">
                    <Image
                      width={Dimensions.get("screen").width}
                      height={300}
                      source={{
                        uri: `${api.defaults.baseURL}/images/${image.path}`,
                      }}
                      alt={product.user?.name}
                      resizeMode="cover"
                      style={product.is_active === false && { opacity: 0.5 }}
                    />
                  </HStack>
                ))
              ) : (
                <HStack alignItems="center">
                  <Image
                    width={Dimensions.get("screen").width}
                    height={300}
                    source={BicicleImage}
                    alt="Imagem do produto"
                    resizeMode="cover"
                    style={product.is_active === false && { opacity: 0.5 }}
                  />
                </HStack>
              )}
            </ScrollView>
            <HStack p={6} h={20} alignItems="center">
              <UserPhoto
                source={{
                  uri: `${api.defaults.baseURL}/images/${product.user?.avatar}`,
                }}
                alt={product.user?.name}
                size={16}
                mr={4}
              />
              <Text fontSize="sm" fontFamily="regular" color="gray.1">
                {product.user?.name}
              </Text>
            </HStack>

            <VStack px={6}>
              <Badge
                colorText={product.is_new ? "white" : "gray.1"}
                variant="outFilter"
                w={20}
                mb={2}
                state={product.is_new ? "NOVO" : "USADO"}
              />
              <VStack mb={2}>
                <Heading fontFamily="heading" fontSize="xl" color="gray.1">
                  {product.name}
                </Heading>
                <Text fontFamily="regular" fontSize="md" color="gray.1">
                  {product.description}
                </Text>
              </VStack>

              <HStack mb={2} alignItems="center">
                <Heading
                  mr={2}
                  fontFamily="heading"
                  fontSize="md"
                  color="gray.1"
                >
                  Aceita troca?
                </Heading>
                <Text fontFamily="regular" fontSize="md" color="gray.1">
                  {product.accept_trade ? "Sim" : "Não"}
                </Text>
              </HStack>
              <VStack>
                <Heading
                  mb={2}
                  fontFamily="heading"
                  fontSize="md"
                  color="gray.1"
                >
                  Meios de pagamento
                </Heading>

                {product.payment_methods?.map((item) => (
                  <PaymentIcons key={item.key} name={item.name} />
                ))}
              </VStack>
            </VStack>
          </ScrollView>
          <HStack
            py={4}
            bg="white"
            justifyContent="space-around"
            alignItems="center"
          >
            <Heading color="blue.normal" fontFamily="heading" fontSize="xl">
              {`R$${product.price},00`}
            </Heading>
            <Button
              icon="phone"
              title="Entrar em contato"
              w={200}
              onPress={handleOpenWhatsApp}
            />
          </HStack>
        </VStack>
      )}
    </VStack>
  );
}
