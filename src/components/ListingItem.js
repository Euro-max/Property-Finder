import React from 'react'
import { Link } from 'react-router-dom'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import { db } from '../FireBase/FireBase'
import { collection,deleteDoc,doc } from 'firebase/firestore'
import { toast } from 'react-toastify'


const ListingItem = ({listing,id,onDelete,onEdit}) => {
    console.log(listing)
    
  return (
    <li className='categoryListing'>
    <Link
      to={`/category/${listing?.type}/${id}`}
      className='categoryListingLink'
    >
      <img
        src={listing?.imgUrls[0]}
        alt={listing?.name}
        className='categoryListingImg'
      />
      <div className='categoryListingDetails'>
        <p className='categoryListingLocation'>{listing?.location}</p>
        <p className='categoryListingName'>{listing?.name}</p>

        <p className='categoryListingPrice'>
          $
          {listing?.offer
            ? listing?.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing?.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          {listing?.type === 'rent' && ' / Month'}
        </p>
        <div className='categoryListingInfoDiv'>
          <img src={bedIcon} alt='bed' />
          <p className='categoryListingInfoText'>
            {listing?.bedrooms > 1
              ? `${listing?.bedrooms} Bedrooms`
              : '1 Bedroom'}
          </p>
          <img src={bathtubIcon} alt='bath' />
          <p className='categoryListingInfoText'>
            {listing?.bathrooms > 1
              ? `${listing?.bathrooms} Bathrooms`
              : '1 Bathroom'}
          </p>
        </div>
        <button onClick={()=>onDelete(listing.id)}>Delete</button>
        <button onClick={()=>onEdit(listing.id)}>Update</button>
      </div>
     
    </Link>

   

   
  </li>
  )
}

export default ListingItem
