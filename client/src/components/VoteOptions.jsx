import React, { memo, useRef, useEffect, useState } from 'react';
import logo from '../assets/logo1.png';
import Button from './ComonCustom/Button';
import { voteOptions } from '../ultils/constants';
import { AiFillStar } from 'react-icons/ai';
const VoteOptions = ({ nameProduct, handleSubmitVoteOptions }) => {
    const modalRef = useRef();
    const [votingStar, setVotingStar] = useState(0);
    const [comments, setComments] = useState('');
    const [score, setScore] = useState(null);
    useEffect(() => {
        modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, []);
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
            className='flex flex-col bg-white w-[600px] text-[#4A4A4A] p-6 rounded-lg animate-slide-in-fwd-bottom items-center justify-center gap-6'
        >
            <img src={logo} alt='logo-img' className='w-[234px] object-contain items-center my-6' />
            <span className='font-semibold text-lg '>{`Reviews & comments ${nameProduct}`}</span>
            <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder='Please share some experiences about the product...'
                className='w-full h-32 border rounded-md placeholder:text-xs placeholder:italic placeholder:text-gray-500 text-sm'
            ></textarea>
            <div className='flex flex-col w-full border rounded-lg p-4'>
                <span className='justify-items-start font-semibold text-base'>How do you see this product?</span>
                <div className=' flex items-center gap-12 justify-center pt-4 w-full'>
                    {voteOptions.map((el) => (
                        <div
                            onClick={() => {
                                setVotingStar(el.id);
                                setScore(el.id);
                            }}
                            key={el.id}
                            className='flex w-[80px] h-[70px] flex-col items-center justify-center gap-1 cursor-pointer hover:bg-gray-200 rounded-md p-2 transition duration-300'
                        >
                            {votingStar >= el.id ? <AiFillStar color='orange' /> : <AiFillStar color='black' />}
                            <span>{el.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Button handleOnclick={() => handleSubmitVoteOptions({ comments, score })} fw name='Submit Review' />
        </div>
    );
};

export default memo(VoteOptions);
