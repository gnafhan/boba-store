import { GridItem, Grid, Spacer } from "@chakra-ui/react"

export const GridBox = () => {
    return (
        <div>
            <Grid templateColumns='repeat(8, 1fr)' gap={2}>
  <GridItem colStart={2} w='100%' h='10' bg='blue.500' />
  <Spacer/>
  <GridItem colStart={6} w='100%' h='10' bg='blue.500' />
  <Spacer/>
</Grid>
        </div>
    )
}