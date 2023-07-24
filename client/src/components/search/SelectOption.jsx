import React from 'react';

const SelectOption = ({ icon }) => {
    return (
        <div className='w-10 h-10 border-[2px] bg-white rounded-full shadow-sm flex items-center justify-center hover:text-white hover:bg-gray-800 hover:border-none cursor-pointer transition-all'>
            {icon}
        </div>
    );
};

export default SelectOption;
