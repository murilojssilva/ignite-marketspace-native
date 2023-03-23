import { PaymentMethodDTO } from "./PaymentMethodDTO";

export type PreviewAdDTO = {
  name: string;
  description: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  imagesUri: string[];
  payment_methods: PaymentMethodDTO[];
};
