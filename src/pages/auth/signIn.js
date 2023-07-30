import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { getProviders, signIn, useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SimpleCard({ providers }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const getSession = ()=>{
    const {data:session} = useSession()
    return session

  }
  
  
    const handleSignIn = async (e) => {
      e.preventDefault();

    // Reset previous error message
    setError("");
    setLoading(true);

    try {
      // Call the signIn function from next-auth
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false, // We will handle the redirect manually after successful login
      });

      if (response.error) {
        // If signIn returned an error, display the error message
        console.log(response.error)
        setError(response.error);
      } else if (response.ok) {

        // if admin redirect to /admin
     router.push('/')

      }
    } catch (err) {
      console.error(err)
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
    };
  
    return (
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        {/* ... Your existing JSX ... */}
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                isLoading={loading}
                onClick={handleSignIn}
              >
                Sign in
              </Button>
              {error && (
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          )}
              {/* Providers */}
              {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button onClick={() => signIn(provider.id)}>
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Flex>
    );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);


    return { redirect: { destination: "/catalogue" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
