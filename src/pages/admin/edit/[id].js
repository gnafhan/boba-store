import { useRouter } from 'next/router';
import axios from 'axios';
import { Box, Button, ChakraProvider, FormControl, FormHelperText, FormLabel, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useToast, Text, Link } from '@chakra-ui/react';


export async function getServerSideProps() {
    try {
      // Mengambil data dari API menggunakan axios atau metode lainnya
      const response = await axios.get('http://localhost:3000/api/get');
      
      // Mendapatkan data dari response
      const data = response.data;
      
      // Mengembalikan data sebagai props
      return {
        props: {
          data,
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

export default function AdminEdit ({data}){
    const router = useRouter();
  const { id } = router.query;

    return (
        <>
        {data.map((item) =>{
            if(item._id == id){
                return(
                    <>
                    <form onSubmit={''}>
        <Box height="100vh" display="flex" alignItems="center" justifyContent="center"  width = "50%" mx='auto'>
        
        <FormControl   size='md' border="1px solid #E2E8F0" p={4} borderRadius='10px'>
            <Link href="/admin" textDecoration='none'><Text>Back</Text></Link>
            <FormLabel alignItems="center" justifyContent="center" width = "50%" mx='auto' display='flex' fontSize={25}>Edit Form</FormLabel>

            <FormLabel mt={3}>Name</FormLabel>
            <Input size='md' type='text' placeholder={item.name} defaultValue={item.name}  />
            <FormHelperText>Nama dari minuman yang mau diedit</FormHelperText>
            
            <FormLabel mt={3}>Description</FormLabel>
            <Input size='md' type='text' defaultValue={item.description}  />
            <FormHelperText>Deskripsi dari minuman yang mau diedit</FormHelperText>

            <FormLabel  mt={3}>Price</FormLabel>
            <NumberInput max={1000000} min={0} defaultValue={item.price}>
            <NumberInputField  />
                <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <FormHelperText>Harga dari minuman yang mau diedit</FormHelperText>

            <FormLabel mt={3}>Link Image</FormLabel>
            <Input size='md' type='text' defaultValue={item.image} />
            <FormHelperText>Link gambar dari minuman yang mau diedit</FormHelperText>
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
                    </>
                )
            }
        })}
        </>
    )
}