// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC2xINniVUURFfiy_BDM_0DGqT2PXr_7Y4",
  authDomain: "corstash.firebaseapp.com",
  projectId: "corstash",
  storageBucket: "corstash.appspot.com",
  messagingSenderId: "834950639895",
  appId: "1:834950639895:web:a9147c3384c3671b350752",
});

// Initialize Firebase
export default firebaseApp;

/*
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC2xINniVUURFfiy_BDM_0DGqT2PXr_7Y4",
  authDomain: "corstash.firebaseapp.com",
  projectId: "corstash",
  storageBucket: "corstash.appspot.com",
  messagingSenderId: "834950639895",
  appId: "1:834950639895:web:a9147c3384c3671b350752",
});

/*const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC2xINniVUURFfiy_BDM_0DGqT2PXr_7Y4",
    authDomain: "corstash.firebaseapp.com",
    projectId: "corstash",
    storageBucket: "corstash.appspot.com",
    messagingSenderId: "834950639895",
    appId: "1:834950639895:web:a9147c3384c3671b350752"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
</script>*/
