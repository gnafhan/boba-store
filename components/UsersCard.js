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
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

const UsersCard = ({image, username, role, item, bearer, setCall}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()
  const router = useRouter()
  const [showToast, setShowToast] = useState(false);

  
  useEffect(() => {
    const { create, deleted, edit } = router.query;

    if (create === "success" && !showToast) {
      toast.closeAll();
      toast({
        title: "Sukses",
        description: "Form berhasil disubmit",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setShowToast(true);
    }

    if (deleted === "success" && !showToast) {
      toast.closeAll();
      toast({
        title: "Sukses",
        description: "Form berhasil dihapus",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setShowToast(true);
    }

    if (edit === "success" && !showToast) {
      toast.closeAll();
      toast({
        title: "Sukses",
        description: "Form berhasil diedit",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setShowToast(true);
    }
  }, [router.query, showToast, toast]);



  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/users/delete`,
        {
          email: item.email,
        },
        { headers: { Authorization: bearer } }
      );
      onClose();
      console.log(response);
      router.reload()
      toast.closeAll();
      toast({
        title: "Sukses",
        description: "Form berhasil diedit",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setShowToast(true);
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
    // Efek samping hanya akan dieksekusi saat button diklik
    console.log('Halaman direload karena tombol diklik');
  }, [router.asPath]);

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
              <Button colorScheme="red" mr="auto" onClick={handleDelete}>
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
