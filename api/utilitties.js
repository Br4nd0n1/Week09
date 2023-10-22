import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
function refreshData(useStatesetter, dbName)
{
    const {  user } = useAuth();
    useEffect(() => {
    if (!user) 
    {
        useStatesetter([]);
    return;
    }
    const q = query(collection(db, dbName), where("User_Id", "==", user.uid));
    onSnapshot(q, (querySnapchot) => {
    let ar = [];
    querySnapchot.docs.forEach((doc) => {
    ar.push({ id: doc.id, ...doc.data() });
    });
    useStatesetter(ar);
    });
        }, [user]);
}



export { refreshData };