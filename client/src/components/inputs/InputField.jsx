import React, { memo } from 'react';
import clsx from 'clsx';

const InputField = ({ value, setValue, nameKey, type, invalidFields, setInvalidFields, style, fw, placeholder }) => {
    return (
        <div className={clsx('w-full relative flex flex-col', fw && 'w-full')}>
            {value !== '' && (
                <label
                    className='absolute top-[-20px] text-[15px] font-normal pl-2 animate-slide-top-sm'
                    htmlFor={nameKey}
                >
                    {nameKey.charAt(0).toUpperCase() + nameKey.slice(1)}
                </label>
            )}
            <input
                type={type || 'text'}
                className={clsx(
                    'px-4 py-3 rounded-md border placeholder:text-sm placeholder:italic outline-none',
                    style ? style : 'w-full',
                )}
                placeholder={placeholder || nameKey.charAt(0).toUpperCase() + nameKey.slice(1)}
                value={value}
                id={nameKey}
                onChange={(e) => setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))}
                onFocus={() => setInvalidFields && setInvalidFields([])}
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
