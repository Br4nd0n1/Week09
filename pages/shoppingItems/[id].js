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

const Contact = ({id,contactData}) => {
const toast = useToast();
    const [name, setName] = React.useState(contactData.name);
    const [phoneNumber, setPhoneNumber] = React.useState(contactData.phoneNumber);
    const [email, setEmail] = React.useState(contactData.email);
    const [birthday, setBirthday] = React.useState(contactData.birthday);
    const { user } = useAuth() || {};

    const handleUpdate = async () => {
        const contact = {
            name,
            phoneNumber,
            email,
            birthday,
            };
        await updateDatabase("contacts", contact, id);
        toast({
            title: `Contact Updated`,
            status: "success",
        });
    };

    if (!user) {
        return;
    }

    return (
        <Box m={5}>
<Input
placeholder="Name"
defaultValue={contactData.name}
onChange={(e) => setName(e.target.value)}
/>
<Input
placeholder="Phone Number"
defaultValue={contactData.phoneNumber}
onChange={(e) => setPhoneNumber(e.target.value)}
/>
<Input
placeholder="Email"
defaultValue={contactData.email}
onChange={(e) => setEmail(e.target.value)}
/>
<Input
placeholder="Birthday"
type="date"
defaultValue={ contactData.birthday }
onChange={(e) => setBirthday(e.target.value)}
/>

<Button onClick={() => handleUpdate()}>Update</Button>
            <Link href="/" color="blue.500">Back</Link>
        </Box>
    );
};

export async function getServerSideProps(context) {

    let contactData = null;
    let id = context.params.id
    const docRef = doc( db, 'contacts', id );
    const docSnap = await getDoc(docRef);
    
    if ( docSnap.exists() ) {
        contactData = docSnap.data();
    }

        console.log(contactData)

    return {
        props: {
                 id,
                 contactData
               }
    };
}


export default Contact;
