import { Button } from "@chakra-ui/button";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex, Text } from "@chakra-ui/layout";
import VectorDarkIcon from "./icons/VectorDarkIcon";
import VectorLightIcon from "./icons/VectorLightIcon";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  const icon = (colorMode == "light") ? <VectorLightIcon /> : <VectorDarkIcon />;

  const bg = useColorModeValue("gray.100", "black");

  return <Flex
    py={4}
    px={6}
    justifyContent="space-between"
    bgColor={bg}
  >
    {icon}

    <Button onClick={toggleColorMode}>
      Click me
    </Button>
  </Flex>
}