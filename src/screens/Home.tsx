import { AdCard } from "@components/AdCard";
import { Button } from "@components/Form/Button";
import { Input } from "@components/Form/Input";
import { HomeHeader } from "@components/HomeHeader";
import { ItemCard } from "@components/ItemCard";
import {
  Actionsheet,
  HStack,
  Heading,
  Icon,
  ScrollView,
  Text,
  VStack,
  useDisclose,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { Badge } from "@components/Badge";
import { Checkbox } from "@components/Checkbox";
import { Switch } from "@components/Switch";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { SearchBar } from "@components/SearchBar";

export function Home() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenCard() {
    navigate("details");
  }

  return (
    <VStack bg="gray.6" p={8} mt={6} justifyContent="space-between">
      <HomeHeader />
      <Text fontSize="sm" fontFamily="regular" color="gray.1">
        Seus produtos anunciados para venda
      </Text>
      <AdCard />
      <VStack mt={5}>
        <Text fontSize="sm" fontFamily="regular" color="gray.1">
          Compre produtos variados
        </Text>
        <SearchBar handleFilterPress={onOpen} />
      </VStack>
      <ScrollView>
        <HStack justifyContent="space-between">
          <ItemCard onPress={handleOpenCard} />
          <ItemCard onPress={handleOpenCard} />
        </HStack>
        <HStack mt={2} justifyContent="space-between">
          <ItemCard onPress={handleOpenCard} />
          <ItemCard onPress={handleOpenCard} />
        </HStack>
      </ScrollView>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content
          py={6}
          px={4}
          alignItems="flex-start"
          _dragIndicator={{
            bg: "gray.5",
          }}
        >
          <HStack width="100%" justifyContent="space-between">
            <Heading color="gray.1" fontSize="xl" fontFamily="bold">
              Filtrar anúncios
            </Heading>
            <TouchableOpacity onPress={onClose}>
              <Icon as={Feather} name="x" size={8} color="gray.4" />
            </TouchableOpacity>
          </HStack>
          <VStack>
            <Heading color="gray.1" fontSize="sm" fontFamily="bold">
              Condição
            </Heading>
            <HStack py={3}>
              <Badge w={20} mr={2} text="novo" />
              <Badge w={20} text="usado" />
            </HStack>
          </VStack>
          <VStack>
            <Heading mb={2} color="gray.1" fontSize="sm" fontFamily="bold">
              Aceita troca?
            </Heading>
            <Switch size="md" />
          </VStack>
          <VStack py={12}>
            <Heading py={3} color="gray.1" fontSize="sm" fontFamily="bold">
              Meios de pagamento aceitos
            </Heading>
            <Checkbox value="test" text="Boleto" />
            <Checkbox value="test" text="Pix" />
            <Checkbox value="test" text="Dinheiro" />
            <Checkbox value="test" text="Cartão de Crédito" />
            <Checkbox value="test" text="Depósito Bancário" />
          </VStack>
          <HStack justifyContent="space-between" mx={8}>
            <Button w={150} mr={2} variant="subtle" title="Resetar filtros" />
            <Button variant="outline" w={150} title="Aplicar filtros" />
          </HStack>
        </Actionsheet.Content>
      </Actionsheet>
    </VStack>
  );
}
