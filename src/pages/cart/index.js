import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Outfit, Quicksand, Poppins } from "next/font/google";
import Fixed from "../../../components/Fixed";
import { useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Spinner from "../../../components/Loader";
import { useState } from "react";
import { useRouter } from "next/router";
import AdminAuth from './../../../utils/AdminAuth';
const outfitBold = Outfit({ subsets: ["latin"] });
const quicksandBold = Quicksand({ subsets: ["latin"], weight: "700" });
const poppinsBold = Poppins({ subsets: ["latin"], weight: "700" });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });
const poppinshalf = Poppins({ subsets: ["latin"], weight: "500" });

export async function getServerSideProps() {
  const bearer = process.env.BEARER_AUTH;

  return {
    props: {
      bearer,
    },
  };
}

const Checkout = ({ bearer }) => {
  const [cartItem, setCartItem] = useState([]);
  const[totalPrice, setTotalPrice] = useState(0)
  const[tax, setTax] = useState(0)
  const[totalWithTax, setTotalWithTax] = useState(0)
  const[totalQuantity, setTotalQuantity] = useState(  )
  const[isLoading, setIsLoading] = useState(true)
  const { data: session, status } = useSession();
  const router = useRouter()
  useEffect(() => {
    if (!status || status === "loading") {
      return; // Show a spinner or loading state if session data is not available yet
    }

    // Fetch cart data from the server
    const fetchCart = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/cart/get",
          { email: session.user.email },
          {
            headers: {
              Authorization: bearer,
            },
          }
        );
        setCartItem(response.data.products);
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, [status, bearer]);

  useEffect(() => {
    // Calculate total price whenever cart items change
    let total = 0;
    let quantity = 0
    cartItem.forEach((item) => {
      total += item.totalHarga
      quantity += item.jumlah
    });
    let tax = total /10
    let withTax = total + tax
    setTotalPrice(total.toLocaleString('id-ID'));
    setTax(tax.toLocaleString("id-ID"));
    setTotalQuantity(quantity)
    setTotalWithTax(withTax.toLocaleString("id-ID"));
  }, [cartItem]);


  if (!status || status === "loading") {
    return <Spinner />;
  }
  if (isLoading) {
    return <Spinner />;
  }








  return (
    <>
      <Fixed />
      <Container maxW="container.sm">
        <Flex
          alignItem="center"
          justifyContent={"center"}
          flexDirection={"column"}
          mb={{ base: "50px" }}
        >
          <Box align="center">

          </Box>
          <Box align="start" pt={"40px"}>
            <Text
              className={poppinsBold.className}
              color={"rgb(12, 20, 90)"}
              fontSize="32px"
            >
              Cart
            </Text>
            <Text
              mt={2}
              className={outfitBold.className}
              fontSize={"xl"}
              color={"rgb(12, 20, 90)"}
              mb={"25px"}
            >
              Waktunya checkout pesananmu
            </Text>
          </Box>
          {cartItem.map((item) =>(
          <Flex py={"25px"} flexDirection={"row"}>
            <Image
              src={item.gambar}
              width={"200px"}
              height={"130px"}
              maxW={{ base: "130px", md: "none" }}
              objectFit={"cover"}
              p={3}
              border={"solid 3px"}
              borderColor={useColorModeValue("rgb(12, 20, 90)", "white")}
              borderRadius={"1.625rem"}
              backgroundColor="white"
            />
            <Box ml={"26px"}>
              <Text
                className={poppinsBold.className}
                color={"rgb(12, 20, 90)"}
                fontSize="25px"
              >
                {item.nama}
              </Text>
              <Text
                className={outfitBold.className}
                fontSize={{ base: "md", md: "xl" }}
                color={"#7E8CAC"}
              >
                {`Quantity: ${item.jumlah}`}
              </Text>
              <Text
                className={outfitBold.className}
                fontSize={{ base: "md", md: "xl" }}
                color={"#7E8CAC"}
              >
                {`Price: ${item.harga}`}
              </Text>
              <Text
                className={outfitBold.className}
                fontSize={{ base: "md", md: "xl" }}
                color={"#7E8CAC"}
              >
                {`Total Price: ${item.totalHarga}`}

              </Text>
            </Box>
          </Flex>
          ))}
          <Box mt="50px" as={"hr"} />
          <Flex py={"50px"} flexDirection={"column"}>
            <Text
              className={poppinsBold.className}
              color={"rgb(12, 20, 90)"}
              fontSize="20px"
              mb="20px"
            >
              Purchase Details
            </Text>
            <Flex justifyContent={"space-between"} mb={"20px"}>
              <Text
                className={poppins.className}
                fontSize={"18px"}
                color={"rgb(12, 20, 90)"}
              >
                Order ID
              </Text>
              <Text
                className={poppinshalf.className}
                fontSize={"xl"}
                color={"rgb(12, 20, 90)"}
              >
                {" "}
                #12712
              </Text>
            </Flex>
            <Flex justifyContent={"space-between"} mb={"20px"}>
              <Text
                className={poppins.className}
                fontSize={"18px"}
                color={"rgb(12, 20, 90)"}
              >
                Item Quantity
              </Text>
              <Text
                className={poppinshalf.className}
                fontSize={"xl"}
                color={"rgb(12, 20, 90)"}
              >
                {" "}
                {totalQuantity}
              </Text>
            </Flex>
            <Flex justifyContent={"space-between"} mb={"20px"}>
              <Text
                className={poppins.className}
                fontSize={"18px"}
                color={"rgb(12, 20, 90)"}
              >
                Price
              </Text>
              <Text
                className={poppinshalf.className}
                fontSize={"xl"}
                color={"rgb(12, 20, 90)"}
              >
                {" "}
                {totalPrice }
              </Text>
            </Flex>
            <Flex justifyContent={"space-between"} mb={"20px"}>
              <Text
                className={poppins.className}
                fontSize={"18px"}
                color={"rgb(12, 20, 90)"}
              >
                Tax 10%
              </Text>
              <Text
                className={poppinshalf.className}
                fontSize={"xl"}
                color={"rgb(12, 20, 90)"}
              >
                {" "}
                {tax}
              </Text>
            </Flex>
            <Flex justifyContent={"space-between"} mb={"20px"}>
              <Text
                className={poppins.className}
                fontSize={"18px"}
                color={"rgb(12, 20, 90)"}
              >
                Total
              </Text>
              <Text
                className={poppinshalf.className}
                fontSize={"xl"}
                color={"rgb(12, 20, 90)"}
              >
                {" "}
                {totalWithTax}
              </Text>
            </Flex>
          </Flex>
          <Flex flexDir={"column"}>
            <FormControl flexDir={"column"}>
              <Flex flexDir={"column"}>
                <Checkbox borderColor={"rgb(12, 20, 90)"} size={"lg"}>
                  <Text
                    className={poppinshalf.className}
                    color={"rgb(12, 20, 90)"}
                  >
                    Send receipt to my email
                  </Text>
                </Checkbox>
                <Button
                  mt={"50px"}
                  fontSize={"md"}
                  fontWeight={600}
                  maxWidth={{ base: "none", md: "200px" }}
                  className={poppins.className}
                  variant={"outline"}
                  href={"/auth/signIn"}
                  color={useColorModeValue("white", "#1A202C")}
                  bg={useColorModeValue("#422AFB", "#B9A2FF")}
                  _hover={{ bg: useColorModeValue("#3311db", "#9374ff") }}
                  _active={{ bg: useColorModeValue("#2111a5", "#7551ff") }}
                  borderRadius="full"
                >
                  Confirm and pay
                </Button>
              </Flex>
            </FormControl>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default AdminAuth(Checkout);
