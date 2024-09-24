import React from 'react'
import { Link } from 'react-router-dom'
import Bed from '../assets/svg/bedIcon.svg'
import Bath from '../assets/svg/bathtubIcon.svg'

export const Item = ({lis,id}) => {
  return (
    <div>
      <li className='categoryListing'>
        <Link to={`/category/${lis.type}/${id}`} className='categoryListingLink'>
        <img src={lis.imgUrls} alt={lis.id} className='categoryListingImg'/></Link>
        <div className='categoryListingDetails'>
            <p className='categoryListingLocation'>{lis.location}</p>
            <p className='categoryListingName'>{lis.name}</p>
            <p className='categoryListingPrice'>{lis.offer?lis.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','):lis.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}
                {lis.type==='rent'&&'/Month'}
            </p>
            <div className='categoryListingInfoDiv'>
                <img src={Bed} alt='bed'/>
               <p className='categoryListingInfoText'>{lis.bedrooms>1?`${lis.bedrooms} Bedrooms`:`${lis.bedrooms} bedroom`}</p> 
               <img src={Bath} alt='bath'/>
               <p className='categoryListingInfoText'>{lis.bathrooms>1?`${lis.bathrooms} Bathrooms`:`${lis.bathrooms} bathroom`}</p> 
            </div>
        </div>
      </li>
    </div>
  )
}


