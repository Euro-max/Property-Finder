
import './App.css';
import Explore from './pages/Explore'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Forgot from './pages/Forgot'
import Offers from './pages/Offers'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify';
import {Routes,Route} from 'react-router-dom'
import NavBar from './components/NavBar';
import 'react-toastify/dist/ReactToastify.css';
import Protected from './components/Protected';
import Category from './pages/Category';
import Create from './pages/Create';
import Listing from './pages/Listing';
import Update from './pages/Update';
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Explore/>}/>
      <Route path='/offers' element={<Offers/>}/>
      <Route path='/category/:Name' element={<Category/>}/>
      <Route path='/forgot' element={<Forgot/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile'element={<Protected/>}>
      <Route path='/profile' element={<Profile/>}/>
    
      </Route>
      <Route path='/create'element={<Protected/>}>
      <Route path='/create'element={<Create/>}></Route></Route>
      <Route path='/category/:Name/:listingId/' element={<Listing/>}/>
      <Route path='/edit-listing/:listingId' element={<Update />} />
    </Routes>
    <ToastContainer/>
    <NavBar/>
    </>
  );
}

export default App;
