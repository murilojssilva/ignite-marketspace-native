import { Box, HStack, IBoxProps, Icon, Text } from "native-base";
import { Feather } from "@expo/vector-icons";

type BagdeProps = IBoxProps & {
  variant: "inFilter" | "outFilter";
  state: "NOVO" | "USADO";
  icon?: string;
  colorText: "white" | "gray.1";
};

export function Badge({
  state,
  icon,
  colorText,
  variant = "outFilter",
  ...rest
}: BagdeProps) {
  return (
    <Box
      alignItems="center"
      bg={state === "NOVO" ? "blue.light" : "gray.5"}
      rounded="full"
      {...rest}
    >
      {icon ? (
        <HStack alignItems="center">
          <Text color={colorText} fontFamily="heading" p={1}>
            {state}
          </Text>
          <Box
            alignItems="center"
            justifyContent="center"
            rounded="full"
            bg="gray.7"
          >
            <Icon color="blue.light" as={Feather} name={icon} />
          </Box>
        </HStack>
      ) : (
        <Text color={colorText} fontFamily="heading" px={3} py={1}>
          {state}
        </Text>
      )}
    </Box>
  );
}
