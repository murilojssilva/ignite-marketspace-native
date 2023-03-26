import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import {
  Actionsheet,
  Center,
  FlatList,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from "native-base";

import { Badge } from "@components/Badge";
import { Checkbox } from "@components/Checkbox";
import { AdCard } from "@components/AdCard";
import { Button } from "@components/Form/Button";
import { HomeHeader } from "@components/HomeHeader";
import { ItemCard } from "@components/ItemCard";
import { Switch } from "@components/Switch";
import { SearchBar } from "@components/SearchBar";

import { EmptyProductList } from "@components/EmptyProductList";
import { PAYMENT_METHODS } from "@constants/paymentMethods";

import { SkeletonCard } from "@components/SkeletonCard";
import { useProduct } from "@hooks/useProduct";
import { useAuth } from "@hooks/useAuth";
import { useCallback } from "react";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Home() {
  const { user } = useAuth();

  const {
    products,
    acceptTrade,
    state,
    isLoadingProducts,
    isOpen,
    onOpen,
    onClose,
    handleFilterByName,
    handleCondition,
    setState,
    setAcceptTrade,
    handleResetFilters,
    handleFilterProducts,
    setProducts,
    fetchProducts,
    fetchMyProducts,
  } = useProduct();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenCard(productId: string) {
    navigation.navigate("details", { productId });
  }

  function handleOpenMyAdCard(productId: string) {
    navigation.navigate("myAdDetails", { productId });
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      fetchMyProducts();
    }, [])
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
        <SearchBar search={handleFilterByName} handleFilterPress={onOpen} />
      </VStack>

      {isLoadingProducts ? (
        <Center>
          <FlatList
            data={["1", "2", "3", "4"]}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <SkeletonCard key={item} />}
            contentContainerStyle={[
              ["1", "2", "3", "4"].length === 0 && { flex: 1 },
            ]}
            ListEmptyComponent={<EmptyProductList />}
            numColumns={2}
            _contentContainerStyle={{ alignItems: "center", pb: 20 }}
            showsVerticalScrollIndicator={false}
          />
        </Center>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ItemCard
              product={item}
              onPress={() =>
                item.user.id === user.id
                  ? handleOpenMyAdCard(item.id)
                  : handleOpenCard(item.id)
              }
              key={item.id}
            />
          )}
          contentContainerStyle={[products.length === 0 && { flex: 1 }]}
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
            <Heading color="gray.1" fontSize="xl" fontFamily="heading">
              Filtrar anúncios
            </Heading>
            <TouchableOpacity onPress={onClose}>
              <Icon as={Feather} name="x" size={8} color="gray.4" />
            </TouchableOpacity>
          </HStack>
          <VStack>
            <Heading color="gray.1" fontSize="sm" fontFamily="heading">
              Condição
            </Heading>
            <HStack py={3}>
              {state === "NOVO" ? (
                <TouchableOpacity onPress={() => handleCondition}>
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
                <TouchableOpacity onPress={() => handleCondition}>
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
            <Heading mb={2} color="gray.1" fontSize="sm" fontFamily="heading">
              Aceita troca?
            </Heading>
            <Switch
              size="md"
              onToggle={(value) => setAcceptTrade(value)}
              value={acceptTrade}
            />
          </VStack>
          <Heading pt={3} color="gray.1" fontSize="sm" fontFamily="heading">
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
            <Button
              w={150}
              mr={2}
              variant="subtle"
              title="Resetar filtros"
              onPress={handleResetFilters}
            />
            <Button
              variant="outline"
              w={150}
              title="Aplicar filtros"
              onPress={handleFilterProducts}
            />
          </HStack>
        </Actionsheet.Content>
      </Actionsheet>
    </VStack>
  );
}
