import {
  Heading,
  Pressable,
  VStack,
  Text,
  Box,
  Icon,
  HStack,
  Radio,
  ScrollView,
  Checkbox as NativeBaseCheckbox,
  useToast,
} from "native-base";

import { Feather } from "@expo/vector-icons";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { HeaderBack } from "@components/HeaderBack";
import { Input } from "@components/Form/Input";
import { Key, useCallback, useState } from "react";
import { Switch } from "@components/Switch";
import { Button } from "@components/Form/Button";
import { ImageFormPreview } from "@components/ImageFormPreview";
import { Textarea } from "@components/Form/Textarea";
import { Loading } from "@components/Loading";

import { PAYMENT_METHODS } from "@constants/paymentMethods";

import { ProductDTO } from "@dtos/ProductDTO";

import { api } from "@services/api";

import { AppError } from "@utils/AppError";

import * as ImagePicker from "expo-image-picker";
import * as Yup from "yup";
import { ProductImageDTO } from "@dtos/ProductImagesDTO";
import { Checkbox } from "@components/Checkbox";

type RouteParams = ProductDTO;

type FormDataProps = {
  name: string;
  description: string;
  price: number;
};

const BOX_SIZE = 100;

const editAdSchema = Yup.object({
  name: Yup.string().required("Informe o nome."),
  description: Yup.string().required("Informe a descrição."),
  price: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("O valor não pode ser negativo")
    .required("O valor é obrigatório"),
});

export function EditAd() {
  const route = useRoute();
  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const {
    id,
    is_new,
    accept_trade,
    payment_methods,
    product_images,
    name,
    description,
    price,
  } = route.params as RouteParams;

  let methods: any[] = [];
  payment_methods.map(({ key }) => methods.push(key));

  const [productData, setProductData] = useState<ProductDTO>({} as ProductDTO);

  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isNew, setIsNew] = useState<boolean>(is_new);
  const [acceptTrade, setAcceptTrade] = useState<boolean>(accept_trade);

  const [imagesUri, setImagesUri] = useState<(string | ProductImageDTO)[]>(
    product_images as ProductImageDTO[]
  );
  const [paymentMethods, setPaymentMethods] = useState<string[]>(
    methods as string[]
  );

  async function fetchProduct() {
    try {
      setIsLoadingProduct(true);
      const response = await api.get(`/products/${id}`);
      setProductData(response.data);
      setPaymentMethods(paymentMethods.filter((method) => method));
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
      setIsLoadingProduct(false);
    }
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(editAdSchema),
    defaultValues: {
      name,
      description: description,
      price: price,
    },
  });

  function handleGoBack() {
    navigation.goBack();
  }

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

  async function handleEditAd({ name, description, price }: FormDataProps) {
    try {
      setIsLoading(true);

      await api.put(`/products/${id}`, {
        name,
        description,
        price,
        is_new: isNew,
        accept_trade: acceptTrade,
        payment_methods: paymentMethods,
        imagesUri,
      });

      await uploadImages(productData.id, imagesUri as string[]);
      toast.show({
        title: "Produto editado com sucesso.",
        placement: "top",
        bgColor: "green.500",
      });

      navigation.navigate("home");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possivel atualizar o anúncio.";

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
          name: `${productData.user.name}.${imageExtension}`,
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

  useFocusEffect(
    useCallback(() => {
      fetchProduct();
      fetchProduct();
    }, [id])
  );

  return (
    <VStack flex={1}>
      <HeaderBack title="Editar anúncio" />

      {isLoadingProduct ? (
        <Loading />
      ) : (
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
              <HStack alignItems="center" justifyContent="center">
                {imagesUri &&
                  imagesUri.map((imageUri: ProductImageDTO) => (
                    <Box
                      key={imageUri.id}
                      alignItems="flex-end"
                      justifyContent="flex-start"
                    >
                      <ImageFormPreview
                        uri={`${api.defaults.baseURL}/images/${imageUri.path}`}
                      />

                      <Pressable
                        rounded="full"
                        w={4}
                        onPress={() => removeImage(imageUri)}
                      >
                        <Icon
                          mt={-90}
                          ml={-14}
                          bg="gray.1"
                          as={Feather}
                          name="x"
                          size={4}
                          color="gray.7"
                        />
                      </Pressable>
                    </Box>
                  ))}
                <Pressable onPress={handleSelectImage}>
                  <Box
                    mt={4}
                    bg="gray.5"
                    h={100}
                    w={100}
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="sm"
                  >
                    <Icon as={Feather} size={6} name="plus" />
                  </Box>
                </Pressable>
              </HStack>
            </ScrollView>
          </VStack>
          <VStack my={4}>
            <Heading my={4} fontFamily="heading" fontSize="sm" color="gray.2">
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
            value={isNew ? "new" : "used"}
            onChange={(isNew) => {
              setIsNew(isNew === "new" ? true : false);
            }}
          >
            <HStack alignItems="center" justifyContent="space-between">
              <Radio value="new" my={1}>
                <Text fontSize="md" color="gray.2">
                  Produto novo
                </Text>
              </Radio>
              <Radio value="used" ml={2} my={1}>
                <Text fontSize="md" color="gray.2">
                  Produto usado
                </Text>
              </Radio>
            </HStack>
          </Radio.Group>
          <VStack my={4}>
            <Heading my={4} fontFamily="heading" fontSize="sm" color="gray.2">
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
            <Heading my={4} fontFamily="heading" fontSize="sm" color="gray.2">
              Aceita troca?
            </Heading>
            <Switch
              size="md"
              onToggle={(value) => setAcceptTrade(value)}
              value={accept_trade}
            />
          </VStack>
          <VStack my={4}>
            <Heading my={4} fontFamily="heading" fontSize="sm" color="gray.2">
              Meios de pagamento aceitos
            </Heading>

            <NativeBaseCheckbox.Group
              onChange={setPaymentMethods}
              value={paymentMethods as any[]}
            >
              {PAYMENT_METHODS.map((item) => (
                <Checkbox
                  key={item.key}
                  item={item}
                  value={item.key}
                  text={item.name}
                />
              ))}
            </NativeBaseCheckbox.Group>
          </VStack>
        </ScrollView>
      )}
      <HStack p={3} justifyContent="space-around" alignItems="center">
        <Button
          w={150}
          mb={2}
          title="Cancelar"
          variant="subtle"
          onPress={handleGoBack}
        />
        <Button
          w={150}
          mb={2}
          title="Avançar"
          variant="outline"
          isLoading={isLoading}
          onPress={handleSubmit(handleEditAd)}
        />
      </HStack>
    </VStack>
  );
}
