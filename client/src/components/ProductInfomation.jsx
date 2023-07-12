import React, { memo, useState } from 'react';
import { productInfoTabs } from '../ultils/constants';
const ProductInfomation = () => {
    const [isActiveTabs, setIsActiveTabs] = useState(1);

    return (
        <div>
            <div className='flex items-center gap-2 relative bottom-[-1px] transition duration-300 transform'>
                {productInfoTabs.map((el) => (
                    <span
                        key={el.id}
                        className={`py-2 px-4 cursor-pointer ${
                            isActiveTabs === el.id ? 'bg-white border border-b-0 animate-fade-in' : 'bg-gray-200'
                        }`}
                        onClick={() => {
                            setIsActiveTabs(el.id);
                        }}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className='w-full border h-[300px]'>{productInfoTabs.find((el) => el.id === isActiveTabs).name}</div>
        </div>
    );
};

export default memo(ProductInfomation);
