import React from 'react'

function Modal({children, close}) {
  return (
    <div className='z-[10000] fixed top-0 left-0 w-full h-full flex items-center justify-center'>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" onClick={close}></div>
      <div style={{backgroundColor: '#fff'}} className="max-w-lg min-w-sm w-full p-8 rounded-lg shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <button
          className="absolute top-4 right-4 text-2xl cursor-pointer bg-transparent outline-none border-none"
          onClick={close}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}


export default Modal