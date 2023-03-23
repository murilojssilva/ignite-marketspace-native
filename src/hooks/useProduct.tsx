import { useContext } from "react";
import {
  ProductsContext,
  IProductContextProps,
} from "@contexts/ProductContext";

export function useProduct() {
  const context = useContext(ProductsContext);

  return context;
}
