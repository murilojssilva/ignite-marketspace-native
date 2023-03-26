import { Image, IImageProps } from "native-base";

type UserPhotoProps = IImageProps & {
  size: number;
  type: "me" | "forms";
};

export function UserPhoto({ size, type = "forms", ...rest }: UserPhotoProps) {
  return (
    <Image
      h={size}
      w={size}
      rounded="full"
      borderWidth={type === "me" ? 5 : 2}
      borderColor={type === "me" ? "blue.light" : "gray.5"}
      {...rest}
    />
  );
}
