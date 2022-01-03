import React from "react";
import { Center, Box, Button, Input, Text, Heading } from "@chakra-ui/react";

export const ForgetPassword: React.FC = () => {
  return (
    <Center h={"100vh"}>
      <Box>
        <Heading fontSize={"28px"}>Reset Password</Heading>
        <Box marginTop={"7px"}>
          <Text fontWeight={"bold"}>Email :</Text>
          <Input placeholder={"Email"} variant={"filled"} />
          <Button mt={"10px"} size={"sm"}>
            Send
          </Button>
        </Box>
      </Box>
    </Center>
  );
};
