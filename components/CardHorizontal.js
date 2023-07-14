import { Image, Card, Stack, CardBody, Heading, Text, CardFooter, Button, useColorModeValue, Box} from "@chakra-ui/react"
import { Quicksand, Outfit } from "next/font/google";

const quicksand = Quicksand({ subsets: ["latin"] });
const outfitBold = Outfit({ subsets: ["latin"], weight:"600" });
const outfit = Outfit({ subsets: ["latin"] })

export const CardHorizontal = ({name, desc, image, price, addCount}) =>{
    const localnumber = price
    return(
        <Card
  direction={{ base: 'row' }}
  overflow='hidden'
  variant='outline' 
  size="sm"
  maxW={"sm"}
  maxH={"xs"}
  justify="start"
  shadow={"md"}
>
  <Image
    objectFit='cover'
    maxW="90px"
    maxH="150px"
    src={image}
    alt={desc}
  />

  <Stack>
    <CardBody>
      <Text color={useColorModeValue("#422AFB", "#B9A2FF")} className={outfit.className} fontWeight={''} align={"start"} fontSize={"md"}>
       {localnumber.toLocaleString('id-ID', { useGrouping: true })}
      </Text>
      <Heading className={outfitBold.className} align="start" size='sm'>{name}</Heading>

      <Text className={outfit.className} align={"start"} fontSize={"sm"}>
        {desc}
      </Text>
    <Box p={"12px"} pt={"5px"} pb={0} pl={0} gap={4} align="start" justify={'space-around'} justifyContent={"space-around"}>

    <Button
        size={"sm"} mr={3}
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
            size={'sm'}
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
    </Box>
    </CardBody>
  </Stack>

</Card>
    )
}