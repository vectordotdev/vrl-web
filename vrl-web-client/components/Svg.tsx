import { Box } from "@chakra-ui/layout";
import { Props } from "../lib/types/props";

export default function Svg({ children }: Props) {
  return <Box
    as="svg"
    role="img"
    h={12}
    w="auto"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 322 119.2"
  >
    {children}
  </Box>
}