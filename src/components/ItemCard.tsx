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

import { Pressable } from "react-native";
import { ProductDTO } from "@dtos/ProductDTO";
import { api } from "@services/api";

type ItemCardProps = IPressableProps & {
  product: ProductDTO;
  isActive?: boolean;
};

export function ItemCard({ product, isActive, ...rest }: ItemCardProps) {
  return (
    <Pressable {...rest}>
      <VStack bg="gray.6" my={2} mx={1} rounded="xl">
        <Box p={1} h={24} w={33} borderRadius="xl" rounded="xl">
          <Box flex={1} position="absolute" w="full" h="full" rounded="lg">
            {product.product_images[0]?.path ? (
              <Image
                source={{
                  uri: `${api.defaults.baseURL}/images/${product.product_images[0].path}`,
                }}
                alt="Imagem do produto"
                flex={1}
                w="full"
                resizeMode="cover"
              />
            ) : (
              <Image source={BicicleImage} alt="Imagem do produto" />
            )}
            <Image
              source={BicicleImage}
              alt="Imagem do produto"
              flex={1}
              w="full"
              resizeMode="cover"
            />
          </Box>

          {product.user.avatar ? (
            <UserPhoto
              source={{
                uri: `${api.defaults.baseURL}/images/${product.user.avatar}`,
              }}
              alt="Foto do vendedor"
              size={10}
            />
          ) : (
            <UserPhoto
              source={{ uri: "https://github.com/murilojssilva.png" }}
              alt="Imagem do usuário"
              size={10}
            />
          )}
          <Badge
            colorText="white"
            variant="outFilter"
            position="absolute"
            top={2}
            right={2}
            state={product.is_new ? "NOVO" : "USADO"}
          />
        </Box>
        <VStack p={2}>
          <Text fontSize="md" color="gray.2">
            {product.name}
          </Text>
          <Heading
            fontSize="xl"
            fontFamily="bold"
            color="gray.1"
          >{`R$${product.price},00`}</Heading>
        </VStack>
      </VStack>
    </Pressable>
  );
}
