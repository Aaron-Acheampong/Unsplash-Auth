//import { format } from 'date-fns'
import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Image({ image, setDeleteId, setIsDeleting }) {
//w-[382.87px] h-[306.29px] relative w-full h-full bg-cover rounded-3xl font-montserrat cursor-pointer overflow-hidden
  return (
    <>
        <div className={`font-montserrat mb-4 mt-0 sm:mb-8 w-full h-full relative cursor-pointer sm:rounded-3xl overflow-hidden group min-w-0 break-inside-avoid`}>
          <LazyLoadImage key={image.id} src={image.url} alt={image.label} effect="" className="h-full w-full object-cover rounded-3xl" />
          {/*<img src={url} alt={label} loading="lazy" className="h-full w-full object-cover rounded-3xl" />*/}

          <div className='absolute sm:rounded-3xl p-6 flex flex-col justify-between top-0 left-0 w-full h-full bg-overlay transition-all scale-0 group-hover:scale-100 ease-in-out duration-200 delay-100'>
              <button onClick={() => {setDeleteId(image.id); setIsDeleting(true)}} className='self end w-[63px] h-[23px] rounded-[38px] top-[18px] right-[18px] border-solid border-[1px] border-[#EB5757] box-border text-[#EB5757] font-body font-medium text-[10px] lowercase leading-[12px]'>delete</button>

              <MdDeleteOutline onClick={() => {setDeleteId(image.id); setIsDeleting(true)}} className='left-[115px] top-[107.24px] h-[18px] w-[18px]'/>
              <p className='text-white text-lg font-bold capitalize'>{image.label}</p>
          </div>
          
        </div>
    </>
  )
}
