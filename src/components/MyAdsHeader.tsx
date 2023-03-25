import { HStack, Heading, Icon } from "native-base";
import { Feather } from "@expo/vector-icons";

export function MyAdsHeader() {
  return (
    <HStack pt={12} pb={5} justifyContent="space-around" alignItems="center">
      <Heading color="gray.1" fontFamily="heading" fontSize="xl">
        Meus anúncios
      </Heading>
      <Icon as={Feather} name="plus" color="gray.1" />
    </HStack>
  );
}
