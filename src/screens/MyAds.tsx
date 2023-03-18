import { ItemCard } from "@components/ItemCard";
import { MyAdsHeader } from "@components/MyAdsHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  CheckIcon,
  HStack,
  ScrollView,
  Select,
  Text,
  VStack,
} from "native-base";

export function MyAds() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  function handleOpenCard() {
    navigate("myAdDetails");
  }
  return (
    <VStack bg="gray.6">
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
      <ScrollView px={8} py={2} mt={6}>
        <HStack justifyContent="space-between">
          <ItemCard onPress={handleOpenCard} />
          <ItemCard onPress={handleOpenCard} />
        </HStack>
        <HStack mt={2} justifyContent="space-between">
          <ItemCard onPress={handleOpenCard} />
          <ItemCard onPress={handleOpenCard} />
        </HStack>
      </ScrollView>
    </VStack>
  );
}
