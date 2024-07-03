"use client";
import { auth } from "@/config/firebase";
import React from "react";

const Stoeries = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();

      //   setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illo
      repudiandae beatae ad iure magnam laboriosam laborum tempore pariatur
      mollitia voluptatum nisi, ut ratione sit, sed ex sint quisquam distinctio.
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Stoeries;
