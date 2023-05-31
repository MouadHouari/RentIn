import { GridItem, SimpleGrid, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "../components/client/car-card";
import Loading from "../components/agence/Loading";

function BookCars() {
  const navigation = useNavigate();
  const navigate = (route) => navigation(route);
  const[loading, setLoading]= useState([true]);
  const[offres, setOffres]= useState([]);



  useEffect(() => {

    axios.get(`http://localhost:8000/api/offres/0`).then(res =>{
        console.log(res)
        setOffres(res.data.offres);
        setLoading(false);
    });

},[])

 
  if(loading) return(  <div><Loading /> </div>  );


  return (
    <div className="mt-4 ">
     
      <VStack top={3}>
        <SimpleGrid columns={[1, 1, 2, 2, 3]} rowGap={6} columnGap={8} p={10}>
          {offres.map((item) => {
            return (
              <GridItem key={item.id} colSpan={1}>
                <CarCard props={item} />
              </GridItem>
            );
          })}
        </SimpleGrid>
      </VStack>
    </div>
  );
}

export default BookCars;
