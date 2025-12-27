import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import {
    addDoc,
    collection,
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
apiKey: "AIzaSyD3GkjUh81I46uiLXpDzYPYlF8uecYoF5s",
authDomain: "netflix-clone-4cc33.firebaseapp.com",
projectId: "netflix-clone-4cc33",
storageBucket: "netflix-clone-4cc33.firebasestorage.app",
messagingSenderId: "715062145362",
appId: "1:715062145362:web:3b331647ec76112db5ca8b"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const signup = async (name,email,password)=>{
    try {
       const res =  await createUserWithEmailAndPassword(auth, email,password);
       const user = res.user;
       await addDoc(collection(db , "users"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
       });
    } catch (err) {
        toast.error(err.code.split("/")[1].split("-").join(" "));
    }
};
const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (err) {
       toast.error(err.code.split("/")[1].split("-").join(" "));
    }
};
const logout =()=> signOut(auth);
export {auth ,db,login,signup,logout};