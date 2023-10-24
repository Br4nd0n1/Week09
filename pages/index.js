import { Container,Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import ShoppingList from "../components/ShoppingList";
import  ShoppingModal  from '../components/ShoppingModal';
import  Calendar  from '../components/Calendar';

export default function Home() {
return (
<Container maxW="7xl">
<Auth />
<br></br>

<Tabs>
  <TabList>
    <Tab>Contacts</Tab>
    <Tab>Events</Tab>
    <Tab>To Do</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
    <ShoppingModal />
    <ShoppingList />
    </TabPanel>
    <TabPanel>
      <Calendar />
    </TabPanel>
    <TabPanel>
    <AddTodo />
    <TodoList />
    </TabPanel>
  </TabPanels>
</Tabs>


</Container>
);
}