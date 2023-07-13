import axios from "axios";
import { ColorModeSwitcher } from "../../../components/ColorModeSwitcher";
import Fixed from "../../../components/Fixed";
import CardFront from "../../../components/CardFront";
import { Box, Text, useBreakpointValue } from "@chakra-ui/react";
import { Cart } from "../../../components/Cart";
import { useState } from "react";
import { CardHorizontal } from "../../../components/CardHorizontal";

export async function getServerSideProps() {
  try {
    // Mengambil data dari API menggunakan axios atau metode lainnya
    const response = await axios.get("http://localhost:3000/api/get");

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
  const [cartItem, setCartItem] = useState([""]);
  const isMedium = useBreakpointValue({ base: false, md: true });
  const isSmall = useBreakpointValue({ base: true, sm: false });

  const addCount = (x) => {
    setCartItem([...cartItem, x]);
  };

  return (
    <div>
      <Cart />
      <Fixed />
      <Text align="center">{cartItem.length}</Text>
      <Box
        p={0}
        display={"flex"}
        flexDirection={"row"}
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={{base:3, md:10}}
        align="center"
        mx={{base:0, md:3}}
      >
        {isSmall?data.map((item) =>(<Box>
          <CardHorizontal/>
        </Box>)):null}
        {data.map((item) => (
          <div key={item._id}>
            <CardFront
              name={item.name}
              desc={item.description}
              price={item.price}
              image={item.image}
              addCount={() => addCount(item.name)}
            />
          </div>
        ))}
      </Box>
      {/* Menggunakan data yang telah diambil */}
    </div>
  );
}
