import { PaymentMethodDTO } from "./PaymentMethodDTO";
import { ProductImageDTO } from "./ProductImagesDTO";

export type ProductDTO = {
  user_id: string;
  id: string;
  name: string;
  description: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  is_active: boolean;
  payment_methods: PaymentMethodDTO[];
  product_images: ProductImageDTO[];
  user: {
    avatar: string;
  };
};
