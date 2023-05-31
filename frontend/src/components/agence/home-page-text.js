import React from "react"; 
import { Heading, Text } from "@chakra-ui/react";

const HomePageText = () => {
  return (
    <>

      <Heading size={"2xl"} >
        <h1 id="btext"><span>Vous chercher </span>à  louer une voiture</h1>  
      </Heading>
      <Text pr={"10%"} id="stext">
        Ou vous êtes une agence et vous recherchez des clients.
      </Text>
    </>
  );
};

export default HomePageText;
