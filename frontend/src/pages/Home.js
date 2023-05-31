import React from "react";

import { Container, Flex, VStack } from "@chakra-ui/react";
import HomePageText from "../components/agence/home-page-text";
import HomePageButton from "../components/agence/home-page-button";

function Home(){

    return(
        <div id="home">
             <Container overflow="hidden" maxWidth="1720px" px={[12, 8, 8]}> 
                <Flex h="100vh" marginLeft={70} rowGap={4} direction={"row"}>
                <VStack
                    alignItems="start"
                    justifyContent="center"
                    spacing={7}
                    px={[0, 12, 4, 8]}
                    h="full"
                >
                    <section id="hometext">
                        <HomePageText />
                        
                    </section>
                    
                    <HomePageButton />
                </VStack>
                </Flex>
            </Container>
              
        </div>
        
           );
}

export default Home;
