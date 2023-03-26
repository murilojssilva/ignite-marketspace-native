import { HStack, Heading } from "native-base";

type ValuesProps = {
  value: string;
  type: "bottom" | "top" | "card";
  isActive?: boolean;
};

export function Values({ value, type, isActive }: ValuesProps) {
  return (
    <HStack alignItems="flex-end">
      <Heading
        fontFamily="heading"
        fontSize="sm"
        color={
          type === "bottom"
            ? "blue.normal"
            : type === "card"
            ? "gray.1"
            : "blue.light"
        }
      ></Heading>
      <Heading
        fontFamily="heading"
        fontSize="xl"
        color={
          type === "bottom"
            ? "blue.normal"
            : type === "card"
            ? isActive
              ? "gray.1"
              : "gray.4"
            : "blue.light"
        }
      >
        {value}
      </Heading>
    </HStack>
  );
}
