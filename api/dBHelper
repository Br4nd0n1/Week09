import { db } from "../firebase";
import {
collection,
addDoc
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

export { addToDatabase };