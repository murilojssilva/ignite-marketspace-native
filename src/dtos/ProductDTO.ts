import { PaymentMethodDTO } from "./PaymentMethodDTO";
import { ProductImageDTO } from "./ProductImagesDTO";
import { UserDTO } from "./UserDTO";

export type ProductDTO = {
  id: string;
  name: string;
  description: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  is_active: boolean;
  payment_methods: PaymentMethodDTO[];
  product_images: ProductImageDTO[];
  user: UserDTO;
  user_id: string;
};
