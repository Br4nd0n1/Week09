import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  deleteDoc
} from "firebase/firestore";

const addToDatabase = async (dBName, fieldObj) => {
try 
{
 await addDoc(collection(db, dBName), fieldObj);
} 
catch (err) 
{ 
  console.log(err); 
}
};


const deleteFromDatabase = async (dbName, docId) => {
  if (confirm("Are you sure you wanna delete this todo?")) 
  {
    try 
    {
     const todoRef = doc(db, dbName, docId);
     await deleteDoc(todoRef);
    } 
     catch (err) 
    {
     console.log(err);
    }
  }
  };


export { addToDatabase, deleteFromDatabase };