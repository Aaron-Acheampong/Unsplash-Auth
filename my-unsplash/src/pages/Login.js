import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from '../hooks/useAuth';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Login() {

  const { setCurrentUser, persist, setPersist, login, register } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";


    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: ""
      });

      const [validUser, setValidUser] = useState(false);
      const [userFocus, setUserFocus] = useState(false);

      const [validEmail, setValidEmail] = useState(false);
      const [emailFocus, setEmailFocus] = useState(false);

      const [validPwd, setValidPwd] = useState(false);
      const [PwdFocus, setPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    //const {login, register} = useContext(AuthContext);

    useEffect(() => {
      setErrMsg('');
  }, [inputs])



    const handleChange = (e)=> {
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}));
      };

      const handleLogin = async (e) => {
        e.preventDefault()
        const v1 = USER_REGEX.test(inputs.username);
        const v2 = PWD_REGEX.test(inputs.password);
        const v3 = EMAIL_REGEX.test(inputs.email);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }


        try {
          await login( inputs); 
          navigate(from, { replace: true });
        } catch(err) {
          if (!err?.response) {
            setErrMsg("No Server Response");
          } else if (err.response?.status === 400) {
            setErrMsg("Missing Username or Password");
          } else if (err.response?.status === 401) {
            setErrMsg("Unauthorized");
          } else {
            setErrMsg("Login Failed");
          }
          
        }
      }

      const handleRegister = async (e) => {
        e.preventDefault()
        const v1 = USER_REGEX.test(inputs.username);
        const v2 = PWD_REGEX.test(inputs.password);
        const v3 = EMAIL_REGEX.test(inputs.email);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }


        try {
          await register(inputs); 
          navigate('/login');
        } catch(err) {
          if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 409) {
            setErrMsg('Username Taken');
        } else {
            setErrMsg('Registration Failed')
        }
        }
      }

      useEffect(() => {
        const result = USER_REGEX.test(inputs.username);
        setValidUser(result);
        if (result) setUserFocus(true);
    }, [inputs.username]);

      useEffect(() => {
        const result = EMAIL_REGEX.test(inputs.username);
        setValidEmail(result);
        if (result) setEmailFocus(true);
    }, [inputs.email]);

      useEffect(() => {
        const result = Pwd_REGEX.test(inputs.username);
        setValidPwd(result);
        if (result) setPwdFocus(true);
    }, [inputs.password]);



  const togglePersist = () => {
      setPersist(prev => !prev);
  }

  useEffect(() => {
      localStorage.setItem("persist", persist);
  }, [persist])


    
  return (
    <div className='h-[1146px] w-full bg-[#204466]'>
        <div className='absolute left-[424px] top-[253px] bg-[#959c93] rounded-xl border-solid border-[1px] shadow-4xl'>
            <p className='absolute w-[155px] h-[33px] left-[32.36px] top-[21.64px] font-noto non-italic font-medium text-[24px] leading-[33px] text-[#333333]'>Sign In</p>

            
            <label htmlFor="duser" className='absolute w-[65px] h-[19px] left-[32.41px] top-[75.56px] font-noto non-italic font-medium text-[14px] leading-[19px] text-[#4F4F4F]'>Username</label> { validUser ? <span className='text-green-500 ml-[0.25rem]'><FontAwesomeIcon icon={faCheck} /> </span> : <span className='text-red-500 ml-[0.25rem]'><FontAwesomeIcon icon={faTimes} /> </span>}
            <input onChange={handleChange} onFocus={() => setUserFocus(true)} onBlur={() => setUserFocus(false)} required type="text" autoComplete='off' id="duser" name="user" placeholder='Username...' className='absolute w-[552.33px] h-[55px] bg-[#2b2626] left-[32.41px] top-[104.53px] indent-4 font-noto non-italic font-medium text-[14px] border-solid border-[1px] box-border drop-shadow-6xl border-[#4F4F4F] leading-[19px] text-[#BDBDBD] rounded-xl' />
            {userFocus && <p className='text-[0.75rem] bg-[#000] rounded-[0.5rem] text-[#fff]'>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.<br />
                  Must begin with a letter.<br />
                  Letters, numbers, underscores, hyphens allowed.
              </p>}

            <label htmlFor="dmail" className='absolute w-[65px] h-[19px] left-[32.41px] top-[75.56px] font-noto non-italic font-medium text-[14px] leading-[19px] text-[#4F4F4F]'>E-mail</label>{ validEmail ? <span className='text-green-500 ml-[0.25rem]'><FontAwesomeIcon icon={faCheck} /> </span> : <span className='text-red-500 ml-[0.25rem]'><FontAwesomeIcon icon={faTimes} /> </span>}
            <input onChange={handleChange} onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} required type="email" autoComplete='off' id="dmail" name="email" placeholder='Email...' className='absolute w-[552.33px] h-[55px] bg-[#2b2626] left-[32.41px] top-[104.53px] indent-4 font-noto non-italic font-medium text-[14px] border-solid border-[1px] box-border drop-shadow-6xl border-[#4F4F4F] leading-[19px] text-[#BDBDBD] rounded-xl' />
            {emailFocus && <p className='text-[0.75rem] bg-[#000] rounded-[0.5rem] text-[#fff]'>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Follow Email Format.
              </p>}

            <label htmlFor="dpane" className='absolute w-[65px] h-[19px] left-[32.41px] top-[175.95px] font-noto non-italic font-medium text-[14px] leading-[19px] text-[#4F4F4F]'>Password</label>{ validPwd ? <span className='text-green-500 ml-[0.25rem]'><FontAwesomeIcon icon={faCheck} /> </span> : <span className='text-red-500 ml-[0.25rem]'><FontAwesomeIcon icon={faTimes} /> </span>}
            <input onChange={handleChange} onFocus={() => setPwdFocus(true)} onBlur={() => setPwdFocus(false)} required type="password" autoComplete='off' id="dpane" name="password" placeholder='Password...' className='absolute w-[552.33px] h-[55px] left-[32.41px] top-[204.53px] bg-[#2b2626] indent-4 font-noto non-italic font-medium text-[14px] border-solid border-[1px] box-border drop-shadow-6xl border-[#4F4F4F] leading-[19px] text-[#BDBDBD] rounded-xl' />
            {PwdFocus && <p className='text-[0.75rem] bg-[#000] rounded-[0.5rem] text-[#fff]'>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters.<br />
                  Must include uppercase and lowercase letters, a number and a special character.<br />
                  Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                       
              </p>}

            <p  className='absolute w-[51px] h-[22px] left-[405px] bottom-[50px] font-noto non-italic font-medium text-[16px] text-[#333333] leading-[22px] hover:cursor-pointer'>Cancel</p>

            <button onClick={handleLogin} className='absolute w-[105px] h-[55px] left-[479.74px] bottom-[33.25px] bg-[#1d241a] rounded-xl shadow-4xl'>
                <p className='absolute w-[53px] h-[22px] top-[16.13px] left-[25.26px] font-noto non-italic font-bold text-[16px] leading-[22px] text-[#FFFFFF]'>login</p>
            </button>

            <div className="persistCheck text-[0.75rem] mt-[10px] flex justify-start items-end">
                    <input
                    className='h-[20px] w-[20px] ml-0 mt-[5px] mr-[2px] mb-[2px]'
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist" className='m-0'>Trust This Device</label>
                </div>

            {errMsg && <p className='text-[12px] text-[red] text-center'>{err}</p>}

            <button onClick={handleRegister}  className='absolute w-[155px] h-[55px] left-[32.36px] bottom-[32.64px]  bg-[#a4a5a3] rounded-xl shadow-4xl font-noto non-italic font-medium text-[20px] leading-[33px] text-[#333333] hover:text-[#e44747]'>Create User</button>
        </div>
    </div>
  )
}
