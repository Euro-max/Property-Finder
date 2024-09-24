import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import { useState } from 'react';
import{ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visbilityIcon from '../assets/svg/visibilityIcon.svg'
import { useNavigate,Link } from 'react-router-dom';
import { auth } from '../FireBase/FireBase';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import OAuth from '../components/OAuth';
const Login = () => {
  const[showPassword,Setshowpassword]=useState(false)
  const[formData,SetformData]=useState({
    email:'',
    password:''
  })
  const{email,password}=formData;
  const navigate=useNavigate();
  const onChange=(e)=>{
    SetformData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value,
    }))

  }
  const onSubmit=async(e)=>{
    try{
    e.preventDefault();
    const userCred=await signInWithEmailAndPassword(auth,email,password)
    if(userCred.user){
      navigate('/')
      toast.success(`Welcome Back ${email}`)
    }
  }catch(err){
 toast.error('Something went wrong')
  }
 
  }
  return (
    <>
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Welcome Back</p>
      </header>
    <form onSubmit={onSubmit}>
      <input type='email' className='emailInput' placeholder='Email' id='email' value={email} onChange={onChange}/>
<div className='passwordInputDiv'>
  <input type={showPassword?'text':'password'} className='passwordInput' placeholder='Password' id='password' value={password} onChange={onChange}/>
  <img src={visbilityIcon} className='showPassword' alt="Show Password" onClick={()=>Setshowpassword(!showPassword)}></img>
</div>
<Link to='/forgot' className='forgotPasswordLink'>Forgot Password</Link>
<div className='signInBar'>
  <p className='signInText'>Login</p>
  <button className='signInButton' type='submit'><ArrowRightIcon fill='#fff' width='34px' height='34px'/></button>
</div>
    </form>
    <OAuth/>
    <Link to='/signup' className='registerLink'>Sign Up instead</Link>
    </div>
      
    </>
  )
}

export default Login
