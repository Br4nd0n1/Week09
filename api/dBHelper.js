import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
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


const deleteFromDatabase = async (dBName, docId) => {
  if (confirm("Are you sure you wanna delete this todo?")) 
  {
    try 
    {
     const todoRef = doc(db, dBName, docId);
     await deleteDoc(todoRef);
    } 
     catch (err) 
    {
     console.log(err);
    }
  }
  };

  const updateDatabase = async (dBName, fieldObj, docId) => {
    console.log(dBName)
    console.log(fieldObj)
    console.log(docId)
    try {
    const todoRef = doc(db, dBName, docId);
    await updateDoc(todoRef, fieldObj);
    } catch (err) {
    console.log(err);
    }
    };


export { addToDatabase, deleteFromDatabase, updateDatabase };