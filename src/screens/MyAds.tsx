import {
  Center,
  CheckIcon,
  FlatList,
  HStack,
  Select,
  Skeleton,
  Text,
  VStack,
} from "native-base";

import { useProduct } from "@hooks/useProduct";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { EmptyProductList } from "@components/EmptyProductList";
import { MyAdsHeader } from "@components/MyAdsHeader";
import { ItemCard } from "@components/ItemCard";
import { SkeletonCard } from "@components/SkeletonCard";
import { useCallback } from "react";

export function MyAds() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const {
    myProducts,
    isLoadingProducts,
    fetchNewProducts,
    fetchUsedProducts,
    fetchMyProducts,
    title,
  } = useProduct();

  function handleOpenCard(productId: string) {
    navigate("myAdDetails", { productId });
  }

  useFocusEffect(
    useCallback(() => {
      fetchMyProducts();
    }, [])
  );

  return (
    <VStack flex={1} bg="gray.6">
      <MyAdsHeader />
      {isLoadingProducts ? (
        <VStack>
          <HStack p={2} justifyContent="space-around">
            <Text>
              <Skeleton w={5} h={5} startColor="gray.500" endColor="gray.400" />{" "}
              anúncios
            </Text>

            <Select
              _actionSheet={{
                bg: "gray.7",
              }}
              _selectedItem={{
                bg: "red.500",
                endIcon: <CheckIcon size={5} />,
              }}
              minWidth="100"
              accessibilityLabel={title}
              placeholder={title}
            >
              <Select.Item
                label="Todos"
                value="all"
                onPress={fetchMyProducts}
              />
              <Select.Item
                label="Novos"
                value="new"
                onPress={fetchNewProducts}
              />
              <Select.Item
                label="Usados"
                value="used"
                onPress={fetchUsedProducts}
              />
            </Select>
          </HStack>
          <Center>
            <FlatList
              data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => <SkeletonCard key={item} />}
              contentContainerStyle={[
                ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].length ===
                  0 && { flex: 1 },
              ]}
              ListEmptyComponent={<EmptyProductList />}
              numColumns={2}
              _contentContainerStyle={{ alignItems: "center", pb: 20 }}
              showsVerticalScrollIndicator={false}
            />
          </Center>
        </VStack>
      ) : (
        <VStack>
          <HStack p={2} justifyContent="space-around">
            <Text>
              {myProducts.length}{" "}
              {myProducts.length === 1 ? "anúncio" : "anúncios"}
            </Text>

            <Select
              _actionSheet={{
                bg: "gray.7",
              }}
              _selectedItem={{
                bg: "red.500",
                endIcon: <CheckIcon size={5} />,
              }}
              minWidth="100"
              accessibilityLabel={title}
              placeholder={title}
            >
              <Select.Item
                label="Todos"
                value="all"
                onPress={fetchMyProducts}
              />
              <Select.Item
                label="Novos"
                value="new"
                onPress={fetchNewProducts}
              />
              <Select.Item
                label="Usados"
                value="used"
                onPress={fetchUsedProducts}
              />
            </Select>
          </HStack>

          <FlatList
            p={8}
            data={myProducts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ItemCard
                product={item}
                onPress={() => handleOpenCard(item.id)}
                key={item.id}
              />
            )}
            contentContainerStyle={[myProducts.length === 0 && { flex: 1 }]}
            ListEmptyComponent={<EmptyProductList />}
            numColumns={2}
            _contentContainerStyle={{ alignItems: "center", pb: 20 }}
            showsVerticalScrollIndicator={false}
          />
        </VStack>
      )}
    </VStack>
  );
}
