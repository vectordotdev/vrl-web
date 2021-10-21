import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";
import { Props } from "../lib/types/props";

export default function Main({ children }: Props) {
  const bg = useColorModeValue("gray.50", "gray.800");

  return <Box
    py={6}
    px={8}
    flex="1"
    bg={bg}
  >
    {children}
  </Box>
}