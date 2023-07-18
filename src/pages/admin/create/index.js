import { Box, Button, ChakraProvider, FormControl, FormHelperText, FormLabel, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useToast, Text, Link } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import AdminAuth from '../../../../utils/AdminAuth';

export async function getServerSideProps() {
  try {

    // Mengambil data dari API menggunakan axios atau metode lainnya
    
    // Mendapatkan data dari response
    const data = null
    const bearer= process.env.BEARER_AUTH
    
    // Mengembalikan data sebagai props
    return {
      props: {
        bearer

      },
    };
  } catch (error) {
    console.error(error);
    
    // Mengembalikan props kosong jika terjadi kesalahan
    return {
      props: {
        data: [],
      },
    };
  }
}
const Home=({bearer})=> {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [showToast, setShowToast] = useState(false);
    const router = useRouter()
    const toast = useToast()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/create', { name: name, description: description, price: price, image:image}, {headers:{Authorization:bearer}});

          
            router.push({pathname: '/admin', query: {create: 'success'} })
            // Lakukan apa yang perlu dilakukan setelah sukses mengirim data
          } catch (error) {
            console.error(error);
            toast({
              title: 'Error',
              description: 'Terjadi kesalahan saat mengirim form',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            // Lakukan apa yang perlu dilakukan jika terjadi kesalahan
          }

          
    }

            
  return (
    <ChakraProvider>
      
      <form onSubmit={handleSubmit}>
        <Box height="100vh" display="flex" alignItems="center" justifyContent="center"  width = "50%" mx='auto'>
        
        <FormControl   size='md' border="1px solid #E2E8F0" p={4} borderRadius='10px'>
            <Link href="/admin" textDecoration='none'><Text>Back</Text></Link>
            <FormLabel alignItems="center" justifyContent="center" width = "50%" mx='auto' display='flex' fontSize={25}>Create Form</FormLabel>

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

export default AdminAuth(Home)