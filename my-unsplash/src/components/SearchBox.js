
import React, { useEffect, useState } from 'react'
import { MdSearch } from 'react-icons/md';
import debounce  from "lodash.debounce";

export default function SearchBox({ setIsLoading, setParam }) {
 

  const handleInput = (e) => {
    setParam(e.target.value);
    setIsLoading(true);
  }

  

    
//w-[107px] h-[19px]
  return (
    <form  id="fname" name="fname" className='absolute w-[300px] h-[55px] left-[261px] top-[32px] rounded-xl border-[1px] border-[#BDBDBD]'>
      <input onChange={debounce(handleInput, 500)}  type="text"  placeholder="Search by label" className='absolute h-full w-full rounded-xl bg-transparent indent-12 outline-none font-noto non-italic font-medium text-[14px] leading-[19px] text-[#BDBDB]' />
      <MdSearch className='absolute w-[24px] h-[24px] top-[18.5px] left-[19.12px] text-[#BDBDBD]'/>
    </form>
  )
};
