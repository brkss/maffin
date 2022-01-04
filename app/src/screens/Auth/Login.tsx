import React from "react";
import { View, Text, StyleSheet } from "react-native";
//import { Input } from "../..";
import { Input, Center, Heading, Container, Button } from "native-base";

export const Login: React.FC = () => {
  const [form, SetForm] = React.useState({
    email: "",
    password: "",
  });

  const handleForm = (val: string, key: string) => {
    console.log("val : ", val);
    SetForm({
      ...form,
      [key]: val,
    });
  };

  const handleLogin = () => {
    console.log("form : ", form);
  };
  return (
    <Center w={"100%"} flex={1}>
      <Container w={"100%"}>
        <Heading mb={"10px"}>Login</Heading>
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
          variant={"subtle"}
        >
          Login
        </Button>
      </Container>
    </Center>
  );
};
