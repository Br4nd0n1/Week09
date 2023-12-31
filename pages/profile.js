import React, { useEffect, useState } from "react";
import {
    Box,
    Heading,
    Link,
    Input,
    Button,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import {
    collection,
    query,
    where,
    getDocs
} from "firebase/firestore";
import { db } from "../firebase";
import { addToDatabase } from "../api/dBHelper";

const Profile = () => {
    const { isLoggedIn, user } = useAuth();
    const [itemData, setItemData] = useState(null);
    const [name, setName] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const [heading, setHeading] = useState("Enter your Contact Info")
    const [phoneNumber, setPhoneNumber] = useState("");

    async function addContact()
    {
        if (!isLoggedIn) {
            toast({
            title: "You must be logged in to Edit Profile",
            status: "error",
            duration: 9000,
            isClosable: true,
            });
            return;
            }
        const contact = {
        Phone_Number:phoneNumber,
        Name: name,
        User_Id: user.uid,
        };
        await addToDatabase("contactinfo",contact);
        setIsSaved(true)
        setHeading("Contact Info")
        alert("Contact Updated")
    };

    useEffect(() => {
        if (!user) {
            return;
        }

        const fetchData = async () => {
            const q = query(collection(db, 'contactinfo'), where('User_Id', '==', user.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setItemData(doc.data());
            });
        };

        fetchData();
    }, [user]);

    if (!itemData) {
        return (
        <Box mt={5}>
            <Heading as="h3" fontSize={"xl"} mt={5}>
                {heading}
            </Heading>
            <Input disabled={isSaved} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}  mt={5}/>
            <Input disabled={isSaved} placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} mt={5}/>
            <Button onClick={() => addContact()}
hidden={isSaved} mt={5}>Save</Button>
            <Link href="/" color="blue.500" mt={5} ms={5}>Back</Link>
        </Box>
        );
    }

    return (
<Box mt={5}>
<Heading as="h3" fontSize={"xl"}>
    Contact Info
</Heading>
<Input disabled="true" placeholder="Name" value={itemData.Name} mt={5}/>
<Input disabled="true" placeholder="Phone Number" value={itemData.Phone_Number} mt={5}  mb={5}/>
<Link href="/" color="blue.500" mt={5}>Back</Link>
</Box>
    );
};

export default Profile;

