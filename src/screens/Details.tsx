import { HeaderBack } from "@components/HeaderBack";
import {
  HStack,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";

import PlaceholderImage from "@assets/placeholderImage.png";

import { UserPhoto } from "@components/UserPhoto";
import { Badge } from "@components/Badge";
import { Button } from "@components/Form/Button";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import { api } from "@services/api";
import { Dimensions, Linking } from "react-native";
import { Loading } from "@components/Loading";
import { PaymentIcons } from "@components/PaymentIcons";
import { Values } from "@components/Values";
import { useProduct } from "@hooks/useProduct";
import { priceFormatter } from "@utils/formatter";

type RouteParams = {
  productId: string;
};

export function Details() {
  const route = useRoute();
  const { productId } = route.params as RouteParams;
  const { product, isLoadingProduct, handleOpenWhatsApp, fetchProduct } =
    useProduct();

  useFocusEffect(
    useCallback(() => {
      fetchProduct(productId);
    }, [productId])
  );

  return (
    <VStack bg="gray.6" flex={1}>
      <HeaderBack />
      {isLoadingProduct ? (
        <Loading />
      ) : (
        <VStack flex={1}>
          <ScrollView>
            <ScrollView
              w="full"
              mt={2}
              horizontal
              showsHorizontalScrollIndicator={true}
            >
              {product.product_images ? (
                product.product_images.map((image) => (
                  <HStack alignItems="center" key={image.id}>
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
                    source={PlaceholderImage}
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
                type="forms"
                alt={product.user?.name}
                size={8}
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
                <HStack justifyContent="space-between">
                  <Heading fontFamily="heading" fontSize="xl" color="gray.1">
                    {product.name}
                  </Heading>
                  <Values
                    value={priceFormatter.format(Number(product.price))}
                    type="top"
                  />
                </HStack>
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
              <VStack mb={5}>
                <Heading
                  mb={2}
                  fontFamily="heading"
                  fontSize="md"
                  color="gray.1"
                >
                  Meios de pagamento
                </Heading>

                {product.payment_methods?.map((item) => (
                  <PaymentIcons name={item.name} />
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
            <Values
              value={priceFormatter.format(Number(product.price))}
              type="bottom"
            />
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
