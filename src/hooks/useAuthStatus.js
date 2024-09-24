import React from 'react'
import { auth } from '../FireBase/FireBase'
import { useEffect,useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

export const useAuthStatus = () => {
    const[loggedIn,SetloggedIn]=useState(false);
    const[check,Setcheck] = useState(true);
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                SetloggedIn(true)
            }
            Setcheck(false)
        })
    })
  return{loggedIn,check}
}


