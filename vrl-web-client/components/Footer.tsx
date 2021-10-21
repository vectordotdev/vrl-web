import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Text } from "@chakra-ui/layout";

export default function Footer() {
  const bg = useColorModeValue("gray.100", "black");

  return <Box
    p={4}
    bgColor={bg}
  >
    <Text
      color="white"
    >
      Footer
    </Text>
  </Box>
}