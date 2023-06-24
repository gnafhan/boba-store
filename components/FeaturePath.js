import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Icon,
    Stack,
    Text,
    GridItem,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { ReactElement } from 'react';
  import {
    FcAbout,
    FcApproval,
    FcAssistant,
    FcCollaboration,
    FcDonate,
    FcManager,
    FcPlus,
    FcShipped,
  } from 'react-icons/fc';

  import { Outfit, Quicksand } from 'next/font/google';
  
  const outfit = Outfit({subsets:['latin']})
  const quicksand = Quicksand({subsets:['latin']})

  
  const Card = ({ heading, description, icon, href }) => {
    return (
      <Box
        maxW={{ base: 'full', md: '275px' }}
        w={'full'}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={5}>
        <Stack align={'start'} spacing={2}>
          <Flex
            w={16}
            h={16}
            align={'center'}
            justify={'center'}
            color={'white'}
            rounded={'full'}
            bg={useColorModeValue('gray.100', 'gray.700')}>
            {icon}
          </Flex>
          <Box mt={2}>
            <Heading className={outfit.className} size="md">{heading}</Heading>
            <Text className={quicksand.className}fontWeight={600} mt={1} fontSize={'sm'}>
              {description}
            </Text>
          </Box>
          {/* <Button className={quicksand.className} variant={'link'} colorScheme={'blue'} size={'sm'}>
            Selengkapnya
          </Button> */}
        </Stack>
      </Box>
    );
  };
  
  export default function Feature() {
    return (
      <Box px={4} py={20} bg={useColorModeValue('gray.100', 'gray.700')} >
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
          <Heading className={outfit.className} color={''} fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
            Kenapa <span style={{color:useColorModeValue('#422AFB', '#B9A2FF')}}>Boba?</span>
          </Heading>
          <Text  className={quicksand.className}fontWeight={600} fontSize={{ base: 'sm', sm: 'lg' }}>
            Boba, toko boba kami, berkomitmen pada bahan berkualitas dan konsistensi rasa yang tinggi. Boba menjadi tujuan bagi pecinta boba yang mencari rasa lezat dan memuaskan.
          </Text>
        </Stack>
  
        <Container maxW={'5xl'} mt={12}>
          <Flex flexWrap="wrap" gridGap={6} justify="center">
            <Card
              heading={'Rasa Berkualitas'}
              icon={<Icon as={FcApproval} w={10} h={10} />}
              className={outfit.className}
              description={
                  'Rasa yang berkualitas dan konsisten sejak 1990.'
                }
              href={'#'}
            />
            <Card
              heading={'Ramah Dikantong'}
              className={outfit.className}
              icon={<Icon as={FcDonate} w={10} h={10} />}
              description={
                  'Harga yang terjangkau dan ramah dikantong.'
                }
              href={'#'}
            />
            <Card
              heading={'Bahan berkualitas'}
              className={outfit.className}
              icon={<Icon as={FcShipped} w={10} h={10} />}
              description={
                  'Bahan berkualitas dibeli langsung dari produsennya.'
                }
              href={'#'}
            />
            <Card
              heading={'Kustomisasi'}
              className={outfit.className}
              icon={<Icon as={FcPlus} w={10} h={10} />}
              description={
                  'Kustomisasi yang luas, mulai dari topping hingga rasa.'
                }
              href={'#'}
            />
                <Card
                  heading={'Pelayanan Ramah'}
                  className={outfit.className}
                  icon={<Icon as={FcAssistant} w={10} h={10} />}
                  description={
                    'Pelayanan yang ramah dan membuat customer nyaman.'
                  }
                  href={'#'}
                />
          </Flex>
        </Container>
      </Box>
    );
  }