import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC8irKzMNTRtlCKLXler4RCK5wcmu3ZlLg",
  authDomain: "sprinkle-sprite.firebaseapp.com",
  projectId: "sprinkle-sprite",
  storageBucket: "sprinkle-sprite.firebasestorage.app",
  messagingSenderId: "38830643239",
  appID: "1:38830643239:web:8e26a35842b749f30cd602",
  measurementId: "G-EJD7WTX6LD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);