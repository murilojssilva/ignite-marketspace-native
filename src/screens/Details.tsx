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
import { Linking } from "react-native";
import { Loading } from "@components/Loading";

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
      console.log(product.payment_methods);
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
      Linking.openURL(`https://wa.me/${product.user.tel}`);
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
            <Image
              source={
                !product.product_images[0].path
                  ? {
                      uri: `${api.defaults.baseURL}/images/${product.user.avatar}`,
                    }
                  : BicicleImage
              }
              w="full"
              alt={product.name}
              resizeMode="cover"
            />
            <HStack p={6} h={20} alignItems="center">
              <UserPhoto
                source={
                  !product.user.avatar
                    ? {
                        uri: `${api.defaults.baseURL}/images/${product.user.avatar}`,
                      }
                    : defaultUserPhotoImg
                }
                alt="Imagem do usuário"
                size={16}
                mr={4}
              />
              <Text fontSize="sm" fontFamily="regular" color="gray.1">
                {product.user.name}
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
                <Heading fontFamily="bold" fontSize="xl" color="gray.1">
                  {product.name}
                </Heading>
                <Text fontFamily="regular" fontSize="md" color="gray.1">
                  {product.description}
                </Text>
              </VStack>

              <HStack mb={2} alignItems="center">
                <Heading mr={2} fontFamily="bold" fontSize="md" color="gray.1">
                  Aceita troca?
                </Heading>
                <Text fontFamily="regular" fontSize="md" color="gray.1">
                  {product.accept_trade ? "Sim" : "Não"}
                </Text>
              </HStack>
              <VStack>
                <Heading mb={2} fontFamily="bold" fontSize="md" color="gray.1">
                  Meios de pagamento
                </Heading>

                {product.payment_methods.find(
                  (payment_method) => payment_method.key === "boleto"
                ) && (
                  <HStack alignItems="center">
                    <Icon mr={2} as={FontAwesome} name="money" />
                    <Text fontFamily="regular" fontSize="md" color="gray.1">
                      Boleto
                    </Text>
                  </HStack>
                )}
                {product.payment_methods.find(
                  (payment_method) => payment_method.key === "pix"
                ) && (
                  <HStack alignItems="center">
                    <Icon mr={2} as={FontAwesome} name="qrcode" />
                    <Text fontFamily="regular" fontSize="md" color="gray.1">
                      Pix
                    </Text>
                  </HStack>
                )}

                {product.payment_methods.find(
                  (payment_method) => payment_method.key === "cash"
                ) && (
                  <HStack alignItems="center">
                    <Icon mr={2} as={FontAwesome} name="money" />
                    <Text fontFamily="regular" fontSize="md" color="gray.1">
                      Dinheiro
                    </Text>
                  </HStack>
                )}

                {product.payment_methods.find(
                  (payment_method) => payment_method.key === "card"
                ) && (
                  <HStack alignItems="center">
                    <Icon mr={2} as={FontAwesome} name="credit-card" />
                    <Text fontFamily="regular" fontSize="md" color="gray.1">
                      Cartão de Crédito
                    </Text>
                  </HStack>
                )}

                {product.payment_methods.find(
                  (payment_method) => payment_method.key === "deposit"
                ) && (
                  <HStack alignItems="center">
                    <Icon mr={2} as={FontAwesome} name="bank" />
                    <Text fontFamily="regular" fontSize="md" color="gray.1">
                      Depósito Bancário
                    </Text>
                  </HStack>
                )}
              </VStack>
            </VStack>
          </ScrollView>
          <HStack
            py={4}
            bg="white"
            justifyContent="space-around"
            alignItems="center"
          >
            <Heading color="blue.normal" fontFamily="bold" fontSize="xl">
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
