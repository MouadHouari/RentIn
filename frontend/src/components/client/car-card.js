import { useNavigate } from "react-router-dom";
import { Button, Heading, HStack, Image, Text, Box, Divider, SimpleGrid, GridItem, Stack} from "@chakra-ui/react";

const CarCard = ({ props }) => {
  const to_route = useNavigate();
  const navigate = (route) => {
    to_route(route);
  };

  function rentACar(e) {
    e.preventDefault();
    const data = {
      id: props.id,
      id_agence: props.agence_id,
    };
    navigate(`/réserver/${props.id}`, { state: data });
  }
  return (
    <div className="vehicle-card">
      <div className="details">
        <div className="thumb-gallery">
          <Box bg="gray.400" w="full" h="full">
            <Image
              className="first"
              objectFit="cover"
              h={"215px"}
              w={"full"}
              src={`http://localhost:8000${props.photo2}`}
            ></Image>
            <Image
              className="second"
              objectFit="cover"
              h={"215px"}
              w={"full"}
              src={`http://localhost:8000${props.photo1}`}
            ></Image>
          </Box>
        </div>

        <Box p={3} >
          <HStack alignItems="baseline" spacing={"auto"}>
            <Heading size={"md"} fontWeight="600">
              {props.modele} 
            </Heading>
            
            <HStack>
              <Text size={"md"} fontSize={"20"} fontWeight="450" color="gray.900">
                {props.annee} 
              </Text>
            </HStack>
            
          </HStack>
          <HStack alignItems="baseline" spacing={"auto"}> 
              <HStack alignItems="baseline">
              <Text fontSize={"13"} color="lightslategray">ville :</Text>
                <Text fontSize={"17"} fontWeight="500" color="gray.600">
                  {props.ville} 
                </Text>
              </HStack>
              <HStack alignItems="baseline" py={3}>
                <Text fontSize={"17"} fontWeight="500" color="gray.600">
                  {props.prix} Dhs
                </Text>
                <Text fontSize={"17"} color="lightslategray">/jour</Text>
              </HStack>
            </HStack>
          <Button 
                  className="louerBTn"
                  w="full"
                  display={"inline-flex"}
                  height={"2.5rem"}
                  width={"100%"}
                  fontSize={"1rem"}
                  fontWeight={"600"}
                  borderRadius={"0.375rem"}
                  borderColor={"#E2E8F0"}
                  background={"#EDF2F7"}
                  borderWidth={"0"}
                  onClick={rentACar}
                   >
            Louer maintenant
          </Button>
          <hr py={2}></hr>
          <SimpleGrid columns={3} py={1} textAlign="center">
            <GridItem>
              <Text fontWeight="400" color="lightslategray" fontSize="14">
                Vitesse
              </Text>
              <Text fontWeight="500" color="gray.600">
                {props.boitedevitesse}
              </Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="400" color="lightslategray" fontSize="14">
                Type
              </Text>
              <Text fontWeight="500" color="gray.600">
                {props.carburant}
              </Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="400" color="lightslategray" fontSize="14">
                Available
              </Text>
              <Text fontWeight="500" color="gray.600">
                {props.etat }
              </Text>
              
              
            </GridItem>
            <hr></hr>
          <Stack direction='row' h='100px' p={0}>
            <Divider py={3} />
            
          </Stack>
          </SimpleGrid>

         
          <Divider  borderColor="red" py={3} p={0} />
          
          </Box>
      </div>
    </div>
  );
};

export default CarCard;

CarCard.defaultProps = {
  photo1: "",
  photo2: "",
  marque: "Default brand",
  modele: "modele",
  prix: "000",
  boitedevitesse: "---",
  carburant: "---",
  etat: "---",
};
