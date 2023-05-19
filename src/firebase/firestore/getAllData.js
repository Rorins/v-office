import firebase_app from "../config";
import { getFirestore, doc, getDocs,  onSnapshot, collection } from "firebase/firestore";

const db = getFirestore(firebase_app);

//retrive all documents not by id
export default async function getAllData(coll) {
    let usersData = [];
  
    try {
      const querySnapshot = await getDocs(collection(db, coll));
      
      querySnapshot.forEach((doc) => {
        const user = {
          id: doc.id,
          data: doc.data()
        };
        
        usersData.push(user);
      });
      console.log("users in array", usersData)
      return { usersData, error: null };
    } catch (error) {
      return { usersData: null, error };
    }
  }

