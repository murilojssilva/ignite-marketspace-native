import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";

type ButtonProps = IButtonProps & {
  title: string;
  variant?: "solid" | "outline" | "subtle";
};

export function Button({ title, variant = "solid", ...rest }: ButtonProps) {
  return (
    <NativeBaseButton
      w="full"
      h={14}
      bg={
        variant === "outline"
          ? "gray.1"
          : variant === "subtle"
          ? "gray.5"
          : "blue.light"
      }
      rounded="sm"
      _pressed={{
        bg:
          variant === "solid"
            ? "gray.2"
            : variant === "subtle"
            ? "gray.300"
            : "blue.normal",
      }}
      {...rest}
    >
      <Text
        color={variant === "subtle" ? "gray.1" : "white"}
        fontFamily="bold"
        fontSize="sm"
      >
        {title}
      </Text>
    </NativeBaseButton>
  );
}
