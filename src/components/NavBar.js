import React from 'react'
import { useNavigate,useLocation} from 'react-router-dom'
import{ReactComponent as OfferIcon} from '../assets/svg/localOfferIcon.svg'
import{ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg'
import{ReactComponent as PersonOutlineIcon} from '../assets/svg/personOutlineIcon.svg'
import '../App.css'

const NavBar = () => {
    const navigate=useNavigate()
    const location=useLocation()
    const path=(route)=>{
        if(route===location.pathname){
            return true;
        }

    }
  return (
    <footer className='navbar'>
        <nav className='navbarNav'>
            <ul className='navbarListItems'>
           <li className='navbarListItem' onClick={()=>navigate('/')}>
            <ExploreIcon fill={path('/')?'#2c2c2c':'#8f8f8f'} width='36px' height='36px' />
            <p className={path('/')?'navbarListItemNameActive':'navbarListName'}>Explore</p>
           </li>
           <li className='navbarListItem' onClick={()=>navigate('/offers')}>
            <OfferIcon fill={path('/offers')?'#2c2c2c':'#8f8f8f'} width='36px' height='36px'/>
            <p className={path('/offers')?'navbarListItemNameActive':'navbarListName'}>Offers</p>
           </li>
           <li className='navbarListItem' onClick={()=>navigate('/profile')}>
            <PersonOutlineIcon fill={path('/profile')?'#2c2c2c':'#8f8f8f'} width='36px' height='36px'/>
            <p className={path('/profile')?'navbarListItemNameActive':'navbarListName'}>Profile</p>
           </li>
            </ul>
        </nav>

      
    </footer>
  )
}

export default NavBar
