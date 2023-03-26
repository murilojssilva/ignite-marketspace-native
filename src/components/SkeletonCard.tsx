import { Skeleton, ISkeletonProps, Box, VStack } from "native-base";

type ISkeletonCardProps = ISkeletonProps;

export function SkeletonCard({ ...rest }: ISkeletonCardProps) {
  return (
    <Box>
      <Skeleton
        m={5}
        w={120}
        h={100}
        rounded="lg"
        startColor="gray.500"
        endColor="gray.400"
        {...rest}
      />

      <VStack>
        <Skeleton
          mx={5}
          w={120}
          h={2}
          rounded="lg"
          startColor="gray.500"
          endColor="gray.400"
          {...rest}
        />
        <Skeleton
          my={2}
          mx={5}
          w={120}
          h={3}
          rounded="lg"
          startColor="gray.500"
          endColor="gray.400"
          {...rest}
        />
      </VStack>
    </Box>
  );
}
