import React from 'react'

export default function AddAdvertButton({onClick = () => {}}) {
  return (
    <button 
      className="bg-[#ceff7b] text-rentzilaDark py-2 px-4 rounded-md hover:bg-yellow-400 focus:outline-none focus:shadow-outline-yellow"
      onClick={onClick}
    >
      <span className='text-lg mr-2'>+</span> Add Advert
    </button>
  )
}
