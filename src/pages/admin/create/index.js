import { Box, Button, ChakraProvider, FormControl, FormHelperText, FormLabel, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

export default function Home() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('name: ', name)
        console.log('description: ', description)
        console.log('price: ', price)
        console.log('image: ', image)

        try {
            const response = await axios.post('http://localhost:3000/api/create', { name: name, description: description, price: price, image:image});
            console.log(response.data);
            // Lakukan apa yang perlu dilakukan setelah sukses mengirim data
          } catch (error) {
            console.error(error);
            // Lakukan apa yang perlu dilakukan jika terjadi kesalahan
          }
    }

            
  return (
    <ChakraProvider>
      
        <form onSubmit={handleSubmit}>
        <Box height="100vh" display="flex" alignItems="center" justifyContent="center"  width = "50%" mx='auto'>
        
        <FormControl   size='md' border="1px solid #E2E8F0" p={4} borderRadius='10px'>
            <FormLabel mt={3}>Name</FormLabel>
            <Input size='md' type='text' onChange={(e) => setName(e.target.value)}  />
            <FormHelperText>Nama dari minuman yang baru</FormHelperText>
            
            <FormLabel mt={3}>Description</FormLabel>
            <Input size='md' type='text' onChange={(e) => setDescription(e.target.value)} />
            <FormHelperText>Deskripsi dari minuman yang baru</FormHelperText>

            <FormLabel  mt={3}>Price</FormLabel>
            <NumberInput max={1000000} min={0} >
            <NumberInputField  onChange={(e) => setPrice(e.target.value)}/>
                <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <FormHelperText>Harga dari minuman yang baru</FormHelperText>

            <FormLabel mt={3}>Link Image</FormLabel>
            <Input size='md' type='text' onChange={(e) => setImage(e.target.value)} />
            <FormHelperText>Link gambar dari minuman yang baru</FormHelperText>
            <Button
            mt={4}
            colorScheme='teal'
            type='submit'
          >
            Submit
          </Button>
        </FormControl>
      </Box>
        </form>
    </ChakraProvider>
  );
}
