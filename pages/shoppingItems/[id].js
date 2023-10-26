import React from "react";
import {
    Box,
    Heading,
    Link,
    UnorderedList,
    ListItem
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "../../firebase";

const SingleToDo = ({shoppingData}) => {

    const { user } = useAuth() || {};
    if (!user) {
        return;
    }

    return (
        <Box m={5}>
            <Heading as="h3" fontSize={"xl"}>
                { shoppingData.name }
            </Heading>
            <UnorderedList p={4}>
                <ListItem>
                    { shoppingData.email }
                </ListItem>
                <ListItem>
                    { shoppingData.phoneNumber }
                </ListItem>
                <ListItem>
                    { shoppingData.birthday }
                </ListItem>
            </UnorderedList>
            <Link href="/" color="blue.500">Back</Link>
        </Box>
    );
};

export async function getServerSideProps(context) {

    let shoppingData = null;
    const docRef = doc( db, 'contacts', context.params.id );
    const docSnap = await getDoc(docRef);
    
    if ( docSnap.exists() ) {
        shoppingData = docSnap.data();
    }

    return {
        props: {
                 shoppingData
               }
    };
}


export default SingleToDo;
