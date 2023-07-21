// import { Box, Flex, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  HStack,
  VStack,
  CloseButton,
  Heading,
  Tabs,
  TabList,
  Tab,
  Spacer,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { BiHome } from "react-icons/bi";
import { BsFillBellFill, BsFillCameraVideoFill, BsInbox } from "react-icons/bs";
import { IoLogoCodepen } from "react-icons/io5";
import { MdOutlineInbox, MdOutlineMenu } from "react-icons/md";

const NavbarAdmin = ({active}) => {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  return (
    <Box shadow="md">
      <Box
        bg={bg}
        borderColor="gray.600"
        borderBottomWidth={1}
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={4}
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack spacing={4} display="flex" alignItems="center">
            <Box
              display={{
                base: "inline-flex",
                md: "none",
              }}
            >
              <IconButton
                display={{
                  base: "flex",
                  md: "none",
                }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{
                  color: "inherit",
                }}
                variant="ghost"
                icon={<MdOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  justifySelf="self-start"
                  onClick={mobileNav.onClose}
                />
                <Button w="full" variant="ghost" leftIcon={<BiHome />}>
                  Dashboard
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  leftIcon={<BsFillCameraVideoFill />}
                >
                  Videos
                </Button>
              </VStack>
            </Box>
            <Box
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              <IoLogoCodepen mr={2}/>
              <Text>Admin Dashboard</Text>
            </Box>
          </HStack>
          <HStack spacing={3} display="flex" alignItems="center">
            <HStack
              spacing={3}
              display={{
                base: "none",
                md: "inline-flex",
              }}
            >
              <Button variant="ghost" leftIcon={<BiHome />} size="sm">
                Dashboard
              </Button>

              <Button
                variant="ghost"
                leftIcon={<BsFillCameraVideoFill />}
                size="sm"
              >
                Videos
              </Button>
            </HStack>
            <Link
              p={3}
              color="gray.800"
              _dark={{
                color: "inherit",
              }}
              rounded="sm"
              _hover={{
                color: "gray.800",
                _dark: {
                  color: "gray.600",
                },
              }}
            >
              <BsFillBellFill />
            </Link>

            <Avatar
              size="sm"
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />
          </HStack>
        </Flex>
      </Box>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mx={2}
        borderWidth={0}
        overflowX="auto"
      >
        <Tabs defaultIndex={active} borderBottomColor="transparent">
          <TabList>
            <Tab
              py={4}
              m={0}
              _focus={{
                boxShadow: "none",
              }}
              as={"a"}
              href="/admin"
              textDecor={"none"}
            >
              Products
            </Tab>
            <Tab
              py={4}
              m={0}
              _focus={{
                boxShadow: "none",
              }}
              as={"a"}
              href="/admin/users"
            >
              Users
            </Tab>
            <Tab
              py={4}
              m={0}
              _focus={{
                boxShadow: "none",
              }}  
            >
              Order
            </Tab>
            <Tab
              py={4}
              m={0}
              _focus={{
                boxShadow: "none",
              }}
            >
              Usage
            </Tab>
            <Tab
              py={4}
              m={0}
              _focus={{
                boxShadow: "none",
              }}
            >
              Billing
            </Tab>{" "}
          </TabList>
        </Tabs>
        <Spacer />
        <HStack spacing={3} alignItems="center">
          <InputGroup
            display={{
              base: "none",
              lg: "block",
            }}
            ml="auto"
          >
            <InputLeftElement pointerEvents="none">
              <SearchIcon />
            </InputLeftElement>
            <Input type="tel" placeholder="Search..." />
          </InputGroup>
        </HStack>
      </Flex>
    </Box>
  );
};

export default NavbarAdmin;
