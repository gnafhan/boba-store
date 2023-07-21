import { Box, Flex } from "@chakra-ui/react";
import NavbarAdmin from "../../../../components/NavbarAdmin";
import UsersCard from "../../../../components/UsersCard";
import { ColorModeSwitcher } from "../../../../components/ColorModeSwitcher";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

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
  const [search,setSearch] = useState("")
  const [filtered, setFiltered] = useState(data)

  useEffect(() => {
    setFiltered(data.filter((item)=>item.username.toLowerCase().includes(search.toLowerCase())))
  }, [search])
  return (
    <>
    <ColorModeSwitcher/>
      <NavbarAdmin search={search} setFiltered={setFiltered} setSearch={setSearch} active={1} />
      <Flex flexDirection={"row"} flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"} align="center">
        {filtered.map((item)=>{return (
          <div key={item.username}>

            <UsersCard username={item.username} role={item.role}/>
          </div>
        )
        })}
      </Flex>
    </>
  );
};

export default AdminUser;
