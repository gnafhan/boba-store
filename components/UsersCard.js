import { CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Stack,
  Divider,
  ButtonGroup,
  Image,
  Box,
  ChakraProvider,
  useToast,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Text,
  CardFooter,
  Heading,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Lorem,
  ModalFooter,
  Flex
} from "@chakra-ui/react";
import { useState } from "react";

const UsersCard = ({image, username, role, item}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedData, setSelectedData] = useState(null);

  return (
    <>
    <Box 
    mt={4}
    mx={"auto"}
    >

        <Flex
          direction="column"
          justifyContent="center"
          w="sm"
          alignItems={"center"}
        >
          <Box
            bg="gray.300"
            h={64}
            w={64}
            rounded="full"
            shadow="md"
            border={"10px teal solid"}
            bgSize="cover"
            bgPos="center"
            style={{
              backgroundImage:
                `url(${image})`,
            }}
          ></Box>

          <Box
            w={{
              base: 56,
              md: 64,
            }}
            bg="white"
            _dark={{
              bg: "gray.800",
            }}
            mt={-10}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
          >
            <Heading
            size={"Xs"}
              py={2}
              textAlign="center"
              fontWeight="bold"
              textTransform="uppercase"
              color="gray.800"
              _dark={{
                color: "white",
              }}
              letterSpacing={1}
            >
              {username}
            </Heading>

            <Flex
              alignItems="center"
              justifyContent="space-between"
              py={2}
              px={3}
              bg="gray.200"
              _dark={{
                bg: "gray.700",
              }}
            >
              <Box
                fontWeight="bold"
                color="gray.800"
                _dark={{
                  color: "gray.200",
                }}
              >
                {role}
              </Box>
              <Button
                fontSize="xs"
                fontWeight="bold"
                px={5}
                py={1}
                rounded="lg"
                textTransform="uppercase"
                colorScheme="teal"
                onClick={onOpen}
              >
                Action
              </Button>
            </Flex>
          </Box>
        </Flex>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button colorScheme="yellow" mr="auto" onClick={"handleEdit"}>
                <EditIcon mr={2} /> Edit
              </Button>
              <Button colorScheme="red" mr="auto" onClick={"handleDelete"}>
                <DeleteIcon mr={2} />
                Delete
              </Button>
              <Button colorScheme="blue" ml="auto" onClick={onClose}>
                <CloseIcon></CloseIcon> Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </>
  );
};

export default UsersCard;
