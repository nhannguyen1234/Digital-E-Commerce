import React, { memo } from 'react';
import clsx from 'clsx';
const InputForm = ({ label, disabled, register, nameKey, validate, errors, type = 'text', placeholder, fw, defaultValue, style }) => {
    return (
        <div className={clsx('flex flex-col h-16 gap-1', style)}>
            {label && (
                <label htmlFor={nameKey} className='text-base font-medium '>
                    {label}
                </label>
            )}
            <input
                type={type}
                id={nameKey}
                placeholder={placeholder}
                disabled={disabled}
                {...register(nameKey, validate)}
                className={clsx('form-input my-auto rounded-sm placeholder:italic', fw && 'w-full')}
                defaultValue={defaultValue}
            />
            {errors[nameKey] && <small className='text-xs text-red-600'>{errors[nameKey]?.message}</small>}
        </div>
    );
};

export default memo(InputForm);
