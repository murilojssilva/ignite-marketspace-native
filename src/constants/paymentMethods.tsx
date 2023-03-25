import { PaymentMethodDTO } from "@dtos/PaymentMethodDTO";

export const PAYMENT_METHODS = [
  { key: "boleto", name: "Boleto" },
  { key: "pix", name: "Pix" },
  { key: "cash", name: "Dinheiro" },
  { key: "card", name: "Cartão de Crédito" },
  { key: "deposit", name: "Depósito" },
] as PaymentMethodDTO[];
