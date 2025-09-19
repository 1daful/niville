import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "studio-1775112956-81a76",
  appId: "1:385419341755:web:a91263b0b9aa20d95e1e9e",
  apiKey: "AIzaSyDReJPoW5yF0XGUSdTso_5rVz1bdh9hRJQ",
  authDomain: "studio-1775112956-81a76.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "385419341755"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
