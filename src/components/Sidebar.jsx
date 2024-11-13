import React from "react";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "../routes/path";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  VStack,
  HStack,
  Button,
  Text,
  Divider,
  Avatar,
  Box,
} from "@chakra-ui/react";
import { StarIcon, QuestionIcon } from "@chakra-ui/icons";

const Sidebar = ({ isOpen, onClose, username = "USER1" }) => {
  const navigate = useNavigate();

  const handleBookmark = () => {
    navigate(RouterPath.bookmark);
    onClose();
  };

  const handleMyAccount = () => {
    navigate(RouterPath.myAccount);
    onClose();
  };

  const handleHowtouse = () => {
    alert("개발예정");
  };
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody p={0}>
          <VStack align="stretch" spacing={0}>
            {/* User Profile Section */}
            {/* <Box p={4} bg="gray.100"> */}
            <Box p={4}>
              <VStack align="center" spacing={2}>
                <Avatar size="lg" name={username} />
                <Text fontWeight="bold">{username}</Text>
                <HStack>
                  <Button
                    size="sm"
                    colorScheme="orange"
                    variant="solid"
                    onClick={handleMyAccount}
                  >
                    mypage
                  </Button>
                  {/* <Button size="sm" colorScheme="gray" variant="outline"> */}
                  <Button size="sm" colorScheme="gray" variant="solid">
                    log out
                  </Button>
                </HStack>
              </VStack>
            </Box>

            <Divider />

            <VStack align="stretch" spacing={0} pt={4}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<StarIcon />}
                onClick={handleBookmark}
                height="60px"
              >
                BOOKMARK
              </Button>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<QuestionIcon />}
                onClick={handleHowtouse}
                height="60px"
              >
                HOW TO USE
              </Button>
            </VStack>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
