import React from "react";
import { Center, Box, Heading, Input, Text, Button } from "@chakra-ui/react";

export const ResetPassword: React.FC = () => {
  return (
    <Center h={"100vh"}>
      <Box w={{ base: "100%", md: "500px" }}>
        <Heading>Reset Password</Heading>
        <Box>
          <Text>New Password :</Text>
          <Input type={"password"} placeholder={"New Password"} />
        </Box>
        <Box>
          <Text>Repeat Password :</Text>
          <Input type={"password"} placeholder={"Repeat Password"} />
        </Box>
        <Button>Change password</Button>
      </Box>
    </Center>
  );
};
