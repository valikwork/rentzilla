import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { usePostAdvertMutation } from '../slices/advertApiSlice';
import { setAdverts } from '../slices/advertsSlice';
import MapLocationFinder from "./MapLocationFinder";
import CitySelect from "./ui/CitySelect";
import geocoder from "../utils/geocoder";
import LocationPin from "./svg/LocationPin";

const schema = yup.object().shape({
  title: yup.string().max(255).required("Title is a required field"),
  description: yup.string().max(1000).required("Description is a required field"),
  price: yup.string().max(10).required('No price provided.'),
  image: yup.mixed().required('File is required'),
  locationName: yup.string().required("Location is required"),
  locationLatLng: yup.array().of(yup.number()).required('Latitude and longitudes are required'),
});

const AdvertForm = ({ close }) => {

  const [postAdvert, { isLoading }] = usePostAdvertMutation();
  const dispatch = useDispatch();
  const allAdverts = useSelector(state => state.adverts.adverts)
  const [imageURL, setImageURL] = useState()
  const [map, setMap] = useState(null)

  const {
    watch,
    register,
    setValue,
    getValues,
    handleSubmit, 
    formState: { errors } 
  } = useForm({ resolver: yupResolver(schema) });
  
  const image = watch('image')
  const currentLatLng = watch('locationLatLng')
  const currentLocationName = watch('locationName')

  const onSubmit = async ({title, description, price, image}) => {
    const formData = new FormData();
    formData.append('title', title)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('image', image[0])
    formData.append('locationName', getValues('locationName'))
    formData.append('locationLatLng', getValues('locationLatLng'))
    try {
      const res = await postAdvert(formData).unwrap();
      res.advert && dispatch(setAdverts([...allAdverts, res.advert]))
      close()
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    image && image.length > 0 && setImageURL(URL.createObjectURL(image[0]))
  }, [image])

  const defaultPosition = [50.469647, 30.515440]

  const locationChangeHandler = (location) => {
    if(location.name && location.latlng) {
      setValue('locationName', location.name)
      setValue('locationLatLng', location.latlng)
    }
  }

  const deleteImgHandler = () => {
    setValue('image', undefined)
    setImageURL(undefined)
  }

  const citySelectHandler = useCallback((latLngString) => {
    const [lat, lng] = latLngString.split(',')
    if(map && lat && lng) {
      map.setView([lat, lng])
      geocoder.reverse({lat, lng}, map.options.crs.scale(map.getZoom()), (result) => {
        setValue('locationName', result[0].name)
        setValue('locationLatLng', [result[0].center.lat, result[0].center.lng])
      })
    }
  }, [map, setValue])

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
            {...register("title")}
          />
          {errors.title && <p className='text-rentzilaError mt-2'>{errors.title.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
            {...register("description")}
          />
          {errors.description && <p className='text-rentzilaError mt-2'>{errors.description.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
            {...register("price")}
          />
          {errors.price && <p className='text-rentzilaError mt-2'>{errors.price.message}</p>}
        </div>

        <div className="mb-4">
          <div className="relative bg-gray-100 p-4 rounded-md shadow-md">
            <input
              type="file"
              className="hidden"
              id="fileInput"
              {...register("image")}
            />
            {imageURL ? (
              <span className="flex gap-4">
                <img className='max-h-[100px]' src={imageURL} alt="" />
                <button className='text-sm text-black p-2 rounded-md' onClick={deleteImgHandler}>
                  Delete
                </button>
              </span>
            ) : (
              <label htmlFor="fileInput" className="cursor-pointer flex items-center justify-center p-4 space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span className="text-gray-500">Choose a file</span>
              </label>
            )}
          </div>
        </div>

        <div className="mb-2">
          <CitySelect onChange={citySelectHandler} />
        </div>
        <div className="mb-4">
          {currentLocationName && (
            <div className="flex gap-2 items-center mb-2">
              <LocationPin className="shrink-0" />
              <span className="">{currentLocationName}</span>
            </div>)
          }
          <MapContainer ref={setMap} style={{maxHeight: '150px'}} center={currentLatLng || defaultPosition} zoom={6}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {currentLatLng && currentLatLng && (
              <Marker position={currentLatLng} />
            )}
            <MapLocationFinder onClick={locationChangeHandler} />
          </MapContainer>
          {errors.locationName && <p className='text-rentzilaError mt-2'>{errors.locationName.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          {isLoading ? 'Sending' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AdvertForm;

