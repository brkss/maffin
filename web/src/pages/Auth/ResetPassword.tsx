import React from "react";
import {
  Center,
  Box,
  Heading,
  Input,
  Text,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { RouteComponentProps } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useVerifyResetTokenMutation } from "../../generated/graphql";

export const ResetPassword: React.FC<RouteComponentProps<any>> = ({
  match,
}) => {
  const [loading, SetLoading] = React.useState(true);
  const history = useHistory();
  const [verifyResetToken] = useVerifyResetTokenMutation();

  // verify token
  React.useEffect(() => {
    const _token = match.params.token;
    verifyResetToken({
      variables: {
        token: _token,
      },
    }).then((res) => {
      console.log("res >>> ", res);
      if (!res || !res.data || !res.data.verifyResetToken) {
        history.push("/login");
        return;
      }
      SetLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Center h={"100vh"}>
        <Spinner />
      </Center>
    );
  }

  //console.log("token ->>>>> ", match.params.token);

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
