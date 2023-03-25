import { Image, IImageProps } from "native-base";

const IMAGE_SIZE = 24;

type Props = IImageProps & {
  uri: string;
};

export function ImageFormPreview({ uri, ...rest }: Props) {
  return (
    <Image
      w={IMAGE_SIZE}
      h={IMAGE_SIZE}
      mr={2}
      mt={4}
      borderRadius={8}
      source={{ uri: uri }}
      alt="imagem do produto"
      resizeMode="cover"
      {...rest}
    />
  );
}
