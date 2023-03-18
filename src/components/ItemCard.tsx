import {
  Heading,
  Image,
  Text,
  VStack,
  IPressableProps,
  Box,
} from "native-base";
import { UserPhoto } from "./UserPhoto";
import { Badge } from "./Badge";

import BicicleImage from "@assets/Bicycle.png";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Pressable } from "react-native";

type ItemCardProps = IPressableProps;

export function ItemCard({ ...rest }: ItemCardProps) {
  return (
    <Pressable {...rest}>
      <VStack bg="gray.6" my={2} mx={1} rounded="xl">
        <Box p={1} h={24} w={33} borderRadius="xl" rounded="xl">
          <Box flex={1} position="absolute" w="full" h="full" rounded="lg">
            <Image
              source={BicicleImage}
              alt="Imagem do produto"
              flex={1}
              w="full"
              resizeMode="cover"
            />
          </Box>

          <UserPhoto
            source={{ uri: "https://github.com/murilojssilva.png" }}
            alt="Imagem do usuário"
            size={10}
          />
          <Badge position="absolute" top={2} right={2} text="novo" />
        </Box>
        <VStack p={2}>
          <Text color="gray.2">Tênis</Text>
          <Heading color="gray.1">R$ 59,90</Heading>
        </VStack>
      </VStack>
    </Pressable>
  );
}
