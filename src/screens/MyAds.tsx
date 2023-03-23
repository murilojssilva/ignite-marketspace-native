import { EmptyProductList } from "@components/EmptyProductList";
import { Loading } from "@components/Loading";
import { MyAdsHeader } from "@components/MyAdsHeader";
import { UserItemCard } from "@components/UserItemCard";
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
import { useCallback, useState } from "react";

export function MyAds() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const toast = useToast();

  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [products, setProducts] = useState<ProductDTO[]>([] as ProductDTO[]);

  async function fetchProducts() {
    try {
      setIsLoadingProducts(true);
      const response = await api.get("users/products");
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

  function handleOpenCard(productId: string) {
    navigate("myAdDetails", { productId });
  }

  return (
    <VStack bg="gray.6">
      <MyAdsHeader />
      <HStack alignItems="center" p={2} justifyContent="space-around">
        <Text>{products.length} anúncios</Text>

        <Select
          _actionSheet={{
            bg: "gray.7",
          }}
          _selectedItem={{
            bg: "red.500",
            endIcon: <CheckIcon size={5} />,
          }}
          minWidth="100"
          accessibilityLabel="Todos"
          placeholder="Todos"
        >
          <Select.Item
            label="Todos"
            value="all"
            onPress={() => setProducts(products)}
          />
          <Select.Item
            label="Novos"
            value="new"
            onPress={() =>
              setProducts(products.filter((product) => product.is_new))
            }
          />
          <Select.Item
            label="Usados"
            value="used"
            onPress={() =>
              setProducts(products.filter((product) => !product.is_new))
            }
          />
        </Select>
      </HStack>
      {!isLoadingProducts ? (
        <Loading />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <UserItemCard
              product={item}
              onPress={() => handleOpenCard(item.id)}
              key={item.id}
            />
          )}
          ListEmptyComponent={<EmptyProductList />}
          numColumns={2}
          _contentContainerStyle={{ alignItems: "center", pb: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </VStack>
  );
}
