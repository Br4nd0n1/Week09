import {
    Box,
    Link,
    Heading,
    SimpleGrid,
    Text,
    } from "@chakra-ui/react";
    import { refreshData } from "../api/utilitties";
    
    import { useState } from "react";
    const ShoppingList = () => {
    const [shopping, setshopping] = useState([]);

    refreshData(setshopping, "shoppinglist")

    return (
    <Box mt={5}>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
    {shopping &&
    shopping.map((item) => (
    <Box
    p={3}
    boxShadow="2xl"
    shadow={"dark-lg"}
    transition="0.2s"
    _hover={{ boxShadow: "sm" }}
    >
    <Heading as="h3" fontSize={"xl"}>Food Item</Heading>
    <Text>{item.food}</Text>
    <Text>{item.amount}</Text>
    <Link href={`/shoppingItems/${item.id}`} color="blue.500"> View</Link>
    </Box>
    ))}
    </SimpleGrid>
    </Box>
    );
    };
    export default ShoppingList;