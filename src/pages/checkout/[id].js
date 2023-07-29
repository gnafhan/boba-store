import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  Image,
  Skeleton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Outfit, Quicksand, Poppins } from "next/font/google";
import Fixed from "../../../components/Fixed";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
const outfitBold = Outfit({ subsets: ["latin"] });
const quicksandBold = Quicksand({ subsets: ["latin"], weight: "700" });
const poppinsBold = Poppins({ subsets: ["latin"], weight: "700" });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });
const poppinshalf = Poppins({ subsets: ["latin"], weight: "500" });
export async function getServerSideProps(context) {
  try {
    const { id } = context.query;
    const response = await axios.post(
      "http://localhost:3000/api/checkout/get",
      { id: id }
    );
    const data = response.data;

    if (!data._id) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        data: [],
      },
    };
  }
}

const Checkout = ({ data }) => {
  if (!data) {
    return null;
  }

  const [loading, setLoading] = useState(true);
  const [tax, setTax] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (data) {
      setTax(data.price * (10 / 100));
      setTotal(data.price * (10 / 100) + data.price);
      setLoading(false);
    }
  }, []);

  const router = useRouter();
  return (
    <>
      <Fixed />
      <Container maxW="container.sm">
        <Flex
          //   alignItem="center"
          justifyContent={"center"}
          flexDirection={"column"}
          my={{ base: "50px" }}
        >
          <Box align="center">
            <Text
              className={outfitBold.className}
              pb={"40px"}
              fontSize={50}
              color={useColorModeValue("#422AFB", "white")}
            >
              Boba
            </Text>
          </Box>
          <Box align="start" pt={"40px"}>
            <Text
              className={poppinsBold.className}
              color={"rgb(12, 20, 90)"}
              fontSize="32px"
            >
              Checkout
            </Text>
            <Text
              mt={2}
              className={outfitBold.className}
              fontSize={"xl"}
              color={"rgb(12, 20, 90)"}
            >
              Waktunya menikmati boba yang menyegarkan
            </Text>
          </Box>
          <Flex py={"50px"} flexDirection={"row"}>
            <Image
              src={data.image}
              width={"200px"}
              height={"130px"}
              objectFit={"cover"}
              p={3}
              border={"solid 3px"}
              borderColor={useColorModeValue("rgb(12, 20, 90)", "white")}
              borderRadius={"1.625rem"}
              backgroundColor="white"
            />
            <Box ml={"26px"} mt={"10px"}>
              {loading ? (
                <>
                  <Skeleton height={"25px"} width={"100px"} />
                </>
              ) : (
                <>
                  <Text
                    className={poppinsBold.className}
                    color={"rgb(12, 20, 90)"}
                    fontSize="25px"
                  >
                    {data.name}
                  </Text>
                </>
              )}
              {loading ? (
                <>
                  <Skeleton mt={"10px"} height={"20px"} width={"200px"} />
                </>
              ) : (
                <>
                  <Text
                    className={outfitBold.className}
                    fontSize={{ base: "md", md: "xl" }}
                    color={"#7E8CAC"}
                  >
                    {data.description}
                  </Text>
                </>
              )}
            </Box>
          </Flex>
          <hr />
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
                Item
              </Text>
              {loading ? (
                <>
                  <Skeleton height={"25px"} width={"100px"} />
                </>
              ) : (
                <>

              <Text
                className={poppinshalf.className}
                fontSize={"xl"}
                color={"rgb(12, 20, 90)"}
              >
                {data.name}
              </Text>
                </>
              )}
            </Flex>
            <Flex justifyContent={"space-between"} mb={"20px"}>
              <Text
                className={poppins.className}
                fontSize={"18px"}
                color={"rgb(12, 20, 90)"}
              >
                Price
              </Text>
              {loading ? (
                <>
                  <Skeleton height={"25px"} width={"100px"} />
                </>
              ) : (
                <>
              <Text
                className={poppinshalf.className}
                fontSize={"xl"}
                color={"rgb(12, 20, 90)"}
              >
                {`Rp ${data.price.toLocaleString('id-ID')}`}
              </Text>

                </>
              )}
            </Flex>
            <Flex justifyContent={"space-between"} mb={"20px"}>
              <Text
                className={poppins.className}
                fontSize={"18px"}
                color={"rgb(12, 20, 90)"}
              >
                Tax 10%
              </Text>
              {loading ? (
                <>
                  <Skeleton height={"25px"} width={"100px"} />
                </>
              ) : (
                <>
              <Text
                className={poppinshalf.className}
                fontSize={"xl"}
                color={"rgb(12, 20, 90)"}
              >
                {`Rp ${tax.toLocaleString('id-ID')}`}
              </Text>

                </>
              )}
            </Flex>
            <Flex justifyContent={"space-between"} mb={"20px"}>
              <Text
                className={poppins.className}
                fontSize={"18px"}
                color={"rgb(12, 20, 90)"}
              >
                Total
              </Text>
              {loading ? (
                <>
                  <Skeleton height={"25px"} width={"100px"} />
                </>
              ) : (
                <>

              <Text
                className={poppinshalf.className}
                fontSize={"xl"}
                color={"rgb(12, 20, 90)"}
              >
                {`Rp ${total.toLocaleString('id-ID')}`}
              </Text>
                </>
              )}
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
                  maxWidth={"200px"}
                  className={poppins.className}
                  variant={"outline"}
                  href={"/auth/signIn"}
                  color={useColorModeValue("white", "#1A202C")}
                  bg={useColorModeValue("#422AFB", "#B9A2FF")}
                  _hover={{ bg: useColorModeValue("#3311db", "#9374ff") }}
                  _active={{ bg: useColorModeValue("#2111a5", "#7551ff") }}
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

export default Checkout;
