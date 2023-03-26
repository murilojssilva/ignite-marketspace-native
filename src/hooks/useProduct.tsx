import { useContext } from "react";
import { ProductsContext } from "@contexts/ProductContext";

export function useProduct() {
  const context = useContext(ProductsContext);

  return context;
}
