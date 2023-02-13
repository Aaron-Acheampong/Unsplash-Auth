import React, { useContext } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';


export default function Delete({ deleteId, setIsDeleting, images, setImages }) {


  //const {currentUser} = useContext(AuthContext);
  //const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`api/posts/${deleteId}`);
      setImages(images.filter(image => image.id !== deleteId))
      setIsDeleting(false)
      /////navigate("/");
    } catch (err){
      console.log(err);
    }
  }

  return (
    <div className='bg-modalBackground font-noto-sans flex items-center justify-center overflow-y-auto fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full'>

        <div className='absolute w-[620px] h-[276.12px] left-[424px] top-[253px] bg-[#FFFFFF] rounded-xl border-solid border-[1px] '>
        <p className='absolute w-[155px] h-[33px] left-[32.36px] top-[21.64px] font-noto non-italic font-medium text-[24px] leading-[33px] text-[#333333]'>Are you sure?</p>

        <p onClick={() => {setIsDeleting(false)}} className='absolute w-[51px] h-[22px] left-[405px] top-[204px] font-noto non-italic font-medium text-[16px] text-[#BDBDBD] leading-[22px] hover:cursor-pointer'>Cancel</p>

        <button onClick={handleDelete} className='absolute w-[105px] h-[55px] left-[479.74px] bottom-[33.25px] bg-[#EB5757] rounded-xl shadow-4xl'>
            <p className='absolute w-[53px] h-[22px] top-[16.13px] left-[25.26px] font-noto non-italic font-bold text-[16px] leading-[22px] text-[#FFFFFF]'>Delete</p>
        </button>
        </div>


    </div>
  )
}
