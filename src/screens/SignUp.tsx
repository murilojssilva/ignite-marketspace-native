import { useForm, Controller } from "react-hook-form";
import {
  VStack,
  Text,
  Center,
  Heading,
  ScrollView,
  Icon,
  useToast,
  Pressable,
} from "native-base";

import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Form/Input";
import { Button } from "@components/Form/Button";
import { useNavigation } from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import * as Yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { Feather } from "@expo/vector-icons";
import { api } from "@services/api";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { UserPhoto } from "@components/UserPhoto";
import { UserPhotoDTO } from "@dtos/UserPhotoDTO";

type FormDataProps = {
  name: string;
  email: string;
  tel: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = Yup.object({
  name: Yup.string().required("Informe o nome."),
  email: Yup.string().required("Informe o e-mail.").email("E-mail inválido"),
  tel: Yup.string().required("Informe o telefone"),
  password: Yup.string()
    .required("Informe a senha.")
    .min(6, "A senha precisa ter pelo menos 6 dígitos"),
  password_confirm: Yup.string()
    .required("Confirme a senha.")
    .oneOf([Yup.ref("password")], "A confirmação da senha não confere."),
});

export function SignUp() {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState<UserPhotoDTO>({} as UserPhotoDTO);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(signUpSchema) });
  const navigation = useNavigation();
  const toast = useToast();

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleUserPhotoSelect() {
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    });

    if (photoSelected.canceled) {
      return;
    }

    if (photoSelected.assets[0].uri) {
      const photoInfo = await FileSystem.getInfoAsync(
        photoSelected.assets[0].uri,
        { size: true }
      );

      if (photoInfo.exists && photoInfo.size > 1024 * 1024 * 1) {
        return toast.show({
          title: "A imagem deve ter no máximo 3MB",
          placement: "top",
          bgColor: "red.500",
        });
      }

      const fileExtension = photoSelected.assets[0].uri.split(".").pop();

      const photoFile = {
        name: `${fileExtension}`.toLowerCase(),
        uri: photoSelected.assets[0].uri,
        type: `${photoSelected.assets[0].type}/${fileExtension}`,
      } as any;

      setUserPhoto({
        photo: { ...photoFile },
      });

      toast.show({
        title: "Foto selecionada!",
        placement: "top",
        bgColor: "green.500",
      });
    }
  }

  async function handleSignUp({ name, email, password, tel }: FormDataProps) {
    try {
      setIsLoading(true);
      const userForm = new FormData();
      const userImage: any = {
        ...userPhoto.photo,
        name: `${name}.${userPhoto.photo.name}`.toLowerCase(),
      };
      userForm.append("avatar", userImage);
      userForm.append("name", name);
      userForm.append("email", email);
      userForm.append("tel", tel);
      userForm.append("password", password);

      setIsLoading(true);

      await api.post("/users", userForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      signIn(email, password);

      console.log("usuário cadastrado");
    } catch (error) {
      setIsLoading(false);
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack bg="gray.6" flex={1} px={10} pb={16}>
        <Center mt={24}>
          <LogoSvg />
          <Heading fontSize="xl" color="gray.1" fontFamily="heading">
            Boas vindas!
          </Heading>
          <Text
            color="gray.2"
            fontSize="sm"
            fontFamily="regular"
            textAlign="center"
          >
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </Text>
        </Center>

        <Pressable onPress={handleUserPhotoSelect} alignItems="center" my={10}>
          {userPhoto ? (
            <UserPhoto
              source={userPhoto.photo}
              alt="Imagem do usuário"
              size={32}
              type="me"
            />
          ) : (
            <Icon as={Feather} name="user" color="gray.4" size={16} />
          )}

          <Center
            rounded="full"
            bg="blue.light"
            w={10}
            h={10}
            mt={-10}
            mr={-20}
          >
            <Icon as={Feather} name="edit" color="gray.7" size={4} />
          </Center>
        </Pressable>
        <Center>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                placeholder="Nome"
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="tel"
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                placeholder="Telefone"
                keyboardType="numeric"
                autoCapitalize="none"
                errorMessage={errors.tel?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                isPassword
                placeholder="Senha"
                secureTextEntry
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                isPassword
                placeholder="Confirmar a senha"
                secureTextEntry
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            mt={5}
            title="Criar"
            variant="outline"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </Center>
        <Center mt={10}>
          <Text color="gray.1" fontSize="sm" mb={3} fontFamily="regular">
            Já tem uma conta?
          </Text>

          <Button
            title="Ir para o login"
            variant="subtle"
            onPress={handleGoBack}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
