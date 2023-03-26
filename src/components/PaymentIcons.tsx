import { HStack, Icon, Text, IIconProps } from "native-base";

import { FontAwesome } from "@expo/vector-icons";

type PaymentIconsProps = IIconProps & {
  name: string;
};

export function PaymentIcons({ name, ...rest }: PaymentIconsProps) {
  return (
    <HStack alignItems="center">
      <Icon
        color="gray.1"
        as={FontAwesome}
        mr={2}
        name={
          name === "Dinheiro"
            ? "money"
            : name === "Depósito Bancário"
            ? "bank"
            : name === "Boleto"
            ? "barcode"
            : name === "Pix"
            ? "qrcode"
            : name === "Cartão de Crédito"
            ? "credit-card"
            : "image"
        }
        {...rest}
      />
      <Text fontFamily="regular" fontSize="md" color="gray.1">
        {name}
      </Text>
    </HStack>
  );
}
