import React, { useCallback, useEffect, useState } from 'react';
import { InputField, Button } from '../../components';
import { apiRegister, apiLogin, apiForgotPassword } from '../../apis/user';
import { login } from '../../store/user/userSlice';
import { validate } from '../../ultils/helperFn';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import path from '../../ultils/path';

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
    const [invalidFields, setInvalidFields] = useState([]);
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
    const handleSubmit = useCallback(async () => {
        const { firstname, lastname, mobile, ...data } = payload;
        const invalids = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields);
        // Register logic
        if (invalids === 0) {
            if (isRegister) {
                const response = await apiRegister(payload);
                if (response.success) {
                    toast.success('Register success!, Please Login', {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    setIsRegister(false);
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
                    setTimeout(() => {
                        navigate(`/${path.HOME}`);
                        toast.success('Login success!', {
                            position: toast.POSITION.TOP_CENTER,
                        });
                    }, 100);
                } else {
                    toast.error('Login failed, please check your email and password', {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
            }
        }
    }, [payload, isRegister, navigate, dispatch]);
    const resetPayload = () => {
        setPayload({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            mobile: '',
        });
    };
    useEffect(() => {
        resetPayload();
        setInvalidFields([]);
    }, [isRegister]);
    return (
        <div className='w-screen h-screen relative animate-fade-in'>
            {isForgotPassword && (
                <div className='absolute animate-fade-in top-0 bottom-0 left-0 right-0 bg-overlay z-50 flex flex-col items-center py-8'>
                    <div className='flex flex-col gap-4'>
                        <label htmlFor='email' className='text-gray-900 cursor-pointer'>
                            Enter your Email:
                        </label>
                        <input
                            type='text'
                            id='email'
                            value={email || ''}
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
                <div className='bg-gray-100 p-8 rounded-md min-w-[500px] shadow-2xl flex flex-col gap-10 items-center'>
                    <span className='text-[28px] font-semibold text-hovermain mb-3 select-none'>
                        {isRegister ? 'Register' : 'Login'}
                    </span>
                    {isRegister && (
                        <div className='flex w-full gap-2'>
                            <InputField
                                nameKey='firstname'
                                value={payload.firstname}
                                setValue={setPayload}
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                            <InputField
                                nameKey='lastname'
                                value={payload.lastname}
                                setValue={setPayload}
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                        </div>
                    )}
                    <InputField
                        nameKey='email'
                        value={payload.email}
                        setValue={setPayload}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <InputField
                        nameKey='password'
                        value={payload.password}
                        setValue={setPayload}
                        type='password'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    {isRegister && (
                        <InputField
                            nameKey='mobile'
                            value={payload.mobile}
                            setValue={setPayload}
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
                    )}
                    <Button name={isRegister ? 'Register' : 'Login'} handleOnclick={handleSubmit} fw />
                    <div className='flex w-full items-center justify-between text-[16px] '>
                        {!isRegister ? (
                            <div className='flex flex-col w-full gap-2'>
                                <div className='flex w-full justify-between items-center'>
                                    <span
                                        onClick={() => setIsForgotPassword(true)}
                                        className='text-gray-700 hover:text-hovermain hover:underline cursor-pointer'
                                    >
                                        Forgot your password?
                                    </span>
                                    <span
                                        onClick={() => setIsRegister(true)}
                                        className='text-gray-700 hover:text-hovermain hover:underline cursor-pointer'
                                    >
                                        Create account
                                    </span>
                                </div>
                                <div className='flex items-center justify-center'>
                                    <Link
                                        to={`/${path.HOME}`}
                                        className='text-gray-700 hover:text-hovermain hover:underline cursor-pointer text-[16px]'
                                    >
                                        Back to Home
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <span
                                onClick={() => setIsRegister(false)}
                                className='text-gray-700 hover:text-hovermain hover:underline cursor-pointer w-full text-center'
                            >
                                Back to Login
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
