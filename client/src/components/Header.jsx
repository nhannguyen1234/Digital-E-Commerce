import React from 'react';
import logo from '../assets/logo1.png';
import icons from '../ultils/icons';
const Header = () => {
    const { FaPhoneAlt, MdEmail, PiBagFill, RiAccountCircleFill } = icons;
    return (
        <div className="w-main h-[110px] flex justify-between border-b py-9">
            <img src={logo} alt="logo" className="w-[234px] object-contain items-center" />
            <div className="flex text-[13px] gap-4">
                <div className="flex flex-col items-center border-r px-4">
                    <span className="flex gap-4 font-semibold items-center">
                        <FaPhoneAlt color="red" />
                        <span> (+1800) 000 8808</span>
                    </span>
                    <span className="text-[12px]">Mon-Sat 9:00AM - 8:00PM</span>
                </div>
                <div className="flex flex-col items-center border-r pr-4">
                    <span className="flex gap-4 font-semibold items-center">
                        <MdEmail color="red" size={16} />
                        <span> SUPPORT@TADATHEMES.COM</span>
                    </span>
                    <span className="text-[12px]">Online Support 24/7</span>
                </div>
                <div className="flex items-center gap-2 border-r pr-4">
                    <PiBagFill color="red" size={24} />
                    <span className="text-[14px]"> 0 item</span>
                </div>
                <div className="flex items-center pr-4">
                    <RiAccountCircleFill size={24} />
                </div>
            </div>
        </div>
    );
};

export default Header;
