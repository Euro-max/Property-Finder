import React from 'react'
import{Navigate,Outlet} from 'react-router-dom'
import{useAuthStatus} from '../hooks/useAuthStatus'
import Spinner from './Spinner'

const Protected = () => {
const{loggedIn,check}=useAuthStatus()
if(check){
    return(<Spinner/>)
}
return loggedIn?<Outlet/>:<Navigate to='/login'/>
}

export default Protected
