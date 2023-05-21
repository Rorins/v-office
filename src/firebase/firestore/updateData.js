import firebase_app from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function updateData(collection, id, newData) {
  try {
    const docRef = doc(db, collection, id);
    await setDoc(docRef, newData);
    return { result: "Data updated successfully.", error: null };
  } catch (error) {
    return { result: null, error: error.message };
  }
}
