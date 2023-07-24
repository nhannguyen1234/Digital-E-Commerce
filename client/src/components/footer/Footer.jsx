import React, { memo } from 'react';
import icons from 'ultils/icons';
const {
    MdEmail,
    FaLocationDot,
    FaPhoneAlt,
    FaFacebookF,
    AiOutlineTwitter,
    BsPinterest,
    BsGoogle,
    FaLinkedin,
    FaDiscord,
} = icons;
const arrayIcons = [FaFacebookF, AiOutlineTwitter, BsPinterest, BsGoogle, FaLinkedin, FaDiscord];
const Footer = () => {
    return (
        <div className='w-full'>
            <div className='h-[104px] bg-hovermain flex items-center justify-center'>
                <div className='w-main flex items-center justify-between'>
                    <div className='flex flex-col text-white flex-1'>
                        <span className='text-[20px]'>SIGN UP TO NEWSLETTER</span>
                        <span className='text-[13px] text-gray-200 opacity-75'>
                            Subscribe now and receive weekly newsletter
                        </span>
                    </div>
                    <div className='flex-1 flex items-center'>
                        <input
                            type='text'
                            placeholder='Email address'
                            className='w-full p-4 pr-0 outline-none rounded-l-full bg-[#F04646] text-gray-200 placeholder:text-gray-200 placeholder:opacity-70 placeholder:text-sm '
                        />
                        <div className='flex items-center justify-center pr-4 w-[56px] h-[56px] cursor-pointer rounded-r-full bg-[#F04646]'>
                            <MdEmail color='white' size={18} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-[300px] bg-[#191919] text-[13px] text-white flex justify-center'>
                <div className='w-main flex pt-[50px]'>
                    <div className='flex-2 flex flex-col '>
                        <div className='border-l-[3px] border-hovermain pl-4 text-[15px] font-medium mb-4'>
                            ABOUT US
                        </div>
                        <span className='flex  items-center'>
                            <FaLocationDot size={13} />
                            <span className='p-2'>Address: </span>
                            <span className='opacity-70'>474 Ontario St Toronto, ON M4X 1M7 Canada</span>
                        </span>
                        <span className='flex items-center'>
                            <FaPhoneAlt size={13} />
                            <span className='p-2'>Phone: </span>
                            <span className='opacity-70'>(+1234)56789xxx</span>
                        </span>
                        <span className='flex  items-center'>
                            <MdEmail size={13} />
                            <span className='p-2'> Mail: </span>
                            <span className='opacity-70'>tadathemes@gmail.com</span>
                        </span>
                        <div className='flex gap-2 mt-4'>
                            {arrayIcons?.map((Icon, index) => (
                                <div
                                    key={index}
                                    className='w-10 h-10 bg-[#303030] rounded-[4px] flex items-center justify-center cursor-pointer'
                                >
                                    <Icon size={16} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex-1 flex flex-col gap-3'>
                        <div className='border-l-[3px] border-hovermain pl-4 text-[15px] font-medium mb-2'>
                            INFORMATION
                        </div>
                        <span className='text-[#b7b7b7] cursor-pointer hover:text-white'>Typography</span>
                        <span className='text-[#b7b7b7] cursor-pointer hover:text-white'>Gallery</span>
                        <span className='text-[#b7b7b7] cursor-pointer hover:text-white'>Store Location</span>
                        <span className='text-[#b7b7b7] cursor-pointer hover:text-white'>Today's Deals</span>
                        <span className='text-[#b7b7b7] cursor-pointer hover:text-white'>Contact</span>
                    </div>
                    <div className='flex-1 flex flex-col gap-3'>
                        <div className='border-l-[3px] border-hovermain pl-4 text-[15px] font-medium mb-2'>
                            WHO WE ARE
                        </div>
                        <span className='text-[#b7b7b7] cursor-pointer hover:text-white'>Help</span>
                        <span className='text-[#b7b7b7] cursor-pointer hover:text-white'>Free Shipping</span>
                        <span className='text-[#b7b7b7] cursor-pointer hover:text-white'>FAQs</span>
                        <span className='text-[#b7b7b7] cursor-pointer hover:text-white'>Return & Exchange</span>
                        <span className='text-[#b7b7b7] cursor-pointer hover:text-white'>Testimonials</span>
                    </div>
                    <div className='flex-1 flex flex-col gap-3'>
                        <div className='border-l-[3px] border-hovermain pl-4 text-[15px] font-medium mb-2'>
                            #DIGITALWORLDSTORE
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full bg-black text-[#b7b7b7] flex justify-center items-center text-[12px]'>
                <div className='w-main flex items-center justify-start py-4'>
                    <span>© 2023, Digital World 2 Powered by Shopify</span>
                </div>
            </div>
        </div>
    );
};

export default memo(Footer);
