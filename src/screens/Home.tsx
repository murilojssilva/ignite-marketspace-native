import { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import {
  Actionsheet,
  FlatList,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  useDisclose,
  useToast,
} from "native-base";

import { Badge } from "@components/Badge";
import { Checkbox } from "@components/Checkbox";
import { AdCard } from "@components/AdCard";
import { Button } from "@components/Form/Button";
import { HomeHeader } from "@components/HomeHeader";
import { ItemCard } from "@components/ItemCard";
import { Switch } from "@components/Switch";
import { SearchBar } from "@components/SearchBar";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { EmptyProductList } from "@components/EmptyProductList";
import { Loading } from "@components/Loading";
import { PAYMENT_METHODS } from "@constants/paymentMethods";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { ProductDTO } from "@dtos/ProductDTO";
import { paymentMethods } from "@utils/index";

export function Home() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const [state, setState] = useState("NOVO");

  const toast = useToast();

  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [products, setProducts] = useState<ProductDTO[]>([] as ProductDTO[]);

  function handleOpenCard() {
    navigate("details");
  }

  async function fetchProducts() {
    try {
      setIsLoadingProducts(true);
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os produtos";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoadingProducts(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [products])
  );

  return (
    <VStack flex={1} bg="gray.6" p={8} mt={6} justifyContent="space-between">
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

      {!isLoadingProducts ? (
        <Loading />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ItemCard
              product={item}
              onPress={() => handleOpenCard()}
              key={item.id}
            />
          )}
          ListEmptyComponent={<EmptyProductList />}
          numColumns={2}
          _contentContainerStyle={{ alignItems: "center", pb: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}

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
              {state === "NOVO" ? (
                <TouchableOpacity
                  onPress={() =>
                    setProducts(products.filter((product) => product.is_new))
                  }
                >
                  <Badge
                    colorText="white"
                    w={20}
                    mr={2}
                    state="NOVO"
                    icon="x"
                    variant="inFilter"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setState("NOVO")}>
                  <Badge
                    variant="inFilter"
                    colorText="gray.1"
                    w={20}
                    mr={2}
                    state="NOVO"
                    bg="gray.5"
                  />
                </TouchableOpacity>
              )}
              {state === "USADO" ? (
                <TouchableOpacity
                  onPress={() =>
                    setProducts(products.filter((product) => !product.is_new))
                  }
                >
                  <Badge
                    colorText="white"
                    w={20}
                    state="USADO"
                    bg="blue.light"
                    icon="x"
                    variant="inFilter"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setState("USADO")}>
                  <Badge
                    colorText="gray.1"
                    variant="inFilter"
                    w={20}
                    mr={2}
                    state="USADO"
                  />
                </TouchableOpacity>
              )}
            </HStack>
          </VStack>
          <VStack>
            <Heading mb={2} color="gray.1" fontSize="sm" fontFamily="bold">
              Aceita troca?
            </Heading>
            <Switch
              size="md"
              onChange={() =>
                setProducts(products.filter((product) => product.accept_trade))
              }
            />
          </VStack>
          <Heading pt={3} color="gray.1" fontSize="sm" fontFamily="bold">
            Meios de pagamento aceitos
          </Heading>
          <FlatList
            data={PAYMENT_METHODS}
            py={2}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <Checkbox
                item={item}
                value={item.key}
                text={item.name}
                onChange={() =>
                  setProducts(
                    products.filter((product) =>
                      product.payment_methods.map(
                        (paymentMethod) => paymentMethod.name === item.name
                      )
                    )
                  )
                }
              />
            )}
          />
          <HStack justifyContent="space-between" mx={8}>
            <Button w={150} mr={2} variant="subtle" title="Resetar filtros" />
            <Button
              variant="outline"
              w={150}
              title="Aplicar filtros"
              onPress={onClose}
            />
          </HStack>
        </Actionsheet.Content>
      </Actionsheet>
    </VStack>
  );
}
