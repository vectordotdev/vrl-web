import { Flex } from "@chakra-ui/layout";
import React from "react";
import { Props } from "../lib/types/props";
import Footer from "./Footer";
import Main from "./Main";
import Navbar from "./Navbar";

export default function Layout({ children }: Props) {
  return <Flex
    minH="100vh"
    direction="column"
  >
    <Navbar />

    <Main children={children} />

    <Footer />
  </Flex>
}