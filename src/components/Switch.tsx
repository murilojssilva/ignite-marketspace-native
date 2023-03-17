import { ISwitchProps, Switch as NativeBaseSwitch } from "native-base";

type SwitchProps = ISwitchProps;

export function Switch({ ...rest }: SwitchProps) {
  return (
    <NativeBaseSwitch
      size="md"
      offTrackColor="gray.6"
      onTrackColor="blue.light"
      onThumbColor="gray.6"
      offThumbColor="gray.7"
      _hover={{
        bg: "gray.2",
      }}
      {...rest}
    />
  );
}
