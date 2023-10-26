import {
    Badge,
    Box,
    Link,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Collapse
} from "@chakra-ui/react";
import { FaToggleOff, FaToggleOn, FaTrash, FaEdit } from "react-icons/fa";

import { refreshData } from "../api/utilitties";
import { deleteTodo, toggleTodoStatus } from "../api/todo";
import { useState } from "react";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const toast = useToast();
    const [filter, setFilter] = useState('all');

    refreshData(setTodos, "todo")

    const handleTodoDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this todo?")) {
            deleteTodo(id);
            toast({ title: "Todo deleted successfully", status: "success" });
        }
    };

    const handleToggle = async (id, status) => {
        const newStatus = status == "completed" ? "pending" : "completed";
        await toggleTodoStatus({ docId: id, status: newStatus });
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
            <select id="filter" value={filter} onChange={(event) => setFilter(event.target.value)}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
            </select>
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                    <Tr>
                        <Th>To Do</Th>
                        <Th>Description</Th>
                        <Th isNumeric>Status</Th>
                        <Th isNumeric>Actions</Th>
                    </Tr>
                </Thead>

                {getTodos(todos, filter).map((todo) => (
                    <Tbody>
                        <Tr>
                            <Td>     
                                <Heading as="h3" fontSize={"xl"}>
                                    {todo.title}{" "}
                                </Heading>
                                <Text>{todo.description}</Text>
                  
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
                                    float="right"
                                    opacity="0.8"
                                    bg={todo.status == "pending" ? "yellow.500" : "green.500"}
                                >
                                    {todo.status}
                                </Badge> 
                            </Td>
                            <Td >  
                            <Link href={`/singleToDo/${todo.id}`}             
                                color="blue.500"
                                    bg="inherit"
                                    transition={"0.2s"}
                                    _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                    }}
                                    float="left"
                                    size="xs">  <FaEdit /></Link> 
                                <Badge
                                    color="red.500"
                                    bg="inherit"
                                    transition={"0.2s"}
                                    _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                    }}
                                    float="right"
                                    size="xs"
                                    onClick={() => handleTodoDelete(todo.id)}
                                >
                                    <FaTrash />
                                </Badge>
                            </Td>
                        </Tr>
                    </Tbody>

                ))}

                <Tfoot>
                    <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
        </>
    );
};

export default TodoList;
