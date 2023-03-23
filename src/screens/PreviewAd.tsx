import {
  Heading,
  VStack,
  Text,
  Box,
  Icon,
  HStack,
  ScrollView,
  Image,
} from "native-base";

import { FontAwesome } from "@expo/vector-icons";
import { UserPhoto } from "@components/UserPhoto";
import { Badge } from "@components/Badge";
import { Button } from "@components/Form/Button";

import BicicleImage from "@assets/Bicycle.png";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function PreviewAd() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <VStack flex={1}>
      <VStack alignItems="center" bg="blue.light" pt={12} p={8}>
        <Heading fontFamily="bold" fontSize="xl" color="gray.7">
          Pré visualização do anúncio
        </Heading>
        <Text fontFamily="regular" fontSize="md" color="gray.7">
          É assim que seu produto vai aparecer!
        </Text>
      </VStack>
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
      <HStack
        py={4}
        bg="white"
        justifyContent="space-around"
        alignItems="center"
      >
        <Button
          w={160}
          mr={2}
          title="Voltar e editar"
          variant="subtle"
          icon="arrow-left"
          onPress={handleGoBack}
        />
        <Button w={160} title="Avançar" variant="solid" icon="tag" />
      </HStack>
    </VStack>
  );
}
