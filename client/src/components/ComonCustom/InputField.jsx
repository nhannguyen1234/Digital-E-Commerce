import React, { memo } from 'react';

const InputField = ({ value, setValue, nameKey, type, invalidFields, setInvalidFields }) => {
    return (
        <div className='w-full relative flex flex-col '>
            {value !== '' && (
                <label
                    className='absolute top-[-20px] text-[15px] font-normal pl-2 animate-slide-top-sm'
                    htmlFor={nameKey}
                >
                    {nameKey.charAt(0).toUpperCase() + nameKey.slice(1)}
                </label>
            )}
            <input
                // ref={inputRef}
                type={type || 'text'}
                className='px-4 py-3 rounded-md w-full  border placeholder:text-sm placeholder:italic outline-none'
                placeholder={nameKey.charAt(0).toUpperCase() + nameKey.slice(1)}
                value={value}
                id={nameKey}
                onChange={(e) => setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))}
                onFocus={() => setInvalidFields([])}
            />
            {invalidFields?.some((el) => el.name === nameKey) && (
                <small className='text-[14px] absolute top-[52px] left-2 animate-fade-in text-red-600 italic'>
                    {invalidFields?.find((el) => el.name === nameKey)?.mes}
                </small>
            )}
        </div>
    );
};

export default memo(InputField);
