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
import { useAuth } from "@hooks/useAuth";

type RouteParams = {
  productId: string;
};

export function MyAdDetails() {
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const route = useRoute();

  const { productId } = route.params as RouteParams;

  const { user } = useAuth();

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleEditAd() {
    navigate("editAd");
  }

  async function fetchProduct() {
    try {
      setIsLoading(true);
      const response = await api.get(`/products/${productId}`);
      setProduct(response.data);
      console.log(product);
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

  useFocusEffect(
    useCallback(() => {
      fetchProduct();
    }, [productId])
  );
  return (
    <VStack flex={1}>
      <HeaderBack icon="edit" onPress={handleEditAd} />
      <ScrollView>
        {isLoading ? (
          <Loading />
        ) : (
          <VStack flex={1}>
            <ScrollView>
              <ScrollView horizontal></ScrollView>
              <HStack p={6} h={20} alignItems="center">
                <UserPhoto
                  source={{
                    uri: `${api.defaults.baseURL}/images/${user.avatar}`,
                  }}
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
                  <Heading
                    mr={2}
                    fontFamily="bold"
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
                    fontFamily="bold"
                    fontSize="md"
                    color="gray.1"
                  >
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
          </VStack>
        )}
      </ScrollView>
      <VStack p={6} justifyContent="space-around" alignItems="center">
        <Button mb={2} icon="power" title="Desativar anúncio" variant="solid" />
        <Button icon="trash" title="Excluir anúncio" variant="subtle" />
      </VStack>
    </VStack>
  );
}
