import React, { useContext, useEffect, useState } from 'react';
import AddButton from '../components/AddButton';
import Delete from '../components/Delete';
import Logo from '../components/Logo';
import SearchBox from '../components/SearchBox';
import Add from '../components/Add';
import Images from '../components/Images';
import { Link, useNavigate } from 'react-router-dom';
//import { AuthContext } from '../context/authContext';
import axios from 'axios';

export default function Home() {

  //const {currentUser, logout} = useContext(AuthContext);

  //const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [param, setParam] = useState('');
  

  

    useEffect(() =>{
        const fetchImages = async () => {
          
            try {
              const res = await axios.get(`api/posts?label=${param}`);
              setIsLoading(false);
              setImages(res.data);
            } catch(err) {
              console.log(err);
            }
        };

        fetchImages();
    }, [param]);

  return (
    <div className='App p-4 md:p-10 flex flex-col min-h-screen gap-20'>
          <header className="flex sticky bg-white top-0 py-2 z-10 flex-wrap gap-4 justify-between w-full items-center font-noto-sans mb-4">
            <Link to="/">
              <Logo /> 
            </Link>
            
            { <SearchBox setIsLoading={setIsLoading} setParam={setParam}/> }
            { <AddButton setIsAdding={setIsAdding} /> }
          </header>
    
          
          {/* {currentUser ? (
                <button onClick={logout} className='absolute w-[137px] h-[55px] left-[1080px] top-[32px] drop-shadow-5xl shadow-4xl 
                bg-[#525553] rounded-xl font-noto non-italics font-bold text-[16px] leading-[22px] text-[#FFFFFF]'>logout</button>
            ) : (
                <Link className='link' to="/login">
                    <button onClick={logout} className='absolute w-[137px] h-[55px] left-[1080px] top-[32px] drop-shadow-5xl shadow-4xl 
                  bg-[#525553] rounded-xl font-noto non-italics font-bold text-[16px] leading-[22px] text-[#FFFFFF]'>login</button>
                </Link>
            )} */}
          {/* <button onClick={logout} className='absolute w-[137px] h-[55px] left-[1080px] top-[32px] drop-shadow-5xl shadow-4xl 
          bg-[#525553] rounded-xl font-noto non-italics font-bold text-[16px] leading-[22px] text-[#FFFFFF]'>logout</button> */}
          
          {isDeleting && <Delete deleteId={deleteId} setIsDeleting={setIsDeleting} images={images} setImages={setImages} /> }
          {isAdding && <Add setIsAdding={setIsAdding} /> }
          {<Images images={images} isLoading={isLoading} setDeleteId={setDeleteId} setIsDeleting={setIsDeleting} />}
    </div>
  )
}
