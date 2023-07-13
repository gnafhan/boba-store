import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Quicksand, Outfit } from "next/font/google";

const quicksand = Quicksand({ subsets: ["latin"] });
const outfitBold = Outfit({ subsets: ["latin"], weight:"600" });
const outfit = Outfit({ subsets: ["latin"] });

export default function CardFront({name, desc, price, image, addCount}) {
    const localnumber = price
    
  return (
    <Card  maxW="xs" minH="xl">
      <CardBody>
        <Image
          src={image}
          alt={desc}
          //   width="293px"
          //   height="205"
          borderRadius="lg"
        />
        <Stack
          mt="5"
          spacing="0"
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Box alignItems={"start"} justifyContent={"start"} align="start">
            <Text className={outfitBold.className} fontSize={"xl"}>{name}</Text>
            <Text className={outfit.className} align="start">{desc}</Text>
          </Box>
          <Text className={outfit.className} color={useColorModeValue("#422AFB", "#B9A2FF")} fontSize="xl">
            {localnumber.toLocaleString('id-ID', { useGrouping: true })}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing="3">
          <Button
            as={"a"}
            fontSize={"md"}
            fontWeight={600}
            color={useColorModeValue("white", "#1A202C")}
            bg={useColorModeValue("#422AFB", "#B9A2FF")}
            className={outfit.className}
            borderRadius={"full"}
            href={"#"}
            _hover={{ bg: useColorModeValue("#3311db", "#9374ff") }}
            _active={{ bg: useColorModeValue("#2111a5", "#7551ff") }}
          >
            Buy Now
          </Button>
          <Button
            as={"a"}
            fontSize={"md"}
            fontWeight={600}
            color={useColorModeValue("#422AFB", "#B9A2FF")}
            bg={useColorModeValue("white", "#1A202C")}
            className={quicksand.className}
            colorScheme={useColorModeValue("#422AFB", "#B9A2FF")}
            variant={"outline"}
            borderRadius={"full"}
            onClick={()=>{addCount()}}
            _hover={{
              bg: useColorModeValue("#f3f0ff", "#2e3046"),
            }}
            _active={{
              bg: useColorModeValue("#f3f0ff", "#403f5e"),
            }}
          >
            Add cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
