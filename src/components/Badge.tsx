import { Box, IBoxProps, Text } from "native-base";

type BagdeProps = IBoxProps & {
  text: string;
};

export function Badge({ text, ...rest }: BagdeProps) {
  return (
    <Box alignItems="center" bg={"blue.normal"} rounded="full" {...rest}>
      <Text color="white" fontFamily="heading" px={3} py={1}>
        {text.toUpperCase()}
      </Text>
    </Box>
  );
}
