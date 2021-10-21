import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Link, Text } from "@chakra-ui/layout";

export default function Footer() {
  const serverUrl: string = process.env.VRL_WEB_SERVER_ADDRESS;

  const bg = useColorModeValue("gray.100", "black");
  const color = useColorModeValue("black", "white");

  return <Box
    py={6}
    px={8}
    bgColor={bg}
  >
    <Text
      color={color}
      fontSize="lg"
    >
      Brought to you with 💜 by the Vector team at Datadog.
      VRL Web server running at <Link fontWeight="bold" href={serverUrl} isExternal>{serverUrl}</Link>.
    </Text>
  </Box>
}