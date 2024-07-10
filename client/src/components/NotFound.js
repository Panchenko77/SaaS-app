import React from "react";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      textAlign="center"
      py={10}
      px={6}
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="black"
    >
      <VStack spacing={4}>
        <Heading
          display="inline-block"
          as="h1"
          size="4xl"
          bgGradient="linear(to-r, yellow.400, yellow.500)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color={"gray.500"} mb={6}>
          The page you're looking for does not seem to exist.
        </Text>
        <Button
          as={Link}
          to="/"
          colorScheme="yellow"
          bgGradient="linear(to-r, yellow.400, yellow.500, yellow.600)"
          color="white"
          variant="solid"
        >
          Go to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFound;
