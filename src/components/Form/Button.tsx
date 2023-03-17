import {
  Button as NativeBaseButton,
  IButtonProps,
  Text,
  Icon,
  HStack,
} from "native-base";
import { Feather } from "@expo/vector-icons";

type ButtonProps = IButtonProps & {
  title: string;
  variant?: "solid" | "outline" | "subtle";
  icon?: string;
};

export function Button({
  title,
  icon,
  variant = "solid",
  ...rest
}: ButtonProps) {
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
      <HStack alignItems="center">
        {icon && (
          <Icon
            as={Feather}
            name={icon}
            mr={1}
            color={variant === "subtle" ? "gray.1" : "white"}
          />
        )}
        <Text
          color={variant === "subtle" ? "gray.1" : "white"}
          fontFamily="bold"
          fontSize="sm"
        >
          {title}
        </Text>
      </HStack>
    </NativeBaseButton>
  );
}
