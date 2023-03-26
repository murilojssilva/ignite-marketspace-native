import { HStack, Heading } from "native-base";

type ValuesProps = {
  value: string;
  type: "bottom" | "top";
};

export function Values({ value, type }: ValuesProps) {
  return (
    <HStack alignItems="flex-end">
      <Heading
        fontFamily="heading"
        fontSize="sm"
        color={type === "bottom" ? "blue.normal" : "blue.light"}
      >
        R$
      </Heading>
      <Heading
        fontFamily="heading"
        fontSize="xl"
        color={type === "bottom" ? "blue.normal" : "blue.light"}
      >
        {value}
      </Heading>
    </HStack>
  );
}
