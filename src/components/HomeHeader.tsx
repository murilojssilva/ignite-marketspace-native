import { Heading, Text, HStack, VStack, Icon } from "native-base";

import { UserPhoto } from "./UserPhoto";
import { Button } from "./Form/Button";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function HomeHeader() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  function handleCreateAd() {
    navigate("createAd");
  }
  return (
    <HStack pt={8} pb={5} alignItems="center">
      <UserPhoto
        source={{ uri: "https://github.com/murilojssilva.png" }}
        alt="Imagem do usuário"
        size={16}
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.1" fontFamily="regular" fontSize="md">
          Boas vindas,
        </Text>
        <Heading color="gray.1" fontFamily="bold" fontSize="lg">
          Murilo!
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
