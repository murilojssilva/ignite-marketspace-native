import { PaymentMethodDTO } from "@dtos/PaymentMethodDTO";
import {
  HStack,
  Text,
  Checkbox as NativeBaseCheckbox,
  ICheckboxProps,
} from "native-base";

type CheckboxProps = ICheckboxProps & {
  item: PaymentMethodDTO;
  text: string;
  value: string;
};

export function Checkbox({ item, text, value, ...rest }: CheckboxProps) {
  return (
    <HStack alignItems="center" p={1}>
      <NativeBaseCheckbox
        value={value}
        mr={2}
        accessibilityLabel={text}
        _checked={{
          bg: "blue.light",
        }}
        {...rest}
      />
      <Text fontSize="lg" color="gray.2" fontFamily="regular">
        {text}
      </Text>
    </HStack>
  );
}
