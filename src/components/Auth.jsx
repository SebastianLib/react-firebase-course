import React, { useState } from 'react'
import { auth,googleProvider } from "../config/firebase";
import { getAuth, signOut ,createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Auth = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const signIn = async() =>{
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error)
        }
    }

    const logout = async() =>{
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error)
        }
    }

    const signInWithGoogle = async() =>{
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='flex gap-x-4 my-4'>
        <input onChange={(e)=>setEmail(e.target.value)} className='border border-black p-2' type="text" placeholder='Email..'/>
        <input onChange={(e)=>setPassword(e.target.value)} className='border border-black p-2' type="password" placeholder='Password...'/>
        <button onClick={signIn} className='bg-gray-200 px-4 py-2 border border-black'>Sign in</button>    
    
        <button onClick={signInWithGoogle} className='bg-gray-200 px-4 py-2 border border-black'>Sign in with google </button>
        <button onClick={logout} className='bg-gray-200 px-4 py-2 border border-black'>Sign Out</button>
    </div>
  )
}

export default Auth