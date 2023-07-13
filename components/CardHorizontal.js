import { Image, Card, Stack, CardBody, Heading, Text, CardFooter, Button } from "@chakra-ui/react"

export const CardHorizontal = () =>{
    return(
        <Card
  direction={{ base: 'row' }}
  overflow='hidden'
  variant='outline' 
  size="sm"
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '100px' }}
    src='https://i.ibb.co/Xsmx4Kv/1.png'
    alt='Caffe Latte'
  />

  <Stack>
    <CardBody>
      <Heading size='md'>The perfect latte</Heading>

      <Text py='2'>
        Caffè latte is a coffee beverage of Italian origin made with espresso
        and steamed milk.
      </Text>
    </CardBody>

    <CardFooter>
      <Button variant='solid' colorScheme='blue'>
        Buy Latte
      </Button>
    </CardFooter>
  </Stack>
</Card>
    )
}