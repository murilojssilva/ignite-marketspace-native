import { HeaderBack } from "@components/HeaderBack";
import {
  Heading,
  VStack,
  Text,
  Box,
  Icon,
  HStack,
  Radio,
  ScrollView,
  useToast,
  Checkbox as NativeBaseCheckbox,
  FlatList,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { Input } from "@components/Form/Input";
import { useState } from "react";
import { Switch } from "@components/Switch";
import { Checkbox } from "@components/Checkbox";
import { Button } from "@components/Form/Button";
import { Textarea } from "@components/Form/Textarea";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import * as ImagePicker from "expo-image-picker";

import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PAYMENT_METHODS } from "@constants/paymentMethods";
import { Pressable } from "react-native";
import { ImageFormPreview } from "@components/ImageFormPreview";
import { PaymentMethodDTO } from "@dtos/PaymentMethodDTO";
import { AppError } from "@utils/AppError";

type FormDataProps = {
  name: string;
  description: string;
  price: number;
};

const createAdSchema = Yup.object({
  name: Yup.string().required("Informe o nome."),
  description: Yup.string().required("Informe a descrição."),
  price: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("O valor não pode ser negativo")
    .required("O valor é obrigatório"),
});

export function CreateAd() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(createAdSchema) });

  const [is_new, setIsNew] = useState(false);
  const [accept_trade, setAcceptTrade] = useState(false);
  const [payment_methods, setPayMethods] = useState<PaymentMethodDTO[]>(
    [] as PaymentMethodDTO[]
  );
  const [imagesUri, setImagesUri] = useState<string[]>([]);
  const toast = useToast();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  async function handleSelectImage() {
    try {
      const imageSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (imageSelected.canceled) {
        return;
      }

      if (imageSelected.assets[0].uri) {
        setImagesUri([...imagesUri, imageSelected.assets[0].uri]);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível selecionar a foto. Tente novamente.";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  function removeImage(uri: string) {
    const imagesFiltered = imagesUri.filter((imageUri) => imageUri !== uri);
    setImagesUri(imagesFiltered);
  }

  function handleShowPreview({ name, description, price }: FormDataProps) {
    try {
      console.log(imagesUri);
      navigation.navigate("previewAd", {
        name,
        description,
        price: Number(price),
        imagesUri,
        is_new,
        accept_trade,
        payment_methods,
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível mostrar os detalhes do produto cadastrado. Tente novamente.";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }
  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <VStack flex={1}>
      <HeaderBack title="Criar anúncio" />
      <ScrollView px={8}>
        <VStack>
          <Heading fontFamily="heading" fontSize="sm" color="gray.2">
            Imagens
          </Heading>
          <Text mt={2} fontFamily="regular" fontSize="sm" color="gray.3">
            Escolha até 3 imagens para mostrar o quando o seu produto é
            incrível!
          </Text>

          <ScrollView
            w="full"
            flex={1}
            mt={2}
            h={150}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <HStack mt={2} alignItems="center">
              {imagesUri.length > 0 &&
                imagesUri.map((imageUri) => (
                  <Box key={imageUri}>
                    <ImageFormPreview uri={imageUri} />

                    <Pressable onPress={() => removeImage(imageUri)}>
                      <Icon as={Feather} name="x" size={2} color="white" />
                    </Pressable>
                  </Box>
                ))}
              <Pressable onPress={handleSelectImage}>
                <Box
                  mt={2}
                  bg="gray.5"
                  h={100}
                  w={100}
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="sm"
                >
                  <Icon as={Feather} name="plus" />
                </Box>
              </Pressable>
            </HStack>
          </ScrollView>
        </VStack>
        <VStack my={4}>
          <Heading my={4} fontFamily="bold" fontSize="sm" color="gray.2">
            Sobre o produto
          </Heading>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                mb={2}
                onChangeText={onChange}
                value={value}
                placeholder="Nome"
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <Textarea
                mb={2}
                onChangeText={onChange}
                value={value}
                placeholder="Descrição do produto"
                errorMessage={errors.description?.message}
                numberOfLines={5}
              />
            )}
          />
        </VStack>
        <Radio.Group
          name="radio"
          accessibilityLabel="tipo de produto"
          value={is_new ? "new" : "used"}
          onChange={(nextValue) => {
            setIsNew(
              nextValue === "new" ? true : nextValue === "old" ? false : false
            );
          }}
        >
          <HStack alignItems="center" justifyContent="space-between">
            <Radio value="new" my={1}>
              <Text fontSize="md" color="gray.2">
                Produto novo
              </Text>
            </Radio>
            <Radio value="old" ml={2} my={1}>
              <Text fontSize="md" color="gray.2">
                Produto usado
              </Text>
            </Radio>
          </HStack>
        </Radio.Group>
        <VStack my={4}>
          <Heading my={4} fontFamily="bold" fontSize="sm" color="gray.2">
            Venda
          </Heading>
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <Input
                mb={2}
                onChangeText={onChange}
                keyboardType="numeric"
                value={String(value)}
                placeholder="Valor do produto"
                errorMessage={errors.price?.message}
              />
            )}
          />
        </VStack>
        <VStack my={4}>
          <Heading my={4} fontFamily="bold" fontSize="sm" color="gray.2">
            Aceita troca?
          </Heading>
          <Switch
            size="md"
            onToggle={(value) => setAcceptTrade(value)}
            value={accept_trade}
          />
        </VStack>
        <VStack my={4}>
          <Heading my={4} fontFamily="bold" fontSize="sm" color="gray.2">
            Meios de pagamento aceitos
          </Heading>
          <NativeBaseCheckbox.Group
            onChange={setPayMethods}
            value={payment_methods as any[]}
          >
            <FlatList
              data={PAYMENT_METHODS}
              py={2}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <Checkbox item={item} value={item.key} text={item.name} />
              )}
            />
          </NativeBaseCheckbox.Group>
        </VStack>
      </ScrollView>
      <HStack
        py={4}
        bg="white"
        justifyContent="space-around"
        alignItems="center"
      >
        <Button
          onPress={handleGoBack}
          w={160}
          mr={2}
          title="Cancelar"
          variant="subtle"
        />
        <Button
          w={160}
          title="Avançar"
          variant="outline"
          onPress={handleSubmit(handleShowPreview)}
        />
      </HStack>
    </VStack>
  );
}
