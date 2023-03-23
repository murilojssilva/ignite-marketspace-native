import { Center, Heading, Icon, VStack } from "native-base";
import { Feather } from "@expo/vector-icons";

export function EmptyProductList() {
  return (
    <VStack rounded="md" p={10} alignItems="center">
      <Icon color="red.500" as={Feather} name="alert-triangle" size={20} />
      <Heading color="red.500" fontSize={20} fontFamily="bold">
        Não há nenhum produto cadastrado no momento.
      </Heading>
    </VStack>
  );
}
