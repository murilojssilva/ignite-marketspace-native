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

import PlaceholderImage from "@assets/placeholderImage.png";

import { Pressable } from "react-native";
import { ProductDTO } from "@dtos/ProductDTO";
import { api } from "@services/api";

import avatarImg from "@assets/userPhotoDefault.png";
import { useAuth } from "@hooks/useAuth";

type ItemCardProps = IPressableProps & {
  product: ProductDTO;
  isActive?: boolean;
};

export function ItemCard({ product, isActive, ...rest }: ItemCardProps) {
  const { user } = useAuth();
  return (
    <Pressable {...rest}>
      <VStack bg="gray.6" my={2} mx={1} rounded="xl">
        <Box p={1} h={24} w={33} borderRadius="xl" rounded="xl">
          <Box flex={1} position="absolute" w="full" h="full" rounded="lg">
            <Image
              source={
                product.product_images[0]
                  ? {
                      uri: `${api.defaults.baseURL}/images/${product.product_images[0].path}`,
                    }
                  : PlaceholderImage
              }
              alt="Imagem do produto"
              flex={1}
              w="full"
              resizeMode="cover"
              rounded="xl"
            />
          </Box>

          <UserPhoto
            source={
              product.user?.avatar
                ? {
                    uri: `${api.defaults.baseURL}/images/${product.user.avatar}`,
                  }
                : user?.avatar
                ? {
                    uri: `${api.defaults.baseURL}/images/${user.avatar}`,
                  }
                : avatarImg
            }
            type="forms"
            alt="Imagem do usuário"
            size={10}
          />
          <Badge
            colorText={product.is_new ? "white" : "gray.1"}
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
            fontFamily="heading"
            color="gray.1"
          >{`R$${product.price},00`}</Heading>
        </VStack>
      </VStack>
    </Pressable>
  );
}
