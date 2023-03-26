import React, {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

import { ProductDTO } from "@dtos/ProductDTO";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useDisclose, useToast } from "native-base";
import { GestureResponderEvent, Linking } from "react-native";

export type IProductContextProps = {
  products: ProductDTO[];
  myProducts: ProductDTO[];
  product: ProductDTO;

  state: "NOVO" | "USADO" | "";
  isLoadingProducts: boolean;
  isLoadingProduct: boolean;
  acceptTrade: boolean;
  title: string;

  fetchProduct: (productId: string) => Promise<void>;
  fetchProducts: () => Promise<void>;
  fetchNewProducts: () => Promise<void>;
  fetchUsedProducts: () => Promise<void>;
  fetchMyProducts: () => Promise<void>;

  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;

  setAcceptTrade: Dispatch<SetStateAction<boolean>>;
  setProducts: Dispatch<SetStateAction<ProductDTO[]>>;
  setState: Dispatch<SetStateAction<"" | "NOVO" | "USADO">>;

  handleCondition: (item: "" | "NOVO" | "USADO") => void;
  handleFilterByName: () => Promise<void>;
  handleFilterProducts: () => Promise<void>;
  handleOpenWhatsApp: () => void;
  handleResetFilters: () => Promise<void>;
};

type ProductsProviderProps = {
  children: ReactNode;
};

export const ProductsContext = createContext<IProductContextProps>(
  {} as IProductContextProps
);

export function ProductsContextProvider({ children }: ProductsProviderProps) {
  const { isOpen, onOpen, onClose } = useDisclose();

  const [products, setProducts] = useState<ProductDTO[]>([] as ProductDTO[]);
  const [myProducts, setMyProducts] = useState<ProductDTO[]>(
    [] as ProductDTO[]
  );
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

  const [state, setState] = useState<"NOVO" | "USADO" | "">("");

  const [acceptTrade, setAcceptTrade] = useState(false);

  const toast = useToast();

  const [filterName, setFilterName] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isNew, setIsNew] = useState(false);

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

  const [title, setTitle] = useState("Todos");

  async function fetchMyProducts() {
    try {
      setIsLoadingProducts(true);
      const response = await api.get("users/products");
      setMyProducts(response.data);
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
      setMyProducts(
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
      setMyProducts(
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

  async function fetchProduct(productId: string) {
    try {
      setIsLoadingProduct(true);
      const response = await api.get(`/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar o produto";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoadingProduct(false);
    }
  }

  function handleCondition(item: "NOVO" | "USADO" | "") {
    setState(item);
    setIsNew(item === "NOVO" ? true : false);
  }

  async function handleFilterProducts() {
    try {
      setIsLoadingProducts(true);
      const params = `is_new=${isNew}&accept_trade=${acceptTrade}&payment_methods=${JSON.stringify(
        paymentMethods
      )}`;
      const response = await api.get(`/products?${params}`);
      setProducts(response.data);
      onClose();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os filtros do produto";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoadingProducts(false);
    }
  }

  async function handleFilterByName() {
    try {
      const response = await api.get(`/products?query=${filterName}`);
      setProducts(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os filtros do produto";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  function resetCondition() {
    setState("");
    setPaymentMethods([]);
  }

  async function handleResetFilters() {
    try {
      resetCondition();
      setFilterName("");
      setAcceptTrade(false);
      setPaymentMethods([]);

      await fetchProducts();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os resetar os filtros do produto";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  function handleOpenWhatsApp() {
    try {
      setIsLoadingProduct(true);
      Linking.openURL(`https://wa.me/${product.user?.tel}`);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os dados.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoadingProduct(false);
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        myProducts,
        product,
        isLoadingProducts,
        isLoadingProduct,
        state,
        acceptTrade,
        title,
        isOpen,
        onOpen,
        onClose,
        handleCondition,
        handleFilterByName,
        handleFilterProducts,
        handleOpenWhatsApp,
        handleResetFilters,
        setState,
        setAcceptTrade,
        setProducts,
        fetchProducts,
        fetchMyProducts,
        fetchProduct,
        fetchNewProducts,
        fetchUsedProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
