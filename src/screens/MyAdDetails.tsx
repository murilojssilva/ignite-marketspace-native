import { HeaderBack } from "@components/HeaderBack";
import {
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";

import BicicleImage from "@assets/Bicycle.png";
import { UserPhoto } from "@components/UserPhoto";
import { Badge } from "@components/Badge";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "@components/Form/Button";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function MyAdDetails() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleEditAd() {
    navigate("editAd");
  }
  return (
    <VStack flex={1}>
      <HeaderBack icon="edit" onPress={handleEditAd} />
      <ScrollView>
        <Image
          source={BicicleImage}
          w="full"
          alt="Bicicleta"
          resizeMode="cover"
        />
        <HStack p={6} h={20} alignItems="center">
          <UserPhoto
            source={{ uri: "https://github.com/murilojssilva.png" }}
            alt="Imagem do usuário"
            size={10}
            mr={4}
          />
          <Text fontSize="sm" fontFamily="regular" color="gray.1">
            Muriilo
          </Text>
        </HStack>
        <VStack px={6}>
          <Badge
            colorText="white"
            variant="outFilter"
            mb={2}
            w={20}
            state="NOVO"
          />
          <VStack mb={2}>
            <Heading fontFamily="bold" fontSize="xl" color="gray.1">
              Bicicleta
            </Heading>
            <Text fontFamily="regular" fontSize="md" color="gray.1">
              Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
              Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
              nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus
              iaculis in aliquam.
            </Text>
          </VStack>

          <HStack mb={2} alignItems="center">
            <Heading mr={2} fontFamily="bold" fontSize="md" color="gray.1">
              Aceita troca?
            </Heading>
            <Text fontFamily="regular" fontSize="md" color="gray.1">
              Sim
            </Text>
          </HStack>
          <VStack>
            <Heading mb={2} fontFamily="bold" fontSize="md" color="gray.1">
              Meios de pagamento
            </Heading>
            <HStack alignItems="center">
              <Icon mr={2} as={FontAwesome} name="money" />
              <Text fontFamily="regular" fontSize="md" color="gray.1">
                Boleto
              </Text>
            </HStack>
            <HStack alignItems="center">
              <Icon mr={2} as={FontAwesome} name="qrcode" />
              <Text fontFamily="regular" fontSize="md" color="gray.1">
                Pix
              </Text>
            </HStack>
            <HStack alignItems="center">
              <Icon mr={2} as={FontAwesome} name="money" />
              <Text fontFamily="regular" fontSize="md" color="gray.1">
                Dinheiro
              </Text>
            </HStack>
            <HStack alignItems="center">
              <Icon mr={2} as={FontAwesome} name="credit-card" />
              <Text fontFamily="regular" fontSize="md" color="gray.1">
                Cartão de Crédito
              </Text>
            </HStack>
            <HStack alignItems="center">
              <Icon mr={2} as={FontAwesome} name="bank" />
              <Text fontFamily="regular" fontSize="md" color="gray.1">
                Depósito Bancário
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </ScrollView>
      <VStack p={6} justifyContent="space-around" alignItems="center">
        <Button mb={2} icon="power" title="Desativar anúncio" variant="solid" />
        <Button icon="trash" title="Excluir anúncio" variant="subtle" />
      </VStack>
    </VStack>
  );
}
