import React from 'react'

export default function AdvertCard({ advert }) {
  return (
    <div className='flex flex-col max-w-[240px] shadow-md rounded-10 cursor-pointer relative overflow-hidden mb-8'>
      {advert.image && (
        <div className='relative w-[240px] h-[200px] overflow-hidden flex justify-center items-center'>
          <img className='' src={`data:${advert.image.contentType};base64,${advert.image.data}`} />
        </div>
      )}
      {advert.title && (
        <span>{advert.title}</span>
      )}
      {advert.description && (
        <span>{advert.description}</span>
      )}
      {advert.price && (
        <span>{advert.price} $</span>
      )}
    </div>
  )
}
