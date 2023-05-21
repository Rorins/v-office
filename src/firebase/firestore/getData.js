import firebase_app from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

// Retrieve data with ID
export default async function getData(collection, id) {
  try {
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return { result: data, error: null };
    } else {
      return { result: null, error: "Document does not exist." };
    }
  } catch (error) {
    return { result: null, error: error.message };
  }
}

