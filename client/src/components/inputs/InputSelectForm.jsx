import React, { memo } from 'react';
import clsx from 'clsx';
const InputSelectForm = ({ label, option = [], register, validate, nameKey, errors, style, fw, defaultValue }) => {
    return (
        <div className={clsx('flex flex-col gap-1', style)}>
            {label && <label className='text-base font-medium'>{label}</label>}
            <select defaultValue={defaultValue} className={clsx('form-select placeholder:italic', fw && 'w-full')} id={nameKey} {...register(nameKey, validate)}>
                <option value=''>--Choose--</option>
                {option?.map((el, idx) => (
                    <option key={idx} value={el.code}>
                        {el.value}
                    </option>
                ))}
            </select>
            {errors[nameKey] && <small className='text-xs text-red-600'>{errors[nameKey?.message]}</small>}
        </div>
    );
};

export default memo(InputSelectForm);
