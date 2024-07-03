// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getMessaging, onMessage } from "firebase/messaging";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import admin from "firebase-admin";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF6Iadac0D8KAkQPl76zgvgFLf_iTudNg",
  authDomain: "storiesteller-fa477.firebaseapp.com",
  projectId: "storiesteller-fa477",
  storageBucket: "storiesteller-fa477.appspot.com",
  messagingSenderId: "808706020690",
  appId: "1:808706020690:web:ced1921b6026b11529968b",
  measurementId: "G-JX35XXF5T4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
// const messaging = getMessaging(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Request permission to show notifications
export const requestNotificationPermission = async () => {
  try {
    await Notification.requestPermission();
    console.log("Notification permission granted.");
  } catch (error) {
    console.error("Unable to get permission to notify.", error);
  }
};

// Function to handle incoming messages
// export const handleMessages = () => {
//   onMessage(messaging, (payload) => {
//     console.log("Message received. ", payload);
//     // Customize notification here
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//       body: payload.notification.body,
//       icon: "/path/to/icon.png",
//     };
//     new Notification(notificationTitle, notificationOptions);
//   });
// };

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
// });

export { firestore, auth, googleProvider };
