import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField, Button } from '../../components';
import { ToastContainer, toast } from 'react-toastify';
import { apiRegister, apiLogin, apiForgotPassword } from '../../apis/user';
import { login } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';
import path from '../../ultils/path';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        mobile: '',
    });
    const [isRegister, setIsRegister] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [email, setEmail] = useState(null);
    const handleForgotPassword = async () => {
        const response = await apiForgotPassword({ email });
        if (response.success) {
            toast.success(response.mes, {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else {
            toast.warning(response.mes, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    const resetPayload = () => {
        setPayload({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            mobile: '',
        });
    };
    const handleSubmit = useCallback(async () => {
        const { firstname, lastname, phone, ...data } = payload;
        // Register logic
        if (isRegister) {
            const response = await apiRegister(payload);
            if (response.success) {
                toast.success('Register success!, Please Login', {
                    position: toast.POSITION.TOP_CENTER,
                });
                setIsRegister(false);
                resetPayload();
            } else {
                toast.error('Registration failed, please re-register', {
                    position: toast.POSITION.TOP_CENTER,
                });
                setIsRegister(true);
            }
            // Login logic
        } else {
            const result = await apiLogin(data);
            if (result.success) {
                dispatch(login({ isLoggedIn: true, token: result.accessToken, current: result.userData }));
                navigate(`/${path.HOME}`);
                toast.success('Login success!', {
                    position: toast.POSITION.TOP_CENTER,
                });
            } else {
                toast.error('Login failed, please check your email and password', {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        }
    }, [payload, isRegister, navigate, dispatch]);

    return (
        <div className='w-screen h-screen relative'>
            {isForgotPassword && (
                <div className='absolute animate-fade-in top-0 bottom-0 left-0 right-0 bg-overlay z-50 flex flex-col items-center py-8'>
                    <div className='flex flex-col gap-4'>
                        <label htmlFor='email' className='text-gray-900 cursor-pointer'>
                            Enter your Email:
                        </label>
                        <input
                            type='text'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Exp: email@gmail.com'
                            className='w-[800px] p-2 border-b outline-none placeholder:text-sm placeholder:italic placeholder:text-gray-400 rounded-md'
                        />
                        <div className='flex gap-2 justify-end items-center w-full'>
                            <Button name='Back' handleOnclick={() => setIsForgotPassword(false)} />
                            <Button name='Submit' handleOnclick={handleForgotPassword} />
                        </div>
                    </div>
                </div>
            )}
            <img
                src='https://frs.tptests.com/content/images/frs/login-page-background.png?fbclid=IwAR1ncCS9179Qpihy48szdx-Q9DS44NOrEzR18vhqK39_olA0afvhV_N2IlU'
                alt=''
                className='w-full h-full object-cover'
            />
            <div className='absolute top-0 left-0 right-1/2 bottom-0 flex items-center justify-center '>
                <div className='bg-gray-100 p-8 rounded-md min-w-[500px] shadow-2xl flex flex-col gap-5 items-center'>
                    <span className='text-[28px] font-semibold text-hovermain mb-3'>
                        {isRegister ? 'Register' : 'Login'}
                    </span>
                    {isRegister && (
                        <div className='flex w-full gap-2'>
                            <InputField value={payload.firstname} setValue={setPayload} nameKey='firstname' />
                            <InputField value={payload.lastname} setValue={setPayload} nameKey='lastname' />
                        </div>
                    )}
                    <InputField value={payload.email} setValue={setPayload} nameKey='email' />
                    <InputField value={payload.password} setValue={setPayload} nameKey='password' type='password' />
                    {isRegister && <InputField value={payload.mobile} setValue={setPayload} nameKey='mobile' />}
                    <Button name={isRegister ? 'Register' : 'Login'} handleOnclick={handleSubmit} fw />
                    <div className='flex w-full items-center justify-between text-[16px] my-2'>
                        {!isRegister && (
                            <span
                                onClick={() => setIsForgotPassword(true)}
                                className='text-gray-700 hover:text-hovermain hover:underline cursor-pointer'
                            >
                                Forgot your password?
                            </span>
                        )}
                        {!isRegister ? (
                            <span
                                onClick={() => {
                                    setIsRegister(true);
                                    resetPayload();
                                }}
                                className='text-gray-700 hover:text-hovermain hover:underline cursor-pointer'
                            >
                                Create account
                            </span>
                        ) : (
                            <span
                                onClick={() => {
                                    setIsRegister(false);
                                    resetPayload();
                                }}
                                className='text-gray-700 hover:text-hovermain hover:underline cursor-pointer w-full text-center'
                            >
                                Back to Login
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
