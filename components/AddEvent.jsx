import React from "react";
import {
Box,
Input,
Button,
Stack,
useToast,
Collapse
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addToDatabase } from "../api/dBHelper";
const AddEvent = () => {
const [title, setTitle] = React.useState("");
const [date, setDate] = React.useState("");
const currentYear = new Date().getFullYear();
const minDate = `${currentYear}-01-01`;
const maxDate = `${currentYear + 100}-12-31`;
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
const event = {
title,
date,
User_Id: user.uid,
createdAt: new Date().getTime()
};
await addToDatabase("events",event);
setIsLoading(false);
setTitle("");
setDate("");
toast({ title: "Event created successfully", status: "success" });
};
return (
    <>


      <Button onClick={() => setShow(!show)} mt="1rem">
        {show ? "Close" : "Add Event"}
      </Button>
      <Collapse in={show}>
<Box w="40%" margin={"0 auto"} display="block" mt={5}>
<Stack direction="column">
<Input
placeholder="Title"
value={title}
onChange={(e) => setTitle(e.target.value)}
/>
<Input
placeholder="Date"
type="date"
value={date}
min={minDate} 
max={maxDate}
onChange={(e) => setDate(e.target.value)}
/>
<Button
onClick={() => handleEventCreate()}
disabled={title.length < 1 || date.length < 1 || isLoading}
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
