import axios from 'axios';
import { ColorModeSwitcher } from '../../../components/ColorModeSwitcher';
import Fixed from '../../../components/Fixed';
import CardFront from '../../../components/CardFront';
import { Box } from '@chakra-ui/react';
import { Cart } from '../../../components/Cart';

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

export default function ApiDataPage({ data }) {
  return (
    <div>
      <Cart/>
      <Fixed/>
      <Box p={10} display={"flex"} flexDirection={"row"} flexWrap={'wrap'} gap={10} align="center" mx={3} >

      {data.map((item) => (
        <div key={item._id}>

          <CardFront  name={item.name} desc={item.description} price={item.price} image={item.image}/>
        </div>
      ))}
      
      </Box>
      {/* Menggunakan data yang telah diambil */}
    </div>
  );
}
