import { Alert } from "@chakra-ui/alert";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";

type Props = {
  children: JSX.Element;
}


export default function Layout({ children }: Props) {
  return <Flex
    minH="100vh"
    direction="column"
  >
    <Box
      p={4}
      bgColor="black"
    >
      <Text
        color="white"
      >
        Navbar
      </Text>
    </Box>

    <Box
      p={4}
      flex="1"
      bgColor="gray.50"
    >
      {children}
    </Box>

    <Box
      p={4}
      bgColor="black"
    >
      <Text
        color="white"
      >
        Footer
      </Text>
    </Box>
  </Flex>
}