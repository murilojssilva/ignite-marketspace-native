import { HStack, Icon, Text } from "native-base";

import { FontAwesome } from "@expo/vector-icons";

type PaymentIconsProps = {
  key: string;
  name: string;
};

export function PaymentIcons({ key, name, ...rest }: PaymentIconsProps) {
  return (
    <HStack alignItems="center" key={key}>
      <Icon
        color="gray.1"
        as={FontAwesome}
        mr={2}
        name={
          key === "cash"
            ? "money"
            : key === "deposit"
            ? "bank"
            : key === "boleto"
            ? "barcode"
            : key === "pix"
            ? "qrcode"
            : ""
        }
      />
      <Text fontFamily="regular" fontSize="md" color="gray.1">
        {name}
      </Text>
    </HStack>
  );
}
