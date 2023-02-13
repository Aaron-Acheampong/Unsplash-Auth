import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

export default function Login() {

    
    const [inputs, setInputs] = useState({
        username:"",
        password:""
      });
    const [err, setErr] = useState(null);

    const {login} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e)=> {
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}));
      };

      const handleLogin = async (e) => {
        e.preventDefault()
        try {
          await login( inputs); 
          navigate('/');
        } catch(err) {
          setErr(err.response.data)
        }
      }

      const handleRegister = async (e) => {
        e.preventDefault()
        try {
          await axios.post("/auth/register", inputs); 
          navigate('/login');
        } catch(err) {
          setErr(err.response.data)
        }
      }

    
  return (
    <div className='h-[1146px] w-full bg-[#204466]'>
        <div className='absolute w-[620px] h-[380.12px] left-[424px] top-[253px] bg-[#959c93] rounded-xl border-solid border-[1px] shadow-4xl'>
            <p className='absolute w-[155px] h-[33px] left-[32.36px] top-[21.64px] font-noto non-italic font-medium text-[24px] leading-[33px] text-[#333333]'>Sign In</p>

            
            <label htmlFor="dmail" className='absolute w-[65px] h-[19px] left-[32.41px] top-[75.56px] font-noto non-italic font-medium text-[14px] leading-[19px] text-[#4F4F4F]'>E-mail</label>
            <input onChange={handleChange} required type="email" autoComplete='off' id="dmail" name="email" placeholder='Email...' className='absolute w-[552.33px] h-[55px] bg-[#2b2626] left-[32.41px] top-[104.53px] indent-4 font-noto non-italic font-medium text-[14px] border-solid border-[1px] box-border drop-shadow-6xl border-[#4F4F4F] leading-[19px] text-[#BDBDBD] rounded-xl' />


            <label htmlFor="dpane" className='absolute w-[65px] h-[19px] left-[32.41px] top-[175.95px] font-noto non-italic font-medium text-[14px] leading-[19px] text-[#4F4F4F]'>Password</label>
            <input onChange={handleChange} required type="password" autoComplete='off' id="dpane" name="password" placeholder='Password...' className='absolute w-[552.33px] h-[55px] left-[32.41px] top-[204.53px] bg-[#2b2626] indent-4 font-noto non-italic font-medium text-[14px] border-solid border-[1px] box-border drop-shadow-6xl border-[#4F4F4F] leading-[19px] text-[#BDBDBD] rounded-xl' />

            <p  className='absolute w-[51px] h-[22px] left-[405px] bottom-[50px] font-noto non-italic font-medium text-[16px] text-[#333333] leading-[22px] hover:cursor-pointer'>Cancel</p>

            <button onClick={handleLogin} className='absolute w-[105px] h-[55px] left-[479.74px] bottom-[33.25px] bg-[#1d241a] rounded-xl shadow-4xl'>
                <p className='absolute w-[53px] h-[22px] top-[16.13px] left-[25.26px] font-noto non-italic font-bold text-[16px] leading-[22px] text-[#FFFFFF]'>login</p>
            </button>
            {err && <p className='text-[12px] text-[red] text-center'>{err}</p>}

            <button onClick={handleRegister}  className='absolute w-[155px] h-[55px] left-[32.36px] bottom-[32.64px]  bg-[#a4a5a3] rounded-xl shadow-4xl font-noto non-italic font-medium text-[20px] leading-[33px] text-[#333333] hover:text-[#e44747]'>Create User</button>
        </div>
    </div>
  )
}
