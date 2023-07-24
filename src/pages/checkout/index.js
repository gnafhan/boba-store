import { Box, Container, Flex, Heading, Text, useColorModeValue} from "@chakra-ui/react";
import { Inter, Outfit, Quicksand, Poppins } from 'next/font/google'
const outfitBold = Outfit({subsets:['latin']})
const quicksandBold = Quicksand({subsets:['latin'], weight:'700'})
const poppinsBold = Poppins({subsets:['latin'], weight:'700'})


const Checkout = ()=>{
    return(
        <Container maxW="container.sm" >
            <Flex  alignItem="center" justifyContent={"center"} flexDirection={"column"}>
            <Box align="center">
            <Text
              className={outfitBold.className}
              mt={{base:"100px"}}
              pb={"40px"}
              fontSize={50}
              color={useColorModeValue('#422AFB', 'white')}>
              Boba
            </Text>

            </Box>
            <Box align="start" pt={"40px"}>
                <Text
                className={poppinsBold.className}
                color={"rgb(12, 20, 90)"}
                fontSize="32px"
                >Checkout</Text>
                <Text
                mt={2}
                className={outfitBold.className}
                fontSize={"xl"}
                color={"rgb(12, 20, 90)"}
                >Waktunya menikmati boba yang menyegarkan</Text>
            </Box>
            </Flex>
        </Container>
    )
};

export default Checkout