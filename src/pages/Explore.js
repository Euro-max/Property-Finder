import React from 'react'
import '../App.css';
import rent from '../assets/jpg/rentCategoryImage.jpg'
import sell from '../assets/jpg/sellCategoryImage.jpg'
import { Link } from 'react-router-dom';
import { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { db } from '../FireBase/FireBase';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])
const Explore = () => {
  const navigate=useNavigate()
  const[loading,Setloading]=useState(true); //because we don't know whether the data is fetched or not
  const[listing,Setlisting]=useState(null);
  useEffect(()=>{
    const fetcher=async()=>{
    const Ref=collection(db,'listings');
    const q=query(Ref,limit(5),orderBy('timestamp','desc'))
    const qSnap=await getDocs(q);
    let listings=[]
    qSnap.forEach((doc)=>{
        listings.push({
          id:doc.id,
          data:doc.data(),
        })
    })
    console.log(listings)
    Setlisting(listings)
    Setloading(false)
  } 
  fetcher()
},[])
  return (
    <div className='explore'>
      <header>
        <p className='pageHeader'>Explore</p>
      </header>
      <main>
        <p className='exploreHeading'>Recommended</p>
        <Swiper slidesPerView={1} pagination={{clickable:true}}>
      {listing?.map(({ data, id })=>{
        return(
          <SwiperSlide key={id} onClick={()=>{navigate(`/category/${data.type}/${id}`)}}>
         <div style={{background:`url(${data?.imgUrls[0]}) center no-repeat`,backgroundSize:'cover'}}className='swiperSlideDiv'>
         <p className='swiperSlideText'>{data.name}</p>
                <p className='swiperSlidePrice'>
                  ${data?.discountedPrice ?? data?.regularPrice}{' '}
                  {data?.type === 'rent' && '/ month'}
                </p>

         </div>
        
         </SwiperSlide>
        )
      })}
      </Swiper>
        <p className='exploreCategoryHeading'>Categories</p>
        <div className='exploreCategories'>
          <Link to='/category/rent'>
          <img src={rent} alt='Rent' className='exploreCategoryImg'></img>
          <p className='exploreCategoryName'>Places for Rent</p></Link>
          <Link to='/category/sale'>
          <img src={sell} alt='sell' className='exploreCategoryImg'></img>
          <p className='exploreCategoryName'>Places for Sell</p></Link>
        </div>
      </main>
    </div>
  )
}

export default Explore
