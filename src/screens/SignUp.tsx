import { useForm, Controller } from "react-hook-form";
import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  Icon,
} from "native-base";

import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Form/Input";
import { Button } from "@components/Form/Button";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Feather } from "@expo/vector-icons";

type FormDataProps = {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = Yup.object({
  name: Yup.string().required("Informe o nome."),
  email: Yup.string().required("Informe o e-mail.").email("E-mail inválido"),
  phone: Yup.string().required("Informe o telefone"),
  password: Yup.string()
    .required("Informe a senha.")
    .min(6, "A senha precisa ter pelo menos 6 dígitos"),
  password_confirm: Yup.string()
    .required("Confirme a senha.")
    .oneOf([Yup.ref("password")], "A confirmação da senha não confere."),
});

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(signUpSchema) });
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignUp(data: FormDataProps) {
    console.log(data);
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Center mt={24}>
          <LogoSvg />
          <Heading fontSize="xl" color="gray.1" fontFamily="bold">
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

        <Center my={10}>
          <Center
            rounded="full"
            borderWidth={3}
            borderColor="blue.light"
            bg="gray.5"
            w={24}
            h={24}
          >
            <Icon as={Feather} name="user" color="gray.4" size={44} />
          </Center>
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
        </Center>
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
            name="phone"
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                placeholder="Telefone"
                keyboardType="numeric"
                autoCapitalize="none"
                errorMessage={errors.phone?.message}
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
                placeholder="Confirmar a senha"
                secureTextEntry
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            title="Criar"
            variant="outline"
            onPress={handleSubmit(handleSignUp)}
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
