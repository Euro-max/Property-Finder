import React from 'react'
import{useEffect,useState,useRef} from 'react'
import { auth } from '../FireBase/FireBase'
import { db } from '../FireBase/FireBase'
import { v4 as uuidv4 } from 'uuid'
import { updateProfile,onAuthStateChanged } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useNavigate,useParams } from 'react-router-dom'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from 'firebase/storage'
  import { addDoc,collection,doc, getDoc, updateDoc} from 'firebase/firestore'
  import { serverTimestamp } from 'firebase/firestore'
const Update = () => {
    const navigate=useNavigate()
    const params=useParams()
    const[loading,setLoading]=useState(false)
    const[listing,setlisting]=useState(false)
    const[formData,setFormData]=useState({
        name:'',
        type:'rent',
        bedrooms:1,
        bathrooms:1,
        parking:false,
        furnished:false,
        address:'',
        images:{},
        offer:false,
        regularPrice:0,
        discountedPrice:0,
        lat:0,
        lng:0,
    })
    const{name,type,bedrooms,bathrooms,parking,furnished,address,images,offer,regularPrice,discountedPrice,lat,lng}=formData
       useEffect(()=>{
        setLoading(true)
        const fetchListing = async () => {
          const docRef = doc(db, 'listings', params.listingId)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            setlisting(docSnap.data())
            setFormData({ ...docSnap.data(), address: docSnap.data().location })
            setLoading(false)
          } else {
            navigate('/')
            toast.error('Listing does not exist')
          }
        }
    
        fetchListing()
      },[params.listingId,navigate])
      useEffect(() => {
        if (listing && listing.userRef !== auth.currentUser.uid) {
          toast.error('You can not edit that listing')
          navigate('/')
        }
      })
    //To prevent Memory Leaks
    const isMounted=useRef(true)
    useEffect(()=>{
     if(isMounted){
     onAuthStateChanged(auth,(user)=>{
        if(user){
            setFormData({...formData,userRef:user.uid})
        }
        else{
            navigate('/login')
        }
     })
     }
     return ()=>{
        isMounted.current=false
     }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isMounted])
    const onSubmit=async(e)=>{
       
        e.preventDefault()

    setLoading(true)

    if (discountedPrice > regularPrice) {
      setLoading(false)
      toast.error('Discounted price needs to be less than regular price')
      return
    }

    if (images.length > 6) {
      setLoading(false)
      toast.error('Max 6 images')
      return
    }
  

   


    const storeImage = async (image) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage()
          const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
  
          const storageRef = ref(storage, 'images/' + fileName)
  
          const uploadTask = uploadBytesResumable(storageRef, image)
  
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              console.log('Upload is ' + progress + '% done')
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused')
                  break
                case 'running':
                  console.log('Upload is running')
                  break
                default:
                  break
              }
            },
            (error) => {
              reject(error)
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL)
              })
            }
          )
        })
      }
  
      const imgUrls = await Promise.all(
        [...images].map((image) => storeImage(image))
      ).catch(() => {
        setLoading(false)
        toast.error('Images not uploaded')
        return
      })
  
      const formDataCopy = {
        ...formData,
        imgUrls,
        
        timestamp: serverTimestamp(),
      }
  
      formDataCopy.location = address
      delete formDataCopy.images
      delete formDataCopy.address
      !formDataCopy.offer && delete formDataCopy.discountedPrice
  
  const docRef=doc(db,'listings',params.listingId);
  updateDoc(docRef,formDataCopy)
      setLoading(false)
      toast.success('Listing saved')
      navigate(`/category/${formDataCopy.type}/${docRef.id}`)
 
    }

    const onMutate = (e) => {
        let boolean = null
    
        if (e.target.value === 'true') {
          boolean = true
        }
        if (e.target.value === 'false') {
          boolean = false
        }
    
        // Files
        if (e.target.files) {
          setFormData((prevState) => ({
            ...prevState,
            images: e.target.files,
          }))
        }
    
        // Text/Booleans/Numbers
        if (!e.target.files) {
          setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: boolean ?? e.target.value,
          }))
        }
        
      }
  return (
    <div className='profile'>
      <header>
        <p className='pageHeader'>Edit a Listing</p>
      </header>
      <form onSubmit={onSubmit}>
        <label className='formLabel'>Sell/Rent</label>
        <div className='formButtons'>
        <button type='button' className={type==='sale'?'formButtonActive':'formButton'} id='type' value='sale' onClick={onMutate}>Sell</button>
        <button type='button' className={type==='rent'?'formButtonActive':'formButton'} id='type' value='rent' onClick={onMutate}>Rent</button>
        </div>
        <label className='formLabel'>Name</label>
          <input
            className='formInputName'
            type='text'
            id='name'
            value={name}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
          />

          <div className='formRooms flex'>
            <div>
              <label className='formLabel'>Bedrooms</label>
              <input
                className='formInputSmall'
                type='number'
                id='bedrooms'
                value={bedrooms}
                onChange={onMutate}
                min='1'
                max='50'
                required
              />
            </div>
            <div>
              <label className='formLabel'>Bathrooms</label>
              <input
                className='formInputSmall'
                type='number'
                id='bathrooms'
                value={bathrooms}
                onChange={onMutate}
                min='1'
                max='50'
                required
              />
            </div>
          </div>

          <label className='formLabel'>Parking spot</label>
          <div className='formButtons'>
            <button
              className={parking ? 'formButtonActive' : 'formButton'}
              type='button'
              id='parking'
              value={true}
              onClick={onMutate}
              min='1'
              max='50'
            >
              Yes
            </button>
            <button
              className={
                !parking && parking !== null ? 'formButtonActive' : 'formButton'
              }
              type='button'
              id='parking'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className='formLabel'>Furnished</label>
          <div className='formButtons'>
            <button
              className={furnished ? 'formButtonActive' : 'formButton'}
              type='button'
              id='furnished'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !furnished && furnished !== null
                  ? 'formButtonActive'
                  : 'formButton'
              }
              type='button'
              id='furnished'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className='formLabel'>Address</label>
          <textarea
            className='formInputAddress'
            type='text'
            id='address'
            value={address}
            onChange={onMutate}
            required
          />

          

          <label className='formLabel'>Offer</label>
          <div className='formButtons'>
            <button
              className={offer ? 'formButtonActive' : 'formButton'}
              type='button'
              id='offer'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !offer && offer !== null ? 'formButtonActive' : 'formButton'
              }
              type='button'
              id='offer'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className='formLabel'>Regular Price</label>
          <div className='formPriceDiv'>
            <input
              className='formInputSmall'
              type='number'
              id='regularPrice'
              value={regularPrice}
              onChange={onMutate}
              min='50'
              max='750000000'
              required
            />
            {type === 'rent' && <p className='formPriceText'>$ / Month</p>}
          </div>

          {offer && (
            <>
              <label className='formLabel'>Discounted Price</label>
              <input
                className='formInputSmall'
                type='number'
                id='discountedPrice'
                value={discountedPrice}
                onChange={onMutate}
                min='50'
                max='750000000'
                required={offer}
              />
            </>
          )}

          <label className='formLabel'>Images</label>
          <p className='imagesInfo'>
            The first image will be the cover (max 6).
          </p>
          <input
            className='formInputFile'
            type='file'
            id='images'
            onChange={onMutate}
            max='6'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
          <button type='submit' className='primaryButton createListingButton'>
            Update Listing
          </button>
      </form>
    </div>
  )
}

export default Update

