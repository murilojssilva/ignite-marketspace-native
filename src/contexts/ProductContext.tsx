import React, { useState, createContext, ReactNode, useCallback } from "react";
import { ProductDTO } from "@dtos/ProductDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useToast } from "native-base";
import { useFocusEffect } from "@react-navigation/native";

export interface IProductContextProps {
  products: ProductDTO[];
  isLoadingProducts: boolean;
  activeProducts: number;
}

export const ProductsContext = createContext({} as IProductContextProps);

interface ProductsProviderProps {
  children: ReactNode;
}

export async function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<ProductDTO[]>([] as ProductDTO[]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [activeProducts, setActiveProducts] = useState(0);

  const toast = useToast();

  async function fetchProducts() {
    try {
      setIsLoadingProducts(true);
      const response = await api.get("/products");
      await setProducts(response.data);
      await setActiveProducts(
        products.filter((product) => product.is_active).length
      );
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
    <ProductsContext.Provider
      value={{
        products,
        isLoadingProducts,
        activeProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
