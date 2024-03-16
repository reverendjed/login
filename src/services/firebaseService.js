
/**
 * Fetches the role of a user from the Firestore database.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<string|null>} - A promise that resolves to the role of the user, or null if the user document does not exist.
 */
import { db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';

export async function fetchUserRole(userId) {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().role; // Assuming the user document has a 'role' field
  } else {
    console.log("No such document!");
    return null;
  }
}
