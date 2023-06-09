import { Heading, Text, HStack, VStack, Icon } from "native-base";

import { UserPhoto } from "./UserPhoto";
import { Button } from "./Form/Button";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useAuth } from "@hooks/useAuth";

import avatarImg from "@assets/userPhotoDefault.png";
import { api } from "@services/api";

export function HomeHeader() {
  const { user } = useAuth();
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  function handleCreateAd() {
    navigate("createAd");
  }
  return (
    <HStack pt={8} pb={5} alignItems="center">
      <UserPhoto
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}/images/${user.avatar}` }
            : avatarImg
        }
        type="me"
        alt="Imagem do usuário"
        size={16}
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.1" fontFamily="regular" fontSize="md">
          Boas vindas,
        </Text>
        <Heading color="gray.1" fontFamily="heading" fontSize="lg">
          {user?.name}!
        </Heading>
      </VStack>
      <Button
        title="Criar anúncio"
        variant="outline"
        icon="plus"
        w={139}
        h={42}
        onPress={handleCreateAd}
      />
    </HStack>
  );
}
