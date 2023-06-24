import { Box, Heading, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Outfit } from "next/font/google";

const outfit = Outfit({subsets:['latin']})

const LandingText = () => {
  return (
    <Box
      
      pt={120}
      pb={20}
    >
      <Heading as="h1" size="2xl" textAlign="center" color="white">
      <Text className={outfit.className} color={useColorModeValue('#120F43', 'white')}>
            Nikmati Minuman Boba <br/>Terlezat dari Seluruh Dunia
          </Text>
      </Heading>
      {/* <Box mt={10}>
      </Box> */}
    </Box>
  );
};

export default LandingText;