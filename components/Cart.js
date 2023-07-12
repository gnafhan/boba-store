import {
  useColorMode,
  useColorModeValue,
  IconButton,
  Card,
  CardBody,
  Text,
  Box,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

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

          
    </Box>
    </>
  );
};
