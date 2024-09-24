import React from 'react'
import{getDoc,doc,collection} from 'firebase/firestore'
import { useState,useEffect, } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../FireBase/FireBase'
import share from '../assets/svg/shareIcon.svg'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import Spinner from '../components/Spinner'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])
const Listing = () => {
    const params=useParams()
    const[loading,SetLoading]=useState(true);
    const[listing,Setlisting]=useState(null);
    const[copied,Setcopied]=useState(false);
    const navigate=useNavigate()
    
    useEffect(()=>{
        const fetch=async()=>{
            const docRef=doc(db,'listings',params.listingId)
            const docSnap=await getDoc(docRef)
            console.log(docSnap.data());
            Setlisting(docSnap.data());
            SetLoading(false)
            }
            fetch()
    } ,[navigate,params.listingId])
    if (loading) {
      return <Spinner />
    }
return(
    <main>
   <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        {listing?.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${listing?.imgUrls[index]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='swiperSlideDiv'
            >
                {listing.type==='sale'?<img src={listing.imgUrls} className='w-screen h-full '/>:''}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className='shareIconDiv'
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          Setcopied(true)
          setTimeout(() => {
            Setcopied(false)
          }, 2000)
        }}
      >
        <img src={share} alt='' />
      </div>

      {copied && <p className='linkCopied'>Link Copied!</p>}

      <div className='listingDetails'>
        <p className='listingName'>
          {listing?.name} - $
          {listing?.offer
            ? listing?.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing?.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <p className='listingLocation'>{listing?.location}</p>
        <p className='listingType'>
          For {listing?.type === 'rent' ? 'Rent' : 'Sale'}
        </p>
        {listing?.offer && (
          <p className='discountPrice'>
            ${listing?.regularPrice - listing?.discountedPrice} discount
          </p>
        )}

        <ul className='listingDetailsList'>
          <li>
            {listing?.bedrooms > 1
              ? `${listing?.bedrooms} Bedrooms`
              : '1 Bedroom'}
          </li>
          <li>
            {listing?.bathrooms > 1
              ? `${listing?.bathrooms} Bathrooms`
              : '1 Bathroom'}
          </li>
          <li>{listing?.parking && 'Parking Spot'}</li>
          <li>{listing?.furnished && 'Furnished'}</li>
        </ul>
</div>
    </main>
)
}

export default Listing
