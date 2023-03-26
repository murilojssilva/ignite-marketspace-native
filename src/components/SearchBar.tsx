import { Box, Divider, Flex, HStack, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Input } from "@components/Form/Input";

type SearchBarProps = {
  handleFilterPress: (showModal: boolean) => void;
  search: () => void;
};

export function SearchBar({ handleFilterPress, search }: SearchBarProps) {
  return (
    <HStack mb={6}>
      <Input
        fontFamily="heading"
        fontSize="md"
        placeholder="Buscar anúncio"
        paddingRight={24}
      />

      <Box alignItems="center" ml={-20}>
        <HStack p={3.5}>
          <TouchableOpacity onPress={() => search}>
            <Icon as={Feather} name="search" size={5} color="gray.1" />
          </TouchableOpacity>
          <Divider
            bg="gray.4"
            h={5}
            thickness="2"
            mx={2}
            orientation="vertical"
          />
          <TouchableOpacity onPress={() => handleFilterPress(true)}>
            <Icon as={Feather} name="sliders" size={5} color="gray.1" />
          </TouchableOpacity>
        </HStack>
      </Box>
    </HStack>
  );
}
