import {
  HStack,
  Text,
  Checkbox as NativeBaseCheckbox,
  ICheckboxProps,
} from "native-base";

type CheckboxProps = ICheckboxProps & {
  text: string;
};

export function Checkbox({ text, ...rest }: CheckboxProps) {
  return (
    <HStack alignItems="center" p={1}>
      <NativeBaseCheckbox
        mr={2}
        size={12}
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
