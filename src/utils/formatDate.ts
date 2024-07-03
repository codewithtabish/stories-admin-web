import { Timestamp } from "firebase/firestore";

const formatDate = (timestamp: Timestamp | null) => {
  if (!timestamp) return "N/A"; // Handle null or undefined timestamps

  const date = timestamp.toDate();
  return date.toLocaleString(); // Format the date as a readable string
};

export default formatDate;
