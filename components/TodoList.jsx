import {
    Badge,
    Flex,
    Link,
    Heading,
    Text,
    useToast,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";
import { FaToggleOff, FaToggleOn, FaTrash, FaEdit } from "react-icons/fa";
import { updateDatabase, deleteFromDatabase } from "../api/dBHelper";
import { refreshData } from "../api/utilitties";
import { useState } from "react";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const toast = useToast();
    const [filter, setFilter] = useState('all');

    refreshData(setTodos, "todo")

    const handleToggle = async (id, status) => {
        const newStatus = status == "completed" ? "pending" : "completed";
        await updateDatabase("todo", {status: newStatus}, id)
        toast({
            title: `Todo marked ${newStatus}`,
            status: newStatus == "completed" ? "success" : "warning",
        });
    };


    function getTodos(localTodos, filter)
    {
        if (filter == "all")
        {
            return localTodos && localTodos
        }
        return localTodos && localTodos.filter(todo => todo.status == filter)
    }

    return (
        <>
                    <label htmlFor="filter">Filter:</label>
            <select id="filter" value={filter} onChange={(event) => setFilter(event.target.value)} >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
            </select>
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>To Do</Th>
                        <Th>Description</Th>
                        <Th isNumeric>Status</Th>
                        <Th isNumeric>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                {getTodos(todos, filter).map((todo, index) => (
                 
                        <Tr 
                            key={index}>
                            <Td>     
                                <Heading as="h3" fontSize={"xl"}>
                                    {todo.title}{" "}
                                </Heading>
                  
                            </Td>
                            <Td>     
                                <Text>{todo.description}</Text>
                            </Td>
                            <Td>   
                                <Badge
                                    color={todo.status == "pending" ? "gray.500" : "green.500"}
                                    bg="inherit"
                                    transition={"0.2s"}
                                    _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                    }}
                                    float="right"
                                    size="xs"
                                    onClick={() => handleToggle(todo.id, todo.status)}
                                >
                                    {todo.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
                                </Badge>
                                <Badge
                                me="1rem"
                                                   float="right"
                                    opacity="0.8"
                                    bg={todo.status == "pending" ? "yellow.500" : "green.500"}
                                >
                                    {todo.status}
                                </Badge> 
                               
                            </Td>
                            <Td >  
                            <Flex align='top' justify='space-evenly' float="right">
                            <Link href={`/singleToDo/${todo.id}`}             
                                color="blue.500"
                                    bg="inherit"
                                    transition={"0.2s"}
                                    _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                    }}
                                    me="1rem"
                                    size="xs">  <FaEdit /></Link> 
                                <Badge
                                    color="red.500"
                                    bg="inherit"
                                    transition={"0.2s"}
                                    _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                    }}
                 
                                    size="xs"
                                    onClick={() => deleteFromDatabase("todo",todo.id)}
                                >
                                    <FaTrash />
                                </Badge>
                                </Flex>
                            </Td>
                        </Tr>
                ))}
  </Tbody>
            </Table>
        </TableContainer>
        </>
    );
};

export default TodoList;
