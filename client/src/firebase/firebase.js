import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateEmail,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2xINniVUURFfiy_BDM_0DGqT2PXr_7Y4",
  authDomain: "corstash.firebaseapp.com",
  projectId: "corstash",
  storageBucket: "corstash.appspot.com",
  messagingSenderId: "834950639895",
  appId: "1:834950639895:web:a9147c3384c3671b350752",
};

initializeApp(firebaseConfig);

export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const createNativeUser = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const NativeSignIn = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const emailUpdate = async (email) => {
  if (!email) return;

  return await updateEmail(auth.currentUser, email);
};
