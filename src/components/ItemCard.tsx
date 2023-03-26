import {
  Heading,
  Image,
  Text,
  VStack,
  IPressableProps,
  Box,
  HStack,
} from "native-base";
import { UserPhoto } from "./UserPhoto";
import { Badge } from "./Badge";

import PlaceholderImage from "@assets/placeholderImage.png";

import { Pressable } from "react-native";
import { ProductDTO } from "@dtos/ProductDTO";
import { api } from "@services/api";

import avatarImg from "@assets/userPhotoDefault.png";
import { useAuth } from "@hooks/useAuth";
import { Values } from "./Values";
import { priceFormatter } from "@utils/formatter";

type ItemCardProps = IPressableProps & {
  product: ProductDTO;
};

export function ItemCard({ product, ...rest }: ItemCardProps) {
  const { user } = useAuth();
  return (
    <Pressable {...rest}>
      <VStack bg="gray.6" my={2} mx={1} rounded="xl">
        <VStack alignItems="center">
          <HStack>
            <Box p={1} h={24} w={33} borderRadius="xl" rounded="xl">
              <Box position="absolute" w="full" h="full" rounded="lg">
                <Image
                  source={
                    product.product_images[0]
                      ? {
                          uri: `${api.defaults.baseURL}/images/${product.product_images[0].path}`,
                        }
                      : PlaceholderImage
                  }
                  style={product.is_active === false && { opacity: 0.5 }}
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
          </HStack>
          {!product.is_active && (
            <Heading
              position="absolute"
              mt={16}
              color="gray.7"
              fontSize="xs"
              fontFamily="heading"
            >
              ANÚNCIO DESATIVADO
            </Heading>
          )}
        </VStack>

        <VStack p={2}>
          <Text fontSize="md" color={product.is_active ? "gray.2" : "gray.4"}>
            {product.name}
          </Text>
          <Values
            isActive={product.is_active}
            value={priceFormatter.format(Number(product.price))}
            type="card"
          />
        </VStack>
      </VStack>
    </Pressable>
  );
}
