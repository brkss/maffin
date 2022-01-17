import React from "react";
import {
  Box,
  Center,
  Heading,
  Button,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentSuccess } from "./Success";

export const Checkout: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, SetLoading] = React.useState(false);
  const [paid, SetPaid] = React.useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }
    SetLoading(true);
    const res = await stripe!.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement) as any,
    });
    SetLoading(false);
    if (!res.error) SetPaid(true);
    console.log("res => ", res);
  };

  if (paid) {
    return <PaymentSuccess />;
  }

  return (
    <Center h={"100vh"}>
      <Box w={"300px"}>
        <SimpleGrid mb={"10px"} columns={2} spacing={7}>
          <Box cursor={"pointer"} p={"10px"} bg={"#faf2ff"} rounded={"7px"}>
            <Text fontWeight={"bold"} fontSize={"18px"}>
              Basic Plan
            </Text>
            <Text>29.99 USD</Text>
          </Box>
          <Box cursor={"pointer"} p={"10px"} bg={"#faf2ff"} rounded={"7px"}>
            <Text fontWeight={"bold"} fontSize={"18px"}>
              Basic Plan
            </Text>
            <Text>29.99 USD</Text>
          </Box>
        </SimpleGrid>
        <form onSubmit={handleSubmit}>
          <CardElement className={"light"} />
          <Button
            size={"sm"}
            loadingText={"submiting..."}
            isLoading={loading}
            type={"submit"}
            disabled={!stripe || !elements}
          >
            Pay
          </Button>
        </form>
      </Box>
    </Center>
  );
};
