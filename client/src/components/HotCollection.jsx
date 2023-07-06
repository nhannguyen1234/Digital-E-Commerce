import React from 'react';
import { useSelector } from 'react-redux';
import icons from '../ultils/icons';
const { IoIosArrowForward } = icons;
const HotCollection = () => {
    const { categories } = useSelector((state) => state.app);
    return (
        <>
            <div className=' font-semibold text-[20px] w-full flex items-center justify-start border-b-2 border-b-red-600 pb-2 pt-4 '>
                HOT COLLECTIONS
            </div>
            <div className='flex flex-wrap gap-4 mt-4'>
                {categories
                    ?.filter((el) => el.brand.length > 0)
                    ?.map((el) => (
                        <div key={el._id} className='w-[396px]'>
                            <div className='border flex py-4'>
                                <div className='flex-1 flex  justify-center min-h-[204px]'>
                                    <img src={el?.image} alt='' className=' w-[144px] h-[130px] object-contain' />
                                </div>
                                <div className='flex-1 flex flex-col gap-3'>
                                    <div className='uppercase text-[14px] font-medium text-black leading-5'>
                                        {el.title}
                                    </div>
                                    <ul>
                                        {el?.brand?.map((item, index) => (
                                            <div className='flex items-center justify-start gap-1 '>
                                                <IoIosArrowForward size={13} color='gray' />
                                                <li
                                                    key={index}
                                                    className='text-gray-500 text-[14px] hover:text-hovermain pb-1 cursor-pointer'
                                                >
                                                    {item}
                                                </li>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default HotCollection;
