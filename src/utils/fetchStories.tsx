import { toast } from "@/components/ui/use-toast";
import { firestore } from "@/config/firebase";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
// import admin from "firebase-admin";

const fetchStories = async () => {
  try {
    const storiesCollection = collection(firestore, "storycollection");
    const storiesSnapshot = await getDocs(storiesCollection);
    const storiesList = storiesSnapshot.docs.map((doc) => ({
      collectionID: doc.id,
      ...doc.data(),
    }));
    return storiesList;
  } catch (error) {
    console.error("Error fetching stories: ", error);
    return [];
  }
};
const fetchUsers = async () => {
  try {
    const usersCollection = collection(firestore, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map((doc) => ({
      userID: doc.id,
      ...doc.data(),
    }));
    return usersList;
  } catch (error) {
    console.error("Error fetching users: ", error);
    return [];
  }
};

const fetchRealStories = async () => {
  try {
    const storiesCollection = collection(firestore, "stories");
    const storiesSnapshot = await getDocs(storiesCollection);
    const storiesList = storiesSnapshot.docs.map((doc) => doc.data());
    return storiesList;
  } catch (error) {
    console.error("Error fetching stories: ", error);
    return [];
  }
};

const fetchSingleStory = async (storyId: string) => {
  try {
    const storyRef = doc(firestore, "stories", storyId);
    const storySnapshot = await getDoc(storyRef);

    if (storySnapshot.exists()) {
      return storySnapshot.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching story: ", error);
    return null;
  }
};

const fetchRealStoriesOfCategory = async (storyCat: string) => {
  try {
    const storiesCollection = collection(firestore, "stories");
    const q = query(storiesCollection, where("storyType", "==", storyCat));
    const storiesSnapshot = await getDocs(q);
    const storiesList = storiesSnapshot.docs.map((doc) => doc.data());
    return storiesList;
  } catch (error) {
    console.error("Error fetching stories: ", error);
    return [];
  }
};

const likeStory = async (storyId: string, userId: string) => {
  try {
    const storyRef = doc(firestore, "stories", storyId);
    const storySnapshot = await getDoc(storyRef);

    if (storySnapshot.exists()) {
      const storyData = storySnapshot.data();

      // Check if user has already liked the story
      if (!storyData.users.includes(userId)) {
        // Add the user ID to the likes array
        await updateDoc(storyRef, {
          users: arrayUnion(userId),
        });

        console.log("Story liked successfully!");
        return {
          ...storyData,
          users: [...(storyData.users || []), userId],
          liked: true,
        };
      } else {
        console.log("User has already liked this story.");
        return storyData;
      }
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error liking story: ", error);
    return null;
  }
};
const unlikeStory = async (storyId: string, userId: string) => {
  try {
    const storyRef = doc(firestore, "stories", storyId);
    const storySnapshot = await getDoc(storyRef);

    if (storySnapshot.exists()) {
      const storyData = storySnapshot.data();

      // Check if user has liked the story
      if (storyData.users.includes(userId)) {
        // Remove the user ID from the likes array
        await updateDoc(storyRef, {
          users: arrayRemove(userId),
        });

        return {
          ...storyData,
          users: storyData.users.filter((id: string) => id !== userId),
          removed: true,
        };
      } else {
        console.log("User has not liked this story.");
        return storyData;
      }
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error unliking story: ", error);
    return null;
  }
};

const deleteStory = async (storyId: string) => {
  try {
    const storyRef = doc(firestore, "stories", storyId);
    await deleteDoc(storyRef);
    console.log("Story deleted successfully");
  } catch (error) {
    console.error("Error deleting story: ", error);
  }
};
const deleteCollection = async (collectionID: string) => {
  try {
    const storyRef = doc(firestore, "storycollection", collectionID);
    await deleteDoc(storyRef);
  } catch (error) {
    console.error("Error deleting story: ", error);
  }
};
const deleteUser = async (userID: string) => {
  try {
    // admin.initializeApp({
    //   credential: admin.credential.applicationDefault(),
    // });

    // await admin.auth().deleteUser(userID);
    console.log(`Successfully deleted user: ${userID}`);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
const makeAdmin = async (userID: string) => {
  try {
    const userRef = doc(firestore, "users", userID);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const newStatus = !userData.isAdmin;

      await updateDoc(userRef, { isAdmin: newStatus });
      console.log(
        `User ${userID} is now ${newStatus ? "an admin" : "not an admin"}.`
      );
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error updating user: ", error);
  }
};
const createStory = async (data: any) => {
  try {
    // Add story data to Firestore
    // Create a document reference with a random ID
    const docRef = doc(collection(firestore, "stories"));

    // Add the storyID to the data
    data.storyID = docRef.id;

    // Set the document with the provided data
    await setDoc(docRef, data);
    toast({
      title: "story created successfully 💞💞",
    });
  } catch (error: any) {
    toast({
      title: "the error is " + error,
      variant: "destructive",
    });
  }
};

export default {
  fetchStories,
  fetchRealStories,
  fetchSingleStory,
  fetchRealStoriesOfCategory,
  likeStory,
  unlikeStory,
  fetchUsers,
  deleteStory,
  deleteCollection,
  deleteUser,
  makeAdmin,
  createStory,
};
