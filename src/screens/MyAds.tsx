import { ItemCard } from "@components/ItemCard";
import { MyAdsHeader } from "@components/MyAdsHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { CheckIcon, HStack, Select, Text, VStack } from "native-base";

export function MyAds() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  function handleOpenCard() {
    navigate("myAdDetails");
  }
  return (
    <VStack>
      <MyAdsHeader />
      <HStack alignItems="center" p={2} justifyContent="space-around">
        <Text>9 anúncios</Text>

        <Select
          _actionSheet={{
            bg: "gray.7",
          }}
          _selectedItem={{
            bg: "red.500",
            endIcon: <CheckIcon size={5} />,
          }}
          minWidth="100"
          accessibilityLabel="Todos"
          placeholder="Todos"
        >
          <Select.Item label="Todos" value="all" />
          <Select.Item label="Todos" value="all" />
          <Select.Item label="Todos" value="all" />
          <Select.Item label="Todos" value="all" />
        </Select>
      </HStack>
      <VStack p={2}>
        <HStack justifyContent="space-between">
          <ItemCard onPress={handleOpenCard} />
          <ItemCard onPress={handleOpenCard} />
        </HStack>
        <HStack mt={2} justifyContent="space-between">
          <ItemCard onPress={handleOpenCard} />
          <ItemCard onPress={handleOpenCard} />
        </HStack>
      </VStack>
    </VStack>
  );
}
