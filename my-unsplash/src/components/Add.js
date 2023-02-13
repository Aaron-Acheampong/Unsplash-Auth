import axios from 'axios';
import React, { useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';




export default function Add({setIsAdding }) {

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    label:"",
    url:""
  });

  const handleChange = (e) => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}));
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      
      await axios.post("api/posts/add", {...inputs, date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")});
      /*await fetch("api/posts/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...inputs, date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")})
      })*/
      setIsAdding(false);
      navigate("/");
    } catch(err) {
      console.log(err)
    }
  }


  
  return (
    <div className='bg-modalBackground font-noto-sans flex items-center justify-center overflow-y-auto fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full'>
      
      <div className='absolute w-[620px] h-[367.2px] left-[424.36px] top-[250.64px] bg-[#FFFFFF] rounded-xl border-solid border-[1px] '>
        <p className='absolute w-[195px] h-[33px] left-[32px] top-[24px] font-noto non-italic font-medium text-[24px] leading-[33px] text-[#333333]'>Add a new photo</p>

        <label htmlFor="label" className='absolute w-[37px] h-[19px] left-[32.05px] top-[77.91px] font-noto non-italic font-medium text-[14px] leading-[19px] text-[#4F4F4F]'>Label</label>
        <input onChange={handleChange} type="text" id="label" name="label" placeholder='Label...' className='absolute w-[552.33px] h-[55px] left-[32.05px] top-[106.89px] indent-4  font-noto non-italic font-medium text-[14px] border-solid border-[1px] box-border drop-shadow-6xl border-[#4F4F4F] leading-[19px] text-[#BDBDBD] rounded-xl' />

        <label htmlFor="url" className='absolute w-[71px] h-[19px] left-[32.05px] top-[180.43px] font-noto non-italic font-medium text-[14px] leading-[19px] text-[#4F4F4F]'>Photo URL</label>
        <input onChange={handleChange} type="text" id="label" name="url" placeholder='Url...' className='absolute w-[552.33px] h-[55px] left-[32.05px] top-[209.41px] indent-4 font-noto non-italic font-medium text-[14px] border-solid border-[1px] box-border drop-shadow-6xl border-[#4F4F4F] leading-[19px] text-[#BDBDBD] rounded-xl' />

        <p onClick={() => {setIsAdding(false)}} className='absolute w-[51px] h-[22px] left-[403.64px] top-[303.36px] font-noto non-italic font-medium text-[16px] text-[#BDBDBD] leading-[22px] hover:cursor-pointer'>Cancel</p>

        <button onClick={handleSubmit} className='absolute w-[105px] h-[55px] left-[479.38px] bottom-[23.8px] bg-[#3DB46D] rounded-xl shadow-4xl'>
            <p className='absolute w-[53px] h-[22px] top-[16.13px] left-[25.26px] font-noto non-italic font-bold text-[16px] leading-[22px] text-[#FFFFFF]'>Submit</p>
        </button>
        </div>


    </div>
  )
}
