import { Box, Divider, Flex, HStack, Icon, Text, useTheme } from "native-base";
import { MagnifyingGlass, Sliders } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Input } from "@components/Form/Input";

type SearchBarProps = {
  handleFilterPress: (showModal: boolean) => void;
};

export function SearchBar({ handleFilterPress }: SearchBarProps) {
  return (
    <HStack bg="gray.7" alignItems="center" justifyContent="center" mb={6}>
      <Input
        bg="gray.7"
        fontFamily="bold"
        fontSize="md"
        placeholder="Buscar anúncio"
        placeholderTextColor="gray.4"
        paddingRight={24}
      />

      <Box alignItems="center" ml={-20}>
        <Flex direction="row" h="58" p="4">
          <TouchableOpacity>
            <Icon as={Feather} name="search" size={5} color="gray.1" />
          </TouchableOpacity>
          <Divider bg="gray.4" thickness="2" mx="2" orientation="vertical" />
          <TouchableOpacity onPress={() => handleFilterPress(true)}>
            <Icon as={Feather} name="sliders" size={5} color="gray.1" />
          </TouchableOpacity>
        </Flex>
      </Box>
    </HStack>
  );
}
