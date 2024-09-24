import React from 'react'
import { collection,query,getDocs,where,limit,startAfter,orderBy } from 'firebase/firestore'
import{useEffect,useState} from 'react'
import { db } from '../FireBase/FireBase'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import {Item} from '../components/Item'
import Spinner from '../components/Spinner'
const Offers = () => {
    const[list,Setlist]=useState([])
    const[loading,Setloading]=useState(true)
    const params=useParams()
    const [rating, setRating] = useState(10);
   
    useEffect(()=>{
        //Can't put async/await in useEffect
        const fetch=async()=>{
            try{
                const Ref=collection(db,'listings');
              //Modular way of FireBase
                const q=query(Ref,where('offer','==',true),orderBy('timestamp','desc'),limit(10))
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
    if(loading){
      return <Spinner/>
    }
  return (
    <div className='category'>
        <header >

        </header>
      <main>
        <ul className='categoryListings'>
            {list.map((lis)=>{
                return(<Item lis={lis.data} id={lis.id}/>)
            })}
        </ul>
        <ul className='rating'>
        <ul className='rating'>
      {Array.from({ length: 10 }, (_, i) => (
        <li key={`rating-${i + 1}`}>
          <input
            type='radio'
            id={`num${i + 1}`}
            name='rating'
            value={i + 1}
            checked={rating === i + 1}
           
     
          />
          <label htmlFor={`num${i + 1}`}>{i + 1}</label>
        </li>
      ))}
    </ul>
        </ul>
      </main>
    </div>
  )
}

export default Offers
