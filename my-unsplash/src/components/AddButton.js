import React from 'react'

export default function AddButton({ setIsAdding}) {

  const handleClick = () => {
    setIsAdding(true);
  }

  return (
        <button onClick={handleClick} className='absolute w-[137px] h-[55px] left-[1225px] top-[32px] drop-shadow-5xl shadow-4xl bg-[#3DB46D] rounded-xl'>
           <p className='absolute w-[97px] h-[22px] left-[20.13px] top-[16px] font-noto non-italics font-bold text-[16px] leading-[22px] text-[#FFFFFF]'>Add a photo</p>
        </button>
  )
}
