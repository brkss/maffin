import React from "react";
import { Box, Center, Heading, Button } from "@chakra-ui/react";
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
