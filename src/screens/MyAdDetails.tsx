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

import BicicleImage from "@assets/Bicycle.png";

import { UserPhoto } from "@components/UserPhoto";
import { Badge } from "@components/Badge";
import { Button } from "@components/Form/Button";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useCallback, useState } from "react";
import { ProductDTO } from "@dtos/ProductDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Loading } from "@components/Loading";
import { Dimensions } from "react-native";
import { Alert } from "react-native";
import { PaymentIcons } from "@components/PaymentIcons";

type RouteParams = {
  productId: string;
};

export function MyAdDetails() {
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);
  const [changeStatusLoading, setChangeStatusLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();
  const route = useRoute();
  const navigation = useNavigation();

  const { productId } = route.params as RouteParams;

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleEditAd() {
    navigate("editAd", { productId });
  }

  async function fetchProduct() {
    try {
      setIsLoading(true);
      const response = await api.get(`/products/${productId}`);
      setProduct(response.data);
      console.log(
        product.product_images.map(
          (image) => `${api.defaults.baseURL}/images/${image.path}`
        )
      );
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar o produto";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleChangeStatus() {
    try {
      setChangeStatusLoading(true);

      await api.patch(`/products/${productId}`, {
        is_active: !product.is_active,
      });

      setProduct((state) => {
        return {
          ...state,
          is_active: !state.is_active,
        };
      });

      toast.show({
        title: "Status do anúncio atualizado!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível atualizar o status.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setChangeStatusLoading(false);
    }
  }

  async function removeAd() {
    try {
      setIsLoading(true);
      await api.delete(`/products/${productId}`);

      toast.show({
        title: "Anúncio removido!",
        placement: "top",
        bgColor: "green.500",
      });

      navigation.goBack();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível remover o anúncio.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemoveAd() {
    Alert.alert("Remover", "Deseja remover o anúncio?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => removeAd() },
    ]);
  }

  useFocusEffect(
    useCallback(() => {
      fetchProduct();
    }, [productId])
  );
  return (
    <VStack flex={1}>
      <HeaderBack icon="edit" onPress={handleEditAd} />
      {isLoading ? (
        <Loading />
      ) : (
        <VStack>
          <ScrollView>
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
                          style={
                            product.is_active === false && { opacity: 0.5 }
                          }
                        />
                      </HStack>
                    ))
                  ) : (
                    <HStack alignItems="center">
                      <Image
                        width={Dimensions.get("screen").width}
                        height={300}
                        source={BicicleImage}
                        alt="imagem do produto"
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
                    alt={product.user?.avatar}
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
                      <VStack>
                        <PaymentIcons key={item.key} name={item.name} />
                      </VStack>
                    ))}
                  </VStack>
                </VStack>
              </ScrollView>
            </VStack>
          </ScrollView>
          <VStack p={6} justifyContent="space-around" alignItems="center">
            <Button
              mb={2}
              icon="power"
              title={
                product.is_active ? "Desativar anúncio" : "Reativar anúncio"
              }
              variant={product.is_active ? "solid" : "outline"}
              onPress={handleChangeStatus}
              isLoading={changeStatusLoading}
            />
            <Button
              icon="trash"
              title="Excluir anúncio"
              variant="subtle"
              isLoading={isLoading}
              onPress={handleRemoveAd}
            />
          </VStack>
        </VStack>
      )}
    </VStack>
  );
}
