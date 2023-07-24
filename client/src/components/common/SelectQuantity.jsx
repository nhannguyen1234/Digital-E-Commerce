import React, { memo } from 'react';
import icons from 'ultils/icons';
const { AiOutlinePlus, AiOutlineMinus } = icons;
const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity }) => {
    return (
        <div className='flex bg-[#f7f7f7]'>
            <span
                onClick={() => handleChangeQuantity('minus')}
                className='border-r border-black flex items-center justify-center h-[30px] w-[30px] cursor-pointer hover:bg-gray-800 transition duration-300 transform'
            >
                <AiOutlineMinus size={12} />
            </span>
            <input
                type='text'
                value={quantity}
                onChange={(e) => handleQuantity(e.target.value)}
                className='w-14 outline-none text-center bg-[#f7f7f7] h-[30px]'
            />
            <span
                onClick={() => handleChangeQuantity('plus')}
                className='border-l border-black flex items-center justify-center h-[30px] w-[30px] cursor-pointer hover:bg-gray-800 transition duration-300 transform'
            >
                <AiOutlinePlus size={12} />
            </span>
        </div>
    );
};

export default memo(SelectQuantity);
