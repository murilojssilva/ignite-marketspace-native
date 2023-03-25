import { useState } from "react";

import {
  Heading,
  VStack,
  Text,
  Icon,
  HStack,
  ScrollView,
  Image,
  useToast,
} from "native-base";

import { FontAwesome } from "@expo/vector-icons";
import { UserPhoto } from "@components/UserPhoto";
import { Badge } from "@components/Badge";
import { Button } from "@components/Form/Button";

import avatarImg from "@assets/userPhotoDefault.png";

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { PreviewAdDTO } from "@dtos/PreviewAdDTO";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { PaymentIcons } from "@components/PaymentIcons";

export function PreviewAd() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  const route = useRoute();

  const {
    price,
    name,
    description,
    is_new,
    accept_trade,
    imagesUri,
    payment_methods,
  } = route.params as PreviewAdDTO;

  const { user } = useAuth();
  const toast = useToast();

  async function handleCreateAd() {
    try {
      setIsLoading(true);

      const response = await api.post("/products", {
        name,
        description,
        price,
        is_new,
        accept_trade,
        payment_methods,
        imagesUri,
      });

      const { id } = response.data;

      await uploadImages(id, imagesUri);
      toast.show({
        title: "Produto cadastrado com sucesso.",
        placement: "top",
        bgColor: "green.500",
      });

      navigation.navigate("home");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível cadastrar o produto. Tente novamente mais tarde.";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function uploadImages(productId: string, images: string[]) {
    try {
      const imageData = new FormData();
      imageData.append("product_id", productId);

      images.forEach((item) => {
        const imageExtension = item.split(".").pop();

        const imageFile = {
          name: `${user.name}.${imageExtension}`,
          uri: item,
          type: `image/${imageExtension}`,
        } as any;

        imageData.append("images", imageFile);
      });

      await api.post("/products/images/", imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar a imagem. Tente novamente.";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  return (
    <VStack flex={1}>
      <VStack alignItems="center" bg="blue.light" pt={12} p={8}>
        <Heading fontFamily="heading" fontSize="xl" color="gray.7">
          Pré visualização do anúncio
        </Heading>
        <Text fontFamily="regular" fontSize="md" color="gray.7">
          É assim que seu produto vai aparecer!
        </Text>
      </VStack>
      <ScrollView>
        {imagesUri.map((image) => {
          <ScrollView horizontal>
            <Image
              source={{ uri: image }}
              w="full"
              alt="Bicicleta"
              resizeMode="cover"
            />
          </ScrollView>;
        })}

        <HStack p={6} h={20} alignItems="center">
          <UserPhoto
            source={
              user.avatar
                ? { uri: `${api.defaults.baseURL}/images/${user.avatar}` }
                : avatarImg
            }
            alt="Imagem do usuário"
            size={10}
            mr={4}
          />
          <Text fontSize="sm" fontFamily="regular" color="gray.1">
            {user.name}
          </Text>
        </HStack>
        <VStack px={6}>
          <Badge
            colorText="white"
            variant="outFilter"
            mb={2}
            w={20}
            state={is_new ? "NOVO" : "USADO"}
          />
          <VStack mb={2}>
            <Heading fontFamily="heading" fontSize="xl" color="gray.1">
              {name}
            </Heading>
            <Text fontFamily="regular" fontSize="md" color="gray.1">
              {description}
            </Text>
          </VStack>

          <HStack mb={2} alignItems="center">
            <Heading mr={2} fontFamily="heading" fontSize="md" color="gray.1">
              Aceita troca?
            </Heading>
            <Text fontFamily="regular" fontSize="md" color="gray.1">
              {accept_trade ? "Sim" : "Não"}
            </Text>
          </HStack>
          <VStack>
            <Heading mb={2} fontFamily="heading" fontSize="md" color="gray.1">
              Meios de pagamento
            </Heading>
            {payment_methods?.map((item) => (
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
        <Button
          w={160}
          mr={2}
          title="Voltar e editar"
          variant="subtle"
          icon="arrow-left"
          onPress={handleGoBack}
        />
        <Button
          w={160}
          title="Avançar"
          variant="solid"
          isLoading={isLoading}
          icon="tag"
          onPress={handleCreateAd}
        />
      </HStack>
    </VStack>
  );
}
