import { PaymentMethodDTO } from "@dtos/PaymentMethodDTO";

export const PAYMENT_METHODS = [
  { key: "boleto", name: "Boleto" },
  { key: "pix", name: "Pix" },
  { key: "cash", name: "Dinheiro" },
  { key: "credit_card", name: "Cartão de Crédito" },
  { key: "debit_card", name: "Cartão de Débito" },
] as PaymentMethodDTO[];