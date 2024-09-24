import React, { useRef } from 'react'
import { collection,query,getDocs,where,limit,startAfter,orderBy } from 'firebase/firestore'
import{useEffect,useState} from 'react'
import { db } from '../FireBase/FireBase'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import {Item} from '../components/Item'
import Spinner from '../components/Spinner'
const Category = () => {
    const[list,Setlist]=useState([])
    const[loading,Setloading]=useState(true)
    const params=useParams()
    useEffect(()=>{
        //Can't put async/await in useEffect
        const fetch=async()=>{
            try{
                const Ref=collection(db,'listings');
              //Modular way of FireBase
                const q=query(Ref,where('type','==',params.Name),orderBy('timestamp','desc'),limit(10))
                const querySnap=await getDocs(q)
                 let listings=[];
                 querySnap.forEach((doc)=>{
                    return listings.push({
                        id:doc.id,
                        data:doc.data()
                    })
                 })
                Setlist(listings)
                Setloading(false)
            }catch(error){
           toast.error('Couldnt Fetch for some reason');
            }
        }
    fetch()},[])
    const inputRef=useRef()
    console.log(inputRef.current)
  return (
    <div className='category'>
        <header >
<p className='pageHeader' onClick={()=>console.log(inputRef.current)} ref={inputRef}>{params.Name==='rent'?'Places for Rent':'Places for Sale'}</p> 
        </header>
      <main>
        <ul className='categoryListings'>
          {loading&&<Spinner/>}
            {list.map((lis)=>{
                return(<Item lis={lis.data} id={lis.id}/>)
            })}
        </ul>
      </main>
    </div>
  )
}

export default Category
