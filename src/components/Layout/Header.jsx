import React from "react";
import { Box, Flex, Text, IconButton, useDisclosure } from "@chakra-ui/react";
import { RouterPath } from "../../routes/path";
import { useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import Sidebar from "../Sidebar";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleHome = () => {
    navigate(RouterPath.home);
  };

  return (
    <Box>
      <Flex
        bg="white"
        h="60px"
        alignItems="center"
        justifyContent="space-between"
        boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
        px={4}
      >
        <IconButton
          icon={<HamburgerIcon />}
          variant="ghost"
          onClick={onOpen}
          aria-label="Open Menu"
        />
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="orange.500"
          onClick={handleHome}
        >
          Hareubang
        </Text>
        <Box w="40px" />
      </Flex>

      <Sidebar isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
