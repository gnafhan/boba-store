import axios from "axios";
import { ColorModeSwitcher } from "../../../components/ColorModeSwitcher";
import Fixed from "../../../components/Fixed";
import CardFront from "../../../components/CardFront";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Cart } from "../../../components/Cart";
import { Suspense, useState } from "react";
import { CardHorizontal } from "../../../components/CardHorizontal";
import LargeWithNewsletter from "../../../components/Footer";
import { useEffect } from "react";
import Spinner from "../../../components/Loader";
import TableCart from "../../../components/TableCart";
import UserAuth from "../../../utils/UserAuth";

export async function getServerSideProps() {
  try {
    // Mengambil data dari API menggunakan axios atau metode lainnya
    const response = await axios.get("http://localhost:3000/api/get", {headers:{Authorization:process.env.BEARER_AUTH}});

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

const CardSm = ({ data, addCount }) => {
  return (
    <>
      {data.map((item) => (
        <Box key={item._id}>
          <CardHorizontal
            name={item.name}
            desc={item.description}
            price={item.price}
            image={item.image}
            addCount={() => addCount(item.name)}
          />
        </Box>
      ))}
    </>
  );
};

const CardMd = ({ data, addCount }) => {
  return (
    <>
      {data.map((item) => (
        <Box key={item._id}>
          <CardFront
            name={item.name}
            desc={item.description}
            price={item.price}
            image={item.image}
            addCount={() => addCount(item.name)}
          />
        </Box>
      ))}
    </>
  );
};

const ApiDataPage =({ data })=> {
  // Gunakan useBreakpointValue dari Chakra UI untuk mendapatkan nilai breakpoint saat ini
  const breakpoint = useBreakpointValue({ base: "sm", sm: "sm", md: "md" });
  const { isOpen, onOpen, onClose } = useDisclosure();

  // State untuk menentukan apakah saat ini merupakan breakpoint SM atau MD
  const [isSM, setIsSM] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItem, setCartItem] = useState([]);

  const handleCart = (x) => {
    setCartItem(x);
  };
  useEffect(() => {
    if (data.length > 0) {
      setTimeout(() => {
        setIsLoading(false); // Set loading state to false when data is available
      }, 1500);
    }
  }, [data]);
  useEffect(() => {
    // Set state isSM berdasarkan breakpoint saat ini
    setIsSM(breakpoint === "sm");
  }, [breakpoint]);

  const addCount = (x) => {
    setCartItem([...cartItem, x]);
  };
  return (
    <div>
      {isLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <Box onClick={onOpen}>
            <Cart count={cartItem.length} />
          </Box>
          <Modal
            size={"xl"}
            closeOnOverlayClick={true}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create your account</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={3}>
                <TableCart handleCart={handleCart} add={cartItem} />
              </ModalBody>
              <ModalFooter>
                <Button
                  color={useColorModeValue("white", "#1A202C")}
                  bg={useColorModeValue("#422AFB", "#B9A2FF")}
                  _hover={{ bg: useColorModeValue("#3311db", "#9374ff") }}
                  _active={{ bg: useColorModeValue("#2111a5", "#7551ff") }}
                  mr={3}
                >
                  Checkout
                </Button>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Fixed />
          <Box
            p={3}
            mt={2}
            display={"flex"}
            flexDirection={"row"}
            flexWrap={"wrap"}
            alignItems={"center"}
            justifyContent={{ base: "center", lg: "start" }}
            gap={{ base: 5, md: 10 }}
            align={"center  "}
            mx={{ base: 3, md: 10 }}
          >
            {isLoading ? ( // Display spinner when loading
              <>
                <Spinner size="xl" />
              </>
            ) : isSM ? (
              <CardSm data={data} addCount={addCount} />
            ) : (
              <CardMd data={data} addCount={addCount} />
            )}
          </Box>
          <Box mt={10}>
            <LargeWithNewsletter />
          </Box>
        </>
      )}
    </div>
  );
}


export default UserAuth(ApiDataPage)