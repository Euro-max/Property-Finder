import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import { signInWithPopup,getAuth,GoogleAuthProvider } from 'firebase/auth'
import{doc,setDoc,getDoc, serverTimestamp} from 'firebase/firestore'
import { db } from '../FireBase/FireBase'
import googleIcon from '../assets/svg/googleIcon.svg' ;import { toast } from 'react-toastify'
{/*Named Import*/}
const OAuth = () => {
    const navigate=useNavigate();
    const location=useLocation();
   const onGoogle=async()=>{
    try{
        const auth=getAuth();
        const provider=new GoogleAuthProvider()
        const result=await signInWithPopup(auth,provider)
        const user=result.user
        const docRef=doc(db,'users',user.uid);
         const docSnap=await getDoc(docRef);
         if(!docSnap.exists()){
            await setDoc(doc(db,'users',user.uid),{
                name:user.displayName,
                email:user.email,
                timestamp:serverTimestamp(),
            });
         }
         navigate('/')
    }
    catch(e){
        toast.error(e.message)
    }

   }
  return (
    <div className='socialLogin'>
      <p>Sign{location.pathname==='/login'?'in':'up'} with</p>
      <button className='socialIconDiv' onClick={onGoogle}>
        <img src={googleIcon} alt='Google'></img>
      </button>
    </div>
  )
}

export default OAuth
