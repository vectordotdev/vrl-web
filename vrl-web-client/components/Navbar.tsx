import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Flex, Spacer } from "@chakra-ui/layout";
import { Button, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import VectorDarkIcon from "./icons/VectorDarkIcon";
import VectorLightIcon from "./icons/VectorLightIcon";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  const isDark = colorMode == "dark";
  const vectorIcon = isDark ? <VectorDarkIcon /> : <VectorLightIcon />;
  const colorModeIcon = isDark ?
    <SunIcon boxSize={5} color="yellow.500" /> :
    <MoonIcon boxSize={5} color="blue.600" />;

  const bg = useColorModeValue("gray.100", "black");

  return <Flex
    py={5}
    px={8}
    justifyContent="space-between"
    alignItems="center"
    bgColor={bg}
  >
    {vectorIcon}

    <Flex
      justifyContent="space-between"
      alignItems="center"
      
    >
      <IconButton
        size="md"
        aria-label="Color mode toggler"
        variant="ghost"
        icon={colorModeIcon}
        onClick={toggleColorMode}
      />

      <Spacer px={2} />

      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
        >
          Scenarios
        </MenuButton>

        <MenuList>
          <MenuItem>
            JSON
          </MenuItem>
          <MenuItem>
            Syslog
          </MenuItem>
          <MenuItem>
            Key/value
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  </Flex>
}