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
import { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { MdOutlinePlusOne } from "react-icons/md";

export default function TableCart() {
  const data = ["Tea", "Coffee", "Tea", "Milk", "Squash"]
  const [productQuantities, setProductQuantities] = useState(
    data.reduce((acc, item) => {
      acc[item] = data.filter((product) => product === item).length;; // Set jumlah produk awal ke 1
      return acc;
    }, {})
  );

  const handleIncrease = (productName) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productName]: prevQuantities[productName] + 1,
    }));
  };

  const handleDecrease = (productName) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productName]: Math.max(0, prevQuantities[productName] - 1),
    }));
}
  return (
    <TableContainer>
      <Table size={{base:"sm", md:"lg"}} variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th >Ammount</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
        {Object.entries(productQuantities).map(([name, ammount]) => (
                   <Tr>
                   <Td>{name}</Td>
                   <Td > {ammount}</Td>
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
                         onClick={()=>handleIncrease(name)}
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
                         onClick={()=>handleDecrease(name)}
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
