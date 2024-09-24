import React from 'react'
import { useState } from 'react';
import '../App.css';
import { auth } from '../FireBase/FireBase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import{ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import { Link } from 'react-router-dom';
const Forgot = () => {
  const onSubmit=async(e)=>{
e.preventDefault();
try{
await sendPasswordResetEmail(auth,email)
toast.success('Please Check your email right now')
}catch(error){
  toast.error('Please Try Again')
}
  }
  const onChange=(e)=>{
Setemail(e.target.value)
  }
  const[email,Setemail]=useState('')
  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
        <input type='email' className='emailInput' placeholder='Email' id='email' value={email} onChange={onChange}/>
        <Link to='/login' className='forgotPasswordLink'>Back to Login</Link>
        <div className='signInBar'>
          <div className='signInText'>Send Reset Email</div>
        <button type='submit' className='signinButton'><ArrowRightIcon width='34px' height='34px'/></button>
        
        </div>
        </form>
      </main>
    </div>
  )
}

export default Forgot
