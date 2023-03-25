import { Heading, Icon, VStack } from "native-base";
import { Feather } from "@expo/vector-icons";

export function EmptyProductList() {
  return (
    <VStack rounded="md" p={10} alignItems="center">
      <Icon color="gray.1" as={Feather} name="alert-triangle" size={20} />
      <Heading mt={2} color="gray.1" fontSize={20} fontFamily="heading">
        Não há nenhum produto cadastrado no momento.
      </Heading>
    </VStack>
  );
}
