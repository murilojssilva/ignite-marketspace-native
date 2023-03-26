import { useCallback, useState } from "react";

import { EmptyProductList } from "@components/EmptyProductList";
import { Loading } from "@components/Loading";
import { MyAdsHeader } from "@components/MyAdsHeader";
import { ItemCard } from "@components/ItemCard";
import { ProductDTO } from "@dtos/ProductDTO";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import {
  CheckIcon,
  FlatList,
  HStack,
  Select,
  Text,
  VStack,
  useToast,
} from "native-base";

export function MyAds() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const toast = useToast();

  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [products, setProducts] = useState<ProductDTO[]>([] as ProductDTO[]);
  const [title, setTitle] = useState("Todos");

  async function fetchProducts() {
    try {
      setIsLoadingProducts(true);
      const response = await api.get("users/products");
      setProducts(response.data);
      setTitle("Todos");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os produtos.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoadingProducts(false);
    }
  }

  async function fetchNewProducts() {
    try {
      setIsLoadingProducts(true);
      const response = await api.get("users/products");
      setProducts(
        response.data.filter((product: ProductDTO) => product.is_new)
      );
      setTitle("Novos");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os produtos novos.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoadingProducts(false);
    }
  }

  async function fetchUsedProducts() {
    try {
      setIsLoadingProducts(true);
      const response = await api.get("users/products");
      setProducts(
        response.data.filter((product: ProductDTO) => !product.is_new)
      );
      setTitle("Usados");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os produtos novos.";

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
    }, [])
  );

  function handleOpenCard(productId: string) {
    navigate("myAdDetails", { productId });
  }

  return (
    <VStack flex={1} bg="gray.6">
      <MyAdsHeader />
      {isLoadingProducts ? (
        <Loading />
      ) : (
        <VStack>
          <HStack p={2} justifyContent="space-around">
            <Text>
              {products.length} {products.length === 1 ? "anúncio" : "anúncios"}
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
              <Select.Item label="Todos" value="all" onPress={fetchProducts} />
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
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ItemCard
                product={item}
                onPress={() => handleOpenCard(item.id)}
                key={item.id}
              />
            )}
            contentContainerStyle={[products.length === 0 && { flex: 1 }]}
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
