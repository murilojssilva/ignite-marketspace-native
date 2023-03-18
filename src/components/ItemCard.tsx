import {
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  Card,
  Pressable,
  IPressableProps,
} from "native-base";
import { UserPhoto } from "./UserPhoto";
import { Badge } from "./Badge";

import BicicleImage from "@assets/Bicycle.png";

type ItemCardProps = IPressableProps;

export function ItemCard({ ...rest }: ItemCardProps) {
  return (
    <Pressable flex={1} bg="gray.7" p={4} mx={1} borderRadius="xl" {...rest}>
      <Card>
        <Image
          source={BicicleImage}
          w="full"
          alt="Pessoas treinando"
          resizeMode="cover"
        />
        <HStack h={20}>
          <UserPhoto
            source={{ uri: "https://github.com/murilojssilva.png" }}
            alt="Imagem do usuário"
            size={10}
            mr={4}
          />
          <Badge text="usado" />
        </HStack>
        <VStack>
          <Text fontFamily="regular" color="gray.2">
            Tênis vermelho
          </Text>
          <Heading color="gray.1" fontFamily="bold">
            R$ 59,90
          </Heading>
        </VStack>
      </Card>
    </Pressable>
  );
}
