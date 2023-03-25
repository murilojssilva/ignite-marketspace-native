import { HStack, Icon, Heading } from "native-base";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type HeaderBackProps = {
  title?: string;
  icon?: string;
  onPress?: () => void;
};

export function HeaderBack({ title, icon, onPress }: HeaderBackProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <HStack pt={12} p={8} justifyContent="space-between">
      <TouchableOpacity onPress={handleGoBack}>
        <Icon as={Feather} name="arrow-left" size={6} color="gray.1" />
      </TouchableOpacity>
      {title && (
        <Heading
          alignItems="center"
          justifyContent="center"
          fontFamily="heading"
          fontSize="xl"
          color="gray.1"
        >
          {title}
        </Heading>
      )}
      {icon && (
        <Icon
          onPress={onPress}
          as={Feather}
          name={icon}
          size={6}
          color="gray.1"
        />
      )}
    </HStack>
  );
}
