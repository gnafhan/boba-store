import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Button,
    Icon,
    IconProps,
    useColorModeValue,
    Image,
    Box,
  } from '@chakra-ui/react';

  import { Outfit } from 'next/font/google';
  import { Quicksand } from 'next/font/google';
import Confetti from './Confetti';
  
  const outfit = Outfit({subsets:['latin']})
  const quicksand = Quicksand({subsets:['latin']})
  export default function CallToActionWithIllustration() {
    return (
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 17 }}
          >
          <Heading
            className={outfit.className}
            fontWeight={600}
            fontSize={{ base: '4xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            <Text className={outfit.className}>
            Nikmati Minuman Boba <br/>

            </Text>

            <Text className={outfit.className} as={'span'} color={useColorModeValue('#422AFB', '#B9A2FF')}>
            Terlezat dari Seluruh Dunia
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}
          className={quicksand.className}
          fontWeight={600}
          >
          Welcome to our boba tea shop, where we offer the best and most delicious drinks in town! Our carefully crafted menu features a wide range of classic and creative flavors, made from the freshest and highest quality ingredients.
          </Text>
          <Stack spacing={6} direction={'row'}>
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'orange'}
              bg={useColorModeValue('#422AFB', '#B9A2FF')}
              _hover={{bg: useColorModeValue('#3311db', '#9374ff')}}
              _active={{bg: useColorModeValue('#2111a5', '#7551ff'),}}
              className={quicksand.className}
              >
              Beli Sekarang
            </Button>
            <Button
            className={quicksand.className}
            
            rounded={'full'} px={6} >
              Lihat Produk
            </Button>
          </Stack>
          <Flex w={'full'}>
            {/* <Illustration
              height={{ sm: '24rem', lg: '28rem' }}
              mt={{ base: 12, sm: 16 }}
            /> */}

            <Image
          width="100%"
          viewBox="0 0 702 448"
          fill="none"
          height={{ sm: '24rem', lg: '28rem' }}
          objectFit={'contain'}
          xmlns="http://www.w3.org/2000/svg"
           src={'asset1.png'} />

            
          </Flex>
        </Stack>
        

      </Container>
    );
  }
  
  export const Illustration = (props) => {
    return (
      
        <Image
          width="100%"
          viewBox="0 0 702 448"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props} src={'asset1.png'} />
        
      
    );
  };