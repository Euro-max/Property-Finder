import React from 'react'
import { auth,db } from '../FireBase/FireBase';
import { updateProfile } from 'firebase/auth';
import{doc,updateDoc,collection,query,where,orderBy,getDoc,getDocs,deleteDoc} from 'firebase/firestore'
import { useEffect,useState } from 'react';
import { toast } from 'react-toastify';
import '../App.css';


import { useNavigate, useParams } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import Spinner from '../components/Spinner';
const Profile = () => {
  const[det,Setdet]=useState(false)

  const[formData,SetformData]=useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email,

  })
  const params=useParams()
  const onChange=(e)=>{
    SetformData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value,
    }))

  }
  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)
  const{name,email}=formData
  const navigate=useNavigate()
  const onLogOut=()=>{
    auth.signOut();
    navigate('/')
  }
  /* If you reload You will be logged out
  Why? React renders the component before fetching FireBaseb 
  useEffect(()=>{
    Setuser(auth.currentUser)
  })*/

 const onSubmit=async()=>{
try{
  if(auth.currentUser.displayName!==name){
await updateProfile(auth.currentUser,{
  displayName:name,

})
const userRef=doc(db,'users',auth.currentUser.uid)
await updateDoc(userRef,{
name
})
  }

}catch(errpr){
toast.error('Could npt Update Profile Details')
}
 }
 const[listing,Setlisting]=useState([])
 const[loading,Setloading]=useState(true);
 useEffect(()=>{
  const fetchy=async()=>{
    const Ref=collection(db,'listings');
    const q=query(Ref,where('userRef','==',auth.currentUser.uid))
    const qSnap=await getDocs(q)
    let listings=[];
    qSnap.forEach((doc)=>{
      return listings.push({
        id:doc.id,
        data:doc.data()
      })
    })
    console.log(listings)
    Setlisting(listings);
Setloading(false)
  }
  fetchy()
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[auth.currentUser.uid])
 if(loading){
  return <Spinner/>
 }
 const onDelete=async(id)=>{
  try{
    if(window.confirm('Are you sure you want to delete')){
        const Ref=doc(db,'listings',id);
    await deleteDoc(Ref)
    const updated=listing.filter((item)=>item.id!==id)
    Setlisting(updated)
    }
}catch(error){
    toast.error(`${error.message}`)
}

}
return <>
<div className='profile'>
  <header className='profileHeader'>
    <p className='pageHeader'>Profile</p>
    <button className='logOut'onClick={onLogOut}>LogOut</button>
  </header>
  <main>
    <div className='profileDetailsHeader'>
      <p className='profileDetailsText'>Personal Details</p>
      <p className='changePersonalDetails' onClick={()=>{
        det &&onSubmit()
        Setdet(!det)
      }}>
        {det?'done':'change'}
      </p>
    </div>
    <div className='profileCard'>
      <form>
        <input type='text'id='name' className={!det?'profileName':'profileNameActive'} placeholder='Name' value={name} onChange={onChange} disabled={!det}></input>
        <input type='email'id='email' className={!det?'profileEmail':'profileEmailActive'} placeholder='Email' value={email} onChange={onChange} disabled={!det}></input>
      </form>
    </div>
    {!loading && listing?.length > 0 && (
          <>
            <p className='listingText'>Your Listings</p>
            <ul className='listingsList'>
              {listing.map((list) => (
                console.log(list.data),
              <ListingItem   key={list.id}
              listing={list.data}
              id={list.id}
              onDelete={()=>onDelete(list.id)}
              onEdit={()=>onEdit(list.id)}/>
              ))}
            </ul>
          </>
        )}
  </main>
</div>
</>
}

export default Profile
