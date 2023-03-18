import {
  IInputProps,
  TextArea as NativeBaseTextarea,
  FormControl,
  Icon,
  ITextAreaProps,
} from "native-base";
import { Feather } from "@expo/vector-icons";

type InputProps = ITextAreaProps & {
  errorMessage?: string | null;
  icon?: string;
};

export function Textarea({
  icon,
  errorMessage = null,
  isInvalid,
  ...rest
}: InputProps) {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseTextarea
        autoCompleteType={false}
        bg="gray.7"
        h={200}
        py={6}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="white"
        fontFamily="body"
        placeholderTextColor="gray.4"
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
        }}
        _focus={{
          bg: "gray.5",
          borderWidth: 1,
          borderColor: "green.500",
        }}
        rightElement={
          icon ? (
            <Icon as={Feather} name={icon} color="gray.4" size={22} p={5} />
          ) : (
            <></>
          )
        }
        {...rest}
      />
      <FormControl.ErrorMessage _text={{ color: "red.500" }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
