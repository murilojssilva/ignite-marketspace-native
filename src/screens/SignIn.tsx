import {
  VStack,
  Text,
  Center,
  Heading,
  ScrollView,
  useToast,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";

import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Form/Input";
import { Button } from "@components/Form/Button";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";

type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema = Yup.object({
  email: Yup.string().required("Informe o e-mail.").email("E-mail inválido"),
  password: Yup.string()
    .required("Informe a senha.")
    .min(6, "A senha precisa ter pelo menos 6 dígitos"),
});

export function SignIn() {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(signInSchema) });
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navigate("signUp");
  }

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível acessar sua conta. Tente novamente mais tarde.";

      setIsLoading(false);

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg="gray.6" px={10} pb={16} rounded="lg">
        <Center my={24}>
          <LogoSvg />
          <Heading fontSize="xl" color="gray.1" fontFamily="bold">
            marketspace
          </Heading>
          <Text color="gray.3" fontSize="sm">
            Seu espaço de compra e venda
          </Text>
        </Center>
        <Center>
          <Heading color="gray.2" fontSize="sm" mb={6} fontFamily="regular">
            Acesse sua conta
          </Heading>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                mb={2}
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
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                mb={2}
                onChangeText={onChange}
                value={value}
                placeholder="Senha"
                secureTextEntry
                errorMessage={errors.password?.message}
                onSubmitEditing={handleSubmit(handleSignIn)}
              />
            )}
          />
          <Button
            title="Acessar"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
        </Center>
      </VStack>
      <VStack flex={1} bg="gray.7" px={10} pb={16}>
        <Center mt={24}>
          <Text color="gray.1" fontSize="sm" mb={3} fontFamily="regular">
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar uma conta"
            variant="subtle"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
