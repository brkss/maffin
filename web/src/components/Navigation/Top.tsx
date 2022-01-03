import React from "react";
import { Box, Text, Grid, GridItem, Button } from "@chakra-ui/react";

export const TopNavigation: React.FC = () => {
  const logout = () => {};

  return (
    <Box p={"5px 10px"} bg={"gray.50"}>
      <Grid templateColumns="repeat(12, 1fr)">
        <GridItem colSpan={6}>
          <Text fontWeight={"bold"}>Maffin</Text>
        </GridItem>
        <GridItem colSpan={6} textAlign={"right"}>
          <Button size={"sm"}>Logout</Button>
        </GridItem>
      </Grid>
    </Box>
  );
};
