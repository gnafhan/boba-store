import { Box, Flex } from "@chakra-ui/react";
import NavbarAdmin from "../../../../components/NavbarAdmin";
import UsersCard from "../../../../components/UsersCard";
import { ColorModeSwitcher } from "../../../../components/ColorModeSwitcher";
import axios from "axios";

export async function getServerSideProps() {
  try {
    // Mengambil data dari API menggunakan axios atau metode lainnya
    const response = await axios.get(
      "http://localhost:3000/api/users/get",

      //add current session
      {
        headers: {
          Authorization: process.env.BEARER_AUTH,
        },
        withCredentials: true,
      }
    );

    // Mendapatkan data dari response
    const data = response.data;
    console.log(data)
    const bearer = process.env.BEARER_AUTH;

    // Mengembalikan data sebagai props
    return {
      props: {
        data,
        bearer,
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

const AdminUser = ({data}) => {
  return (
    <>
    <ColorModeSwitcher/>
      <NavbarAdmin active={1} />
      <Flex flexDirection={"row"} flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"} align="center">
        {data.map((item)=>{return (
          <UsersCard username={item.username} role={item.role}/>
        )
        })}
      </Flex>
    </>
  );
};

export default AdminUser;
