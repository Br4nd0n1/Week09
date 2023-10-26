import React from "react";
import {
    Box,
    Button,
    Heading,
    Input,
    Link,
    useToast,
    UnorderedList,
    ListItem,
    Select
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "../../firebase";
import { updateDatabase } from "../../api/dBHelper";


const SingleToDo = ({id,toDoData}) => {
    const toast = useToast();
    const [title, setTitle] = React.useState(toDoData.title);
    const [description, setDescription] = React.useState(toDoData.description);
    const [status, setStatus] = React.useState(toDoData.status);
    const { user } = useAuth() || {};

    const handleUpdate = async () => {
        const todo = {
            title,
            description,
            status,
            };
        await updateDatabase("todo", todo, id);
        toast({
            title: `To Do Updated`,
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
defaultValue={toDoData.title}
onChange={(e) => setTitle(e.target.value)}
/>
<Input
placeholder="Description"
defaultValue={toDoData.description}
onChange={(e) => setDescription(e.target.value)}
/>
<Select
defaultValue={toDoData.status}
onChange={(e) => setStatus(e.target.value)}
>
<option value="pending">Pending</option>
  <option value="completed">Completed</option>
</Select>
<Button onClick={() => handleUpdate()}>Update</Button>
            <Link href="/" color="blue.500">Back</Link>
        </Box>
    );
};

export async function getServerSideProps(context) {

    let toDoData = null;
    let id = context.params.id
    const docRef = doc( db, 'todo', id );
    const docSnap = await getDoc(docRef);
    
    if ( docSnap.exists() ) {
        toDoData = docSnap.data();
    }

        console.log(toDoData)

    return {
        props: {
                 id,
                 toDoData
               }
    };
}


export default SingleToDo;
