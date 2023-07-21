import { Box, Button, Flex, Heading } from "@chakra-ui/react";

const UsersCard = ({image, username, role, email}) => {
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
                "url(https://bit.ly/dan-abramov)",
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
              >
                Action
              </Button>
            </Flex>
          </Box>
        </Flex>
        </Box>
    </>
  );
};

export default UsersCard;
