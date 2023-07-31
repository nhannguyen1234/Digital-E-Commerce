import React, { memo } from 'react';
import clsx from 'clsx';
const InputSelectForm = ({ label, option = [], register, validate, nameKey, errors, style, fw, defaultValue }) => {
    return (
        <div className='flex flex-col gap-2'>
            {label && <label>{label}</label>}
            <select defaultValue={defaultValue} className={clsx('form-select', fw && 'w-full', style)} id={nameKey} {...register(nameKey, validate)}>
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
