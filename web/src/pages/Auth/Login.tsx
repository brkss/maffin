import React from "react";
import { Box, Center, Input, Button, Heading } from "@chakra-ui/react";

export const Login: React.FC = () => {
  return (
    <Box h={"100vh"}>
      <Center h={"100vh"}>
        <Box>
          <Heading mb={"15px"}>Login</Heading>
          <Input
            mb={"10px"}
            placeholder={"Email"}
            type={"email"}
            variant={"filled"}
          />
          <Input
            mb={"10px"}
            placeholder={"Password"}
            type={"password"}
            variant={"filled"}
          />
          <Button variant={"solid"}> Login </Button>
        </Box>
      </Center>
    </Box>
  );
};
