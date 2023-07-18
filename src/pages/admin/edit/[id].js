import { useRouter } from "next/router";
import axios from "axios";
import {
  Box,
  Button,
  ChakraProvider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useToast,
  Text,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AdminAuth from "../../../../utils/AdminAuth";

export async function getServerSideProps() {
  try {
    // Mengambil data dari API menggunakan axios atau metode lainnya
    const response = await axios.get("http://localhost:3000/api/get", {
      headers: {
        Authorization: process.env.BEARER_AUTH,
      },
    });

    // Mendapatkan data dari response
    const data = response.data;
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

const AdminEdit = ({ data, bearer }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const toast = useToast();
  const { id } = router.query;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/edit",
        {
          name: name,
          description: description,
          price: price,
          image: image,
          id: id,
        },
        {
          headers: {
            Authorization: bearer,
          },
        }
      );

      router.push({ pathname: "/admin", query: { edit: "success" } });
      // Lakukan apa yang perlu dilakukan setelah sukses mengirim data
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mengirim form",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      // Lakukan apa yang perlu dilakukan jika terjadi kesalahan
    }
  };

  useEffect(() => {
    data.map((x) => {
      if (x._id == id) {
        setName(x.name);
        setDescription(x.description);
        setPrice(x.price);
        setImage(x.image);
      }
    });
  }, []);

  return (
    <>
      {data.map((item) => {
        if (item._id == id) {
          return (
            <div key={item._id}>
              <form onSubmit={handleSubmit} key={item._id}>
                <Box
                  height="100vh"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="50%"
                  mx="auto"
                >
                  <FormControl
                    size="md"
                    border="1px solid #E2E8F0"
                    p={4}
                    borderRadius="10px"
                  >
                    <Link href="/admin" textDecoration="none">
                      <Text>Back</Text>
                    </Link>
                    <FormLabel
                      alignItems="center"
                      justifyContent="center"
                      width="50%"
                      mx="auto"
                      display="flex"
                      fontSize={25}
                    >
                      Edit Form
                    </FormLabel>

                    <FormLabel mt={3}>Name</FormLabel>
                    <Input
                      size="md"
                      type="text"
                      placeholder={item.name}
                      defaultValue={item.name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <FormHelperText>
                      Nama dari minuman yang mau diedit
                    </FormHelperText>

                    <FormLabel mt={3}>Description</FormLabel>
                    <Input
                      size="md"
                      type="text"
                      defaultValue={item.description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <FormHelperText>
                      Deskripsi dari minuman yang mau diedit
                    </FormHelperText>

                    <FormLabel mt={3}>Price</FormLabel>
                    <NumberInput
                      max={1000000}
                      min={0}
                      defaultValue={item.price}
                    >
                      <NumberInputField
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormHelperText>
                      Harga dari minuman yang mau diedit
                    </FormHelperText>

                    <FormLabel mt={3}>Link Image</FormLabel>
                    <Input
                      size="md"
                      type="text"
                      defaultValue={item.image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <FormHelperText>
                      Link gambar dari minuman yang mau diedit
                    </FormHelperText>
                    <Button mt={4} colorScheme="teal" type="submit">
                      Submit
                    </Button>
                  </FormControl>
                </Box>
              </form>
            </div>
          );
        }
      })}
    </>
  );
};

export default AdminAuth(AdminEdit);
