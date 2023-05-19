import firebase_app from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

//Retrieve data with id
export default async function getDocumentById(collection, id) {
  let docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}


