import {
  useColorMode,
  useColorModeValue,
  IconButton,
  Card,
  CardBody,
  Text,
  Box,
  Center,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { Quicksand, Outfit } from "next/font/google";

const quicksand = Quicksand({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] })

export const Cart = (props) => {
  return (
    <>
    <Box
            right="4"
            bottom="4"
            position="fixed"
            zIndex="overlay"
    >
      <IconButton
        size="lg"
        fontSize="lg"
        variant="solid"
        borderRadius="full"
        color={useColorModeValue('white', '#1A202C')}
        bg={useColorModeValue('#422AFB', '#B9A2FF')}
        _hover={{ bg: useColorModeValue('#3311db', '#9374ff') }}
        _active={{ bg: useColorModeValue('#2111a5', '#7551ff') }}

        icon={<FaShoppingCart />}
      />
      <Box
      display={""}
      position={"fixed"}
      right="6"
      bottom="10"
      bg="crimson"
      //make it square
      w="0.9rem"
      h="0.9rem"
      rounded={"full"}
      
      >
      <Center>
        <Text className={outfit.className} fontSize={"12px"} mt={"-2px"} color="white">{props.count}</Text>
        </Center> 
        </Box>

          
    </Box>
    </>
  );
};
