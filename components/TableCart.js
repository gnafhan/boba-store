import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
  Td,
  Button,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { MdOutlinePlusOne } from "react-icons/md";

export default function TableCart({ add, handleCart }) {
  let data = [];
  data = add;
  const [productQuantities, setProductQuantities] = useState(
    data.reduce((acc, item) => {
      acc[item] = data.filter((product) => product === item).length;
      return acc;
    }, {})
  );
  const [dataArray, setDataArray] = useState(data);
  handleCart(dataArray)
  useEffect(() => {
    // Update dataArray whenever productQuantities changes
    const updatedDataArray = Object.keys(productQuantities).flatMap(
      (productName) =>
        Array.from(
          { length: productQuantities[productName] },
          () => productName
        )
    );
    setDataArray(updatedDataArray);
  }, [productQuantities]);

  const handleIncrease = (productName) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productName]: prevQuantities[productName] + 1,
    }));
  };

  const handleDecrease = (productName) => {
    setProductQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [productName]: Math.max(0, prevQuantities[productName] - 1),
      };

      // Hapus produk dari state jika jumlahnya 0
      if (newQuantities[productName] === 0) {
        delete newQuantities[productName];
      }

      return newQuantities;
    });
  };
  return (
    <TableContainer>
      <Table size={{ base: "sm", md: "lg" }} variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Ammount</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.entries(productQuantities).map(([name, ammount]) => (
            <Tr>
              <Td>{name}</Td>
              <Td> {ammount}</Td>
              <Td>
                <Box justify="space-between">
                  <Button
                    color={useColorModeValue("white", "#1A202C")}
                    bg={useColorModeValue("#422AFB", "#B9A2FF")}
                    _hover={{ bg: useColorModeValue("#3311db", "#9374ff") }}
                    _active={{ bg: useColorModeValue("#2111a5", "#7551ff") }}
                    rounded={"full"}
                    size="sm"
                    mr={2}
                    onClick={() => handleIncrease(name)}
                  >
                    <BiPlus />
                  </Button>
                  <Button
                    color={useColorModeValue("white", "#1A202C")}
                    bg={useColorModeValue("#422AFB", "#B9A2FF")}
                    _hover={{ bg: useColorModeValue("#3311db", "#9374ff") }}
                    _active={{ bg: useColorModeValue("#2111a5", "#7551ff") }}
                    rounded={"full"}
                    size="sm"
                    mr={2}
                    onClick={() => handleDecrease(name)}
                  >
                    <BiMinus />
                  </Button>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export function Datata({props}){
    return props.data
}
