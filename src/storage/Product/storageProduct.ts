import AsyncStorage from "@react-native-async-storage/async-storage";

import { ProductDTO } from "@dtos/ProductDTO";
import { PRODUCT_STORAGE } from "@storage/storageConfig";

export async function storageUserSave(user: ProductDTO) {
  await AsyncStorage.setItem(PRODUCT_STORAGE, JSON.stringify(user));
}

export async function storageProductsGetAll() {
  try {
    const storage = await AsyncStorage.getItem(PRODUCT_STORAGE);

    const products: ProductDTO[] = storage ? JSON.parse(storage) : [];

    return products;
  } catch (error) {
    throw error;
  }
}

export async function storageCreateProduct(product: ProductDTO) {
  try {
    const storedProducts = await storageProductsGetAll();

    const storage = JSON.stringify([...storedProducts, product]);
    await AsyncStorage.setItem(PRODUCT_STORAGE, storage);
  } catch (error) {
    throw error;
  }
}

export async function storageProductEdit(editProduct: ProductDTO) {
  try {
    const storedProducts = await storageProductsGetAll();

    const products = storedProducts.map(
      (product) =>
        product.id === editProduct.id && {
          id: editProduct.id,
          name: editProduct.name,
          price: editProduct.price,
          description: editProduct.description,
          is_active: editProduct.is_active,
          acept_trade: editProduct.acept_trade,
          is_new: editProduct.is_new,
        }
    );

    await AsyncStorage.setItem(PRODUCT_STORAGE, JSON.stringify(products));
  } catch (error) {
    throw error;
  }
}

export async function storageProductRemove() {
  await AsyncStorage.removeItem(PRODUCT_STORAGE);
}
