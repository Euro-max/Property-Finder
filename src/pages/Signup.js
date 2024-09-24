import React from 'react'
import '../App.css';
import { toast } from 'react-toastify';
import { auth } from '../FireBase/FireBase';
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { db } from '../FireBase/FireBase';
import{doc,setDoc,serverTimestamp} from 'firebase/firestore';
import { useState } from 'react';
import{ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visbilityIcon from '../assets/svg/visibilityIcon.svg'
import { useNavigate,Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
const Signup = () => {
  const[showPassword,Setshowpassword]=useState(false)
  const[formData,SetformData]=useState({
    name:'',
    email:'',
    password:''
  })
  const{name,email,password}=formData;
  const navigate=useNavigate();
  const onChange=(e)=>{
    SetformData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value,
    }))

  }
  const onSubmit=async(e)=>{
e.preventDefault();
try{
const userCred=await createUserWithEmailAndPassword(auth,email,password)
const user=userCred.user;
updateProfile(auth.currentUser,{displayName:name})
//WE dont want to change the form state
const formCopy={...formData};
delete formCopy.password
formCopy.timestamp=serverTimestamp();
//Add user data to firestore
await setDoc(doc(db,'users',user.uid),formCopy)
navigate('/')
}catch(err){
toast.error('Wrong User Credentials')
}
  }
  return (
    <>
      
 
      
      <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Welcome Back</p>
      </header>
    <form onSubmit={onSubmit}>
    <input type='text' className='nameInput' placeholder='Name' id='name' value={name} onChange={onChange}/>
      <input type='email' className='emailInput' placeholder='Email' id='email' value={email} onChange={onChange}/>
<div className='passwordInputDiv'>
  <input type={showPassword?'text':'password'} className='passwordInput' placeholder='Password' id='password' value={password} onChange={onChange}/>
  <img src={visbilityIcon} className='showPassword' alt="Show Password" onClick={()=>Setshowpassword(!showPassword)}></img>
</div>
<Link to='/forgot' className='forgotPasswordLink'>Forgot Password</Link>
<div className='signUpBar'>
  <p className='signUpText'>Sign Up</p>
  <button className='signInButton' type='submit'><ArrowRightIcon fill='#fff' width='34px' height='34px'/></button>
</div>
    </form>
    <OAuth/>
    <Link to='/login' className='registerLink'>Log in instead</Link>
    </div>
    </>
  )
}

export default Signup
