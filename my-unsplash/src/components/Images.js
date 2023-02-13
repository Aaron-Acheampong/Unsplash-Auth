import React, { useEffect, useState } from 'react';
import Image from './Image';


export default function Images({ images, isLoading, setDeleteId, setIsDeleting }) {

    

  return (
    <>
        {isLoading 
        ? 
        <h2 className='flex items-center justify-center h-screen text-4xl text-center font-bold text-slate-800'>Loading...</h2> 
        : images.length > 0 ? (
            

         //   <section className='absolute container top-[162.76px] left-[99px] right-[98.13px]'>

               // <div className='absolute  grid grid-cols-1 gap-[46.25px] sm:grid-cols-2 md:grid-cols-3 '>
               <div className='sm:columns-2 md:columns-3 gap-8 '>

                    {images.map((image) => {
                      return  <Image key={image.id} image={image} setDeleteId={setDeleteId} setIsDeleting={setIsDeleting} />
                    })}
                </div>    

               // </div>

          //  </section>
        ) : (
            <h2 className='flex items-center justify-center h-screen text-4xl text-center font-bold text-slate-800'>No photos found</h2>
        )
        }  

        
    </>
  )
}
