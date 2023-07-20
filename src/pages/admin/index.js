import { Icon, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import { AddIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import AdminAuth from "./../../../utils/AdminAuth";
import { getSession, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import NavbarAdmin from "../../../components/NavbarAdmin";

export async function getServerSideProps() {
  try {
    // Mengambil data dari API menggunakan axios atau metode lainnya
    const response = await axios.get(
      "http://localhost:3000/api/get",

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
    const bearer = process.env.BEARER_AUTH;
    ("");

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

const AdminIndex = ({ data, bearer }) => {
  const toast = useToast();
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedData, setSelectedData] = useState(null);

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

  const handleAction = (data) => {
    setSelectedData(data);
    onOpen();
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/delete`,
        {
          id: selectedData._id,
        },
        { headers: { Authorization: bearer } }
      );
      onClose();
      router.push({ pathname: "/admin", query: { deleted: "success" } });
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

  const handleEdit = () => {
    router.push({ pathname: `/admin/edit/${selectedData._id}` });
  };

  const handleCreate = () => {
    router.push({ pathname: `/admin/create` });
  };

  const renderImage = (imageUrl) => {
    const isValidImageUrl =
      imageUrl.endsWith(".png") || imageUrl.endsWith(".jpg");

    const finalImageUrl = isValidImageUrl
      ? imageUrl
      : "https://i.ibb.co/MSs80PY/2.png";

    return <Image src={finalImageUrl} alt="Image" borderRadius="lg" />;
  };

  return (
    <Box>
      <NavbarAdmin/>
      <Box ml="5%">
        <Box mt={10}>
          <Button colorScheme="teal" onClick={handleCreate}>
            <AddIcon mr={3} />
            Create
          </Button>
        </Box>
        <Box display="flex" flexWrap="wrap" justifyContent="flex-start" p={10}>
          {data.map((item) => {
            return (
              <Card key={item._id} maxW="sm" m={5}>
                <CardBody>
                  <div>{renderImage(item.image)}</div>
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{item.name}</Heading>
                    <Text>{item.description}</Text>
                    <Text color="blue.600" fontSize="2xl">
                      {item.price}
                    </Text>
                  </Stack>
                </CardBody>
                {/* <Divider /> */}
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button
                      variant="solid"
                      colorScheme="teal"
                      onClick={() => handleAction(item)}
                    >
                      Action
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            );
          })}
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedData && selectedData.name}</ModalHeader>
            <ModalBody>{selectedData && selectedData._id}</ModalBody>
            <ModalFooter>
              <Button colorScheme="yellow" mr="auto" onClick={handleEdit}>
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
      </Box>
    </Box>
  );
};

export default AdminAuth(AdminIndex);
