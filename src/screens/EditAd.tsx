import { HeaderBack } from "@components/HeaderBack";
import {
  Heading,
  VStack,
  Text,
  Box,
  Icon,
  HStack,
  Radio,
  ScrollView,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { Input } from "@components/Form/Input";
import { useState } from "react";
import { Switch } from "@components/Switch";
import { Checkbox } from "@components/Checkbox";
import { Button } from "@components/Form/Button";
import { Textarea } from "@components/Form/Textarea";

export function EditAd() {
  const [value, setValue] = useState("new");
  return (
    <VStack flex={1}>
      <HeaderBack title="Editar anúncio" />
      <ScrollView px={8}>
        <VStack>
          <Heading fontFamily="bold" fontSize="sm" color="gray.2">
            Imagens
          </Heading>
          <Text mt={2} fontFamily="regular" fontSize="sm" color="gray.3">
            Escolha até 3 imagens para mostrar o quando o seu produto é
            incrível!
          </Text>
          <Box
            mt={2}
            bg="gray.5"
            h={100}
            w={100}
            alignItems="center"
            justifyContent="center"
            borderRadius="sm"
          >
            <Icon as={Feather} name="plus" color="gray.4" size={6} />
          </Box>
        </VStack>
        <VStack my={4}>
          <Heading my={4} fontFamily="bold" fontSize="sm" color="gray.2">
            Sobre o produto
          </Heading>
          <Input placeholder="Título do anúncio" />
          <Textarea placeholder="Descrição do produto" numberOfLines={5} />
        </VStack>
        <HStack>
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="product type"
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue);
            }}
          >
            <Radio value="new" my={1}>
              Produto novo
            </Radio>
            <Radio value="old" my={1}>
              Produto usado
            </Radio>
          </Radio.Group>
        </HStack>
        <VStack my={4}>
          <Heading my={4} fontFamily="bold" fontSize="sm" color="gray.2">
            Venda
          </Heading>
          <Input placeholder="Valor do produto" />
        </VStack>
        <VStack my={4}>
          <Heading my={4} fontFamily="bold" fontSize="sm" color="gray.2">
            Aceita troca?
          </Heading>
          <Switch />
        </VStack>
        <VStack my={4}>
          <Heading my={4} fontFamily="bold" fontSize="sm" color="gray.2">
            Meios de pagamento aceitos
          </Heading>
          <Checkbox value="test" text="Boleto" />
          <Checkbox value="test" text="Pix" />
          <Checkbox value="test" text="Dinheiro" />
          <Checkbox value="test" text="Cartão de Crédito" />
          <Checkbox value="test" text="Depósito Bancário" />
        </VStack>
      </ScrollView>
      <VStack p={6} justifyContent="space-around" alignItems="center">
        <Button mb={2} icon="power" title="Reativar anúncio" variant="solid" />
        <Button icon="trash" title="Excluir anúncio" variant="subtle" />
      </VStack>
    </VStack>
  );
}
