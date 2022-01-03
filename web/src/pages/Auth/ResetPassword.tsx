import React from "react";
import { Center, Box, Heading, Input, Text, Button } from "@chakra-ui/react";
import { RouteComponentProps } from "react-router-dom";

export const ResetPassword: React.FC<RouteComponentProps<any>> = ({
  match,
}) => {
  console.log("token ->>>>> ", match.params.token);

  return (
    <Center h={"100vh"}>
      <Box w={{ base: "100%", md: "500px" }}>
        <Heading>Reset Password</Heading>
        <Box mt={"12px"}>
          <Text fontWeight={"bold"}>New Password :</Text>
          <Input
            variant={"filled"}
            type={"password"}
            placeholder={"New Password"}
          />
        </Box>
        <Box mt={"12px"}>
          <Text fontWeight={"bold"}>Repeat Password :</Text>
          <Input
            variant={"filled"}
            type={"password"}
            placeholder={"Repeat Password"}
          />
        </Box>
        <Button mt={"12px"}>Change password</Button>
      </Box>
    </Center>
  );
};
