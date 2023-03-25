import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  Input as NativeBaseInput,
  IInputProps,
  Box,
  FormControl,
  Icon,
  Text,
} from "native-base";
import { Feather } from "@expo/vector-icons";

type InputProps = IInputProps & {
  errorMessage?: string;
  isPassword?: boolean;
};

export function Input({
  type = "text",
  isPassword = false,
  errorMessage,
  isInvalid,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [typeText, setTypeText] = useState<"password" | "text">("password");

  const invalid = !!errorMessage || isInvalid;

  function handlePasswordView() {
    setShowPassword(!showPassword);
    setTypeText(showPassword ? "password" : "text");
  }

  return (
    <FormControl isInvalid={invalid}>
      <Box
        w="full"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <NativeBaseInput
          bg="gray.7"
          borderWidth="0"
          px="4"
          h="12"
          fontFamily="regular"
          fontSize="md"
          placeholderTextColor="gray.4"
          color="gray.1"
          isInvalid={invalid}
          _invalid={{
            borderColor: "red_light",
            borderWidth: 1,
          }}
          _focus={{
            bg: "gray.7",
            borderWidth: 1,
            borderColor: "gray.1",
          }}
          type={type === "password" && !showPassword ? "password" : "text"}
          {...rest}
        />
        {isPassword &&
          (typeText === "password" ? (
            <TouchableOpacity
              onPress={handlePasswordView}
              style={{
                position: "absolute",
                right: 16,
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              <Icon as={Feather} color="gray.1" name="eye" size={18} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handlePasswordView}
              style={{
                position: "absolute",
                right: 16,
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              <Icon as={Feather} name="eye-off" color="gray.1" size={18} />
            </TouchableOpacity>
          ))}
      </Box>
      <FormControl.ErrorMessage paddingLeft={4} mt={1} color="red_light">
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
