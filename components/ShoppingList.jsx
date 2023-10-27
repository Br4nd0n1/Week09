import {
    Box,
    Badge,
    Link,
    Heading,
    SimpleGrid,
    Text,
    } from "@chakra-ui/react";
    import { refreshData } from "../api/utilitties";
    import { FaTrash } from "react-icons/fa";
    import { useState } from "react";
    import { deleteFromDatabase } from "../api/dBHelper";
    const ShoppingList = () => {
    const [shopping, setshopping] = useState([]);

    refreshData(setshopping, "contacts")

    return (
    <Box mt={5}>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
    {shopping &&
    shopping.map((item, index) => (
    <Box
    p={3}
    boxShadow="2xl"
    shadow={"dark-lg"}
    transition="0.2s"
    _hover={{ boxShadow: "sm" }}
    key={index}
    >
    <Heading as="h3" fontSize={"xl"}>Contact {index + 1}</Heading>
    <Badge
    color="red.500"
    bg="inherit"
    transition={"0.2s"}
    _hover={{
    bg: "inherit",
    transform: "scale(1.2)",
    }}
    float="right"
    size="xs"
    onClick={() => deleteFromDatabase("contacts",item.id)}
> <FaTrash />  </Badge>

    <Text>{item.name}</Text>
    <Text>{item.phoneNumber}</Text>
    <Text>{item.email}</Text>
    <Text>{item.birthday}</Text>
    <Link href={`/shoppingItems/${item.id}`} color="blue.500">Edit</Link>
    </Box>
    ))}
    </SimpleGrid>
    </Box>
    );
    };
    export default ShoppingList;