import React from "react";
import { Box, Center, Input, Button, Heading } from "@chakra-ui/react";
import { useLoginMutation } from "../../generated/graphql";
import { Error } from "../../components";

export const Login: React.FC = () => {
  const [login] = useLoginMutation();
  const [error, SetError] = React.useState("");
  const [form, SetForm] = React.useState<any>({});

  const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
    SetForm({
      ...form,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleLogin = () => {
    if (!form || !form.email || !form.password) {
      SetError("Missing informations !");
      return;
    }
    login({
      variables: {
        email: form.email,
        password: form.password,
      },
    }).then((res) => {
      console.log("login response => ", res);
      if (!res.data) {
        SetError("Somethin g went wrong !");
      } else if (!res.data.login.status) {
        SetError(res.data.login.message as string);
      }
    });
  };

  return (
    <Box h={"100vh"}>
      <Center h={"100vh"}>
        <Box w={{ md: "20%", base: "100%" }}>
          <Heading mb={"15px"}>Login</Heading>
          {error ? <Error text={error} /> : null}
          <Input
            id="email"
            mb={"10px"}
            placeholder={"Email"}
            type={"email"}
            variant={"filled"}
            onChange={(e) => handleForm(e)}
          />
          <Input
            mb={"10px"}
            placeholder={"Password"}
            type={"password"}
            variant={"filled"}
            id="password"
            onChange={(e) => handleForm(e)}
          />
          <Button onClick={handleLogin} variant={"solid"}>
            {" "}
            Login{" "}
          </Button>
        </Box>
      </Center>
    </Box>
  );
};
