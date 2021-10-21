import { Box } from "@chakra-ui/layout";
import { Props } from "../lib/types/props";

export default function Main({ children }: Props) {
  return <Box
    p={4}
    flex="1"
    bgColor="gray.50"
  >
    {children}
  </Box>
}