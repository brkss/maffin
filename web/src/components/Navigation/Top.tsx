import React from "react";
import { Box, Container, Grid, GridItem } from "@chakra-ui/react";

export const TopNavigation: React.FC = () => {
  return (
    <Box>
      <Container>
        <Grid templateColumns="repeat(12, 1fr)">
          <GridItem colSpan={6}>
            <p>N</p>
          </GridItem>
          <GridItem colSpan={6}>
            <p>N</p>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};
