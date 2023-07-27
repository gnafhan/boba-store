import { Grid, GridItem } from "@chakra-ui/react";
import WithSubnavigation from "./Navbar";

export default function Fixed(){
    return(
        <Grid templateColumns='repeat(8, 1fr)' gap={2}>
            <GridItem colStart={{base: 0, md: 2}} colSpan={{base: 8, md: 6}}><WithSubnavigation/></GridItem>
        </Grid>
    )
  }