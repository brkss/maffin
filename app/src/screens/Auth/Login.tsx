import React from "react";
import { View, Text, StyleSheet } from "react-native";
//import { Input } from "../..";
import { Input, Center, Heading, Container, Button } from "native-base";
import { useLoginMutation } from "../../generated/graphql";
import { setAccessToken } from "../../utils";

export const Login: React.FC = () => {
  const [login] = useLoginMutation();
  const [loading, SetLoading] = React.useState(false);
  const [error, SetError] = React.useState("");
  const [form, SetForm] = React.useState({
    email: "",
    password: "",
  });

  const handleForm = (val: string, key: string) => {
    SetForm({
      ...form,
      [key]: val,
    });
  };

  const handleLogin = () => {
    if (!form.email || !form.password) {
      // error : missing data !
      SetError("Missing Fields");
      return;
    }
    SetError("");
    SetLoading(true);
    login({
      variables: {
        email: form.email,
        password: form.password,
      },
    }).then((res) => {
      SetLoading(false);
      if (!res || !res.data || res.errors) {
        // error
        SetError("Somnething went wrong !");
      } else if (!res.data.login.status) {
        SetError(res.data.login.message || "Somnething went wrong");
      } else if (res.data.login.status && res.data.login.token) {
        // login successfuly !!
        const _token = res.data.login.token;
        setAccessToken(_token);
      }
      console.log("Login Response => ", res);
    });
  };

  return (
    <Center w={"100%"} flex={1}>
      <Container w={"100%"}>
        <Heading mb={"10px"}>Login </Heading>
        <Input
          value={form.email}
          w={"100%"}
          size={"md"}
          variant={"filled"}
          placeholder={"Email"}
          onChangeText={(val) => handleForm(val, "email")}
        />
        <Input
          value={form.password}
          w={"100%"}
          size={"md"}
          secureTextEntry={true}
          variant={"filled"}
          mt={"10px"}
          placeholder={"Password"}
          onChangeText={(val) => handleForm(val, "password")}
        />
        <Button
          onPress={() => handleLogin()}
          colorScheme="dark"
          mt={"10px"}
          isLoading={loading}
          variant={"subtle"}
        >
          Login
        </Button>
      </Container>
    </Center>
  );
};
