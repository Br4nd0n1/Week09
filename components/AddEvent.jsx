import React from "react";
import {
Box,
Input,
Button,
Textarea,
Stack,
Select,
useToast,
Collapse
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addToDatabase } from "../api/dBHelper";
const AddEvent = () => {
const [title, setTitle] = React.useState("");
const [description, setDescription] = React.useState("");
const [status, setStatus] = React.useState("pending");
const [isLoading, setIsLoading] = React.useState(false);
const [show, setShow] = React.useState(false)
const toast = useToast();
const { isLoggedIn, user } = useAuth();
const handleEventCreate = async () => {
if (!isLoggedIn) {
toast({
title: "You must be logged in to create an event",
status: "error",
duration: 9000,
isClosable: true,
});
return;
}
setIsLoading(true);
const todo = {
title,
description,
status,
User_Id: user.uid,
createdAt: new Date().getTime()
};
await addToDatabase("events",todo);
setIsLoading(false);
setTitle("");
setDescription("");
setStatus("pending");
toast({ title: "Todo created successfully", status: "success" });
};
return (
    <>


      <Button onClick={() => setShow(!show)} mt="1rem">
        {show ? "Close" : "Create To Do"}
      </Button>
      <Collapse in={show}>
<Box w="40%" margin={"0 auto"} display="block" mt={5}>
<Stack direction="column">
<Input
placeholder="Title"
value={title}
onChange={(e) => setTitle(e.target.value)}
/>
<Textarea
placeholder="Description"
value={description}
onChange={(e) => setDescription(e.target.value)}
/>
<Select value={status} onChange={(e) => setStatus(e.target.value)}>
<option
value={"pending"}
style={{ color: "yellow", fontWeight: "bold" }}
>
Pending ⌛
</option>
<option
value={"completed"}
style={{ color: "green", fontWeight: "bold" }}
>
Completed ✅
</option>
</Select>
<Button
onClick={() => handleEventCreate()}
disabled={title.length < 1 || description.length < 1 || isLoading}
variantColor="teal"
variant="solid"
>
Add
</Button>
</Stack>
</Box>
      </Collapse>
      </>
);
};
export default AddEvent;