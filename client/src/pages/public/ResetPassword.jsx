import React, { useState } from 'react';
import { Button } from '../../components';
import { useParams } from 'react-router-dom';
import { apiResetPassword } from '../../apis/user';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import path from '../../ultils/path';
const ResetPassword = () => {
    const [password, setPassword] = useState(null);
    const { token } = useParams();
    const navigate = useNavigate();
    const handleResetPassword = async () => {
        const response = await apiResetPassword({ token, password });
        if (response.success) {
            navigate(`/${path.LOGIN}`);
            toast.success(response.mes, {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else {
            toast.warning(response.mes, {
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
                <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Type here'
                    className='w-[800px] p-2 border-b outline-none placeholder:text-sm placeholder:italic placeholder:text-gray-400 rounded-md'
                />
                <div className='flex gap-2 justify-end items-center w-full'>
                    <Button name='Submit' handleOnclick={handleResetPassword} />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ResetPassword;
