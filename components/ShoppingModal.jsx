
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react"
import {
  Box,
  Stack,
  Input,
  useToast
  } from "@chakra-ui/react";
import { useState } from "react";
import { addToDatabase } from "../api/dBHelper";
import useAuth from "../hooks/useAuth";

export function ShoppingModal() {
  const { isLoggedIn, user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const addShoppingItem = async () => {
    if (!isLoggedIn) {
    toast({
    title: "You must be logged in to create a contact",
    status: "error",
    duration: 9000,
    isClosable: true,
    });
    return;
    }
    setIsLoading(true);
    const shoppingItem = {
    User_Id: user.uid,
    name,
    email,
    phoneNumber,
    birthday,
    };
    await addToDatabase("contacts",shoppingItem);
    setName("");
    setEmail("");
    setPhoneNumber("");
    setBirthday("");
    setIsLoading(false)
    onClose();
    toast({ title: "contact created successfully", status: "success" });
    };


   return (
    <>
      <Button onClick={onOpen} >Add Contact</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box w="40%" margin={"0 auto"} display="block" mt={5}>
<Stack direction="column">
<Input
placeholder="name"
value={name}
onChange={(event) => setName(event.target.value)}
/>
<Input
placeholder="email"
value={email}
onChange={(event) => setEmail(event.target.value)}
/>
<Input
placeholder="phone number"
value={phoneNumber}
onChange={(event) => setPhoneNumber(event.target.value)}
/>
<Input
placeholder="birthday"
value={birthday}
type="date"
onChange={(event) => setBirthday(event.target.value)}
/>

<Button
onClick={() => addShoppingItem()}
isDisabled={name.length < 1 || email.length < 1 || phoneNumber.length < 1 || birthday.length < 1 || isLoading}
variantColor="teal"
variant="solid"
>
Add
</Button>
</Stack>
</Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default ShoppingModal;
