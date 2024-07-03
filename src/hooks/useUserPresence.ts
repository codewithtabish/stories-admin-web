// src/hooks/useUserPresence.ts

import { useEffect } from "react";
import { auth, firestore } from "@/config/firebase"; // Adjust imports based on your Firebase configuration

const useUserPresence = () => {
  const updateUserPresence = async (userId: string, online: boolean) => {
    // @ts-ignore
    const userDocRef = firestore!!.doc(`users/${userId}`);
    await userDocRef.update({
      online,
      lastSeen: new Date(),
    });
  };

  useEffect(() => {
    const handleUserActivity = () => {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;

        const handleVisibilityChange = () => {
          if (document.visibilityState === "hidden") {
            updateUserPresence(userId, false); // Set user offline when tab is hidden
          } else {
            updateUserPresence(userId, true); // Set user online when tab is visible
          }
        };

        // Add event listener for visibility change
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Cleanup event listener
        return () => {
          document.removeEventListener(
            "visibilitychange",
            handleVisibilityChange
          );
        };
      }
    };

    handleUserActivity();

    // Listen to beforeunload event to update user status
    const handleBeforeUnload = () => {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        updateUserPresence(userId, false); // Set user offline when leaving the page
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup beforeunload event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return {};
};

export default useUserPresence;
