import { Box, IBoxProps, Text } from "native-base";

type BagdeProps = IBoxProps & {
  text: string;
};

export function Badge({ text, ...rest }: BagdeProps) {
  return (
    <Box
      bg="gray.2"
      h={8}
      px={2}
      borderRadius="full"
      alignItems="center"
      justifyContent="center"
    >
      <Text textAlign="center" color="gray.7" fontFamily="bold">
        {text.toUpperCase()}
      </Text>
    </Box>
  );
}
