import React, { memo } from 'react';

const InputSelect = ({ value, changeValue, options }) => {
    return (
        <select
            className='form-select text-xs text-gray-700 cursor-pointer w-full py-3'
            value={value}
            onChange={(e) => changeValue(e.target.value)}
        >
            {options?.map((el) => (
                <option key={el.id} value={el.value} className='text-xs text-gray-700'>
                    {el.text}
                </option>
            ))}
        </select>
    );
};

export default memo(InputSelect);
