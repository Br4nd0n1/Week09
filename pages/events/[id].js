import React from "react";
import {
    Box,
    Button,
    Heading,
    Input,
    Link,
    useToast,
    UnorderedList,
    ListItem
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "../../firebase";
import { updateDatabase } from "../../api/dBHelper";

const Event = ({id,eventData}) => {
const toast = useToast();
    const [title, setTitle] = React.useState(eventData.title);
    const [date, setDate] = React.useState(eventData.date);
    const currentYear = new Date().getFullYear();
const minDate = `${currentYear}-01-01`;
const maxDate = `${currentYear + 100}-12-31`;
    const { user } = useAuth() || {};

    const handleUpdate = async () => {
        const event = {
            title,
            date,
            };
        await updateDatabase("events", event, id);
        toast({
            title: `Event Updated`,
            status: "success",
        });
    };

    if (!user) {
        return;
    }

    return (
        <Box m={5}>
<Input
placeholder="Title"
defaultValue={eventData.title}
onChange={(e) => setTitle(e.target.value)}
/>

                <Input
placeholder="Date"
type="date"
defaultValue={ eventData.date }
min={minDate} 
max={maxDate}
onChange={(e) => setDate(e.target.value)}
/>
<Button onClick={() => handleUpdate()}>Update</Button>
            <Link href="/" color="blue.500">Back</Link>
        </Box>
    );
};

export async function getServerSideProps(context) {

    let eventData = null;
    let id = context.params.id
    const docRef = doc( db, 'events', id );
    const docSnap = await getDoc(docRef);
    
    if ( docSnap.exists() ) {
        eventData = docSnap.data();
    }

        console.log(eventData)

    return {
        props: {
                 id,
                 eventData
               }
    };
}


export default Event;
