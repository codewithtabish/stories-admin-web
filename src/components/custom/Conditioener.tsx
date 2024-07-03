"use client";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import Stoeries from "../Stoeries";
import Login from "./Login";

const Conditioener = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return <div>{user ? <Stoeries /> : <Login />}</div>;
};

export default Conditioener;
