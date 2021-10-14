import { Box } from "@chakra-ui/layout";

type Props = {
  children: JSX.Element;
}

export default function Layout({ children }: Props) {
  return <Box p={4}>
    {children}
  </Box>
}