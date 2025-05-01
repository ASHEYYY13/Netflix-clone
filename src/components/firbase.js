// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore,addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzxbzwov2QoaulAp0SNZ3AaY0MFok9ct0",
  authDomain: "netflixclone-bf6d1.firebaseapp.com",
  projectId: "netflixclone-bf6d1",
  storageBucket: "netflixclone-bf6d1.firebasestorage.app",
  messagingSenderId: "299714149166",
  appId: "1:299714149166:web:7e64fc4999485a239ed8bf",
  measurementId: "G-CSS3PTCNCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);


const signUp=async (name ,email, password)=>{
    try{
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db, "user"),{
            uid:user.uid,
            name,
            authProvider: "local",
            email,
        });
    } 
    catch(error){
        //  console.log(error);
        //  alert(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login =async (email,password)=>{
   try {
    await signInWithEmailAndPassword(auth,email,password);
   } catch (error) {
    // console.log(error);
    // alert(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
   }
}

const logout=()=>{
    signOut(auth);
}

export{auth, db, login, logout, signUp};
// const analytics = getAnalytics(app);