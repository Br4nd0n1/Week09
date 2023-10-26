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

const Event = ({eventData}) => {

    const { user } = useAuth() || {};
    if (!user) {
        return;
    }

    return (
        <Box m={5}>
            <Heading as="h3" fontSize={"xl"}>
                { eventData.title }
            </Heading>
            <UnorderedList p={4}>
                <ListItem>
                    { eventData.date }
                </ListItem>
            </UnorderedList>
            <Link href="/" color="blue.500">Back</Link>
        </Box>
    );
};

export async function getServerSideProps(context) {

    let eventData = null;
    const docRef = doc( db, 'events', context.params.id );
    const docSnap = await getDoc(docRef);
    
    if ( docSnap.exists() ) {
        eventData = docSnap.data();
    }

    return {
        props: {
                 eventData
               }
    };
}


export default Event;
