import React, { useState } from 'react';
import { Button, InputField } from 'components';
import { useParams } from 'react-router-dom';
import { apiResetPassword } from 'apis/user';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { validate } from 'ultils/helperFn';
import path from 'ultils/path';

const ResetPassword = () => {
    const [payload, setPayload] = useState({ password: '' });
    const [invalidFields, setInvalidFields] = useState([]);
    const { token } = useParams();
    const navigate = useNavigate();
    const handleResetPassword = async () => {
        const invalid = validate(payload, setInvalidFields);
        const newPassword = payload.password;
        if (invalid === 0) {
            const response = await apiResetPassword({ token, newPassword });
            navigate(`/${path.LOGIN}`);
            toast.success(response.mes, {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else {
            toast.warning('Invalid password', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    return (
        <div className='absolute animate-fade-in top-0 bottom-0 left-0 right-0 bg-white z-50 flex flex-col items-center py-8'>
            <div className='flex flex-col gap-4'>
                <label htmlFor='password' className='text-gray-900 cursor-pointer'>
                    Enter your new password:
                </label>
                <InputField
                    nameKey='password'
                    value={payload.password}
                    setValue={setPayload}
                    type='password'
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                />
                <div className='flex justify-end items-center w-full'>
                    <Button name='Submit' handleOnclick={handleResetPassword} />
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
