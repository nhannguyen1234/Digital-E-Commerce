import React, { useCallback, useEffect, useState } from 'react';
import { apiDeleteUserByAdmin, apiGetAllUser, apiUpdateUserByAdmin } from 'apis/user';
import moment from 'moment';
import icons from 'ultils/icons';
import { Button, InputField, InputForm, InputSelectForm, Pagination } from 'components';
import useDebounce from 'hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { roles, isBlocked } from 'ultils/constants';
import clsx from 'clsx';

const { AiFillEdit, RiDeleteBin6Line, GrStatusGoodSmall, MdCancel } = icons;

const ManageUser = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        email: '',
        firstname: '',
        lastname: '',
        role: '',
        phone: '',
        isBlocked: '',
    });
    const [users, setUsers] = useState(null);
    const [queries, setQueries] = useState({
        search: '',
    });
    const [edit, setEdit] = useState(null);
    const [update, setUpdate] = useState(false);
    const [params] = useSearchParams();
    const rerender = useCallback(() => {
        setUpdate(!update);
    }, [update]);
    const queriesDebounce = useDebounce(queries.search, 800);
    const fetchUsers = async (params) => {
        const response = await apiGetAllUser({ ...params, limit: process.env.REACT_APP_USER_LIMIT });
        if (response.success) setUsers(response);
    };
    useEffect(() => {
        const queries = Object.fromEntries([...params]);
        if (queriesDebounce) queries.search = queriesDebounce;
        fetchUsers(queries);
    }, [queriesDebounce, params, update]);
    const handleUpdate = async (data) => {
        const response = await apiUpdateUserByAdmin(edit._id, data);
        if (response.success) {
            setEdit(null);
            rerender();
            toast.success(response.mes);
        } else toast.error(response.mes);
    };
    const handleDeleteUser = (uid) => {
        Swal.fire({
            title: 'Delete user by Admin',
            text: 'Do you want to delete this user?',
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeleteUserByAdmin(uid);
                if (response.success) {
                    rerender();
                    toast.success(response.mes);
                } else toast.error(response.mes);
            }
        });
    };
    return (
        <div className='w-full'>
            <div className='h-[75px] flex items-center justify-between text-3xl font-bold px-4 border-b shadow-md '>
                <span>Manage User</span>
            </div>
            <div className='w-full p-4'>
                <form onSubmit={handleSubmit(handleUpdate)}>
                    <div className='flex py-4 w-full '>
                        <InputField nameKey='search' value={queries.search} setValue={setQueries} style={'w-[500px]'} placeholder={'Search users'} />
                        {edit && <Button name='Update' type='submit' fw={true} />}
                    </div>
                    <table className='table-auto mb-6 text-left w-full'>
                        <thead className='font-medium bg-[#2b3a4a] text-sm border border-[#2b3a4a] text-white'>
                            <tr>
                                <th className='px-4 py-2'>#</th>
                                <th className='px-4 py-2'>Email address</th>
                                <th className='px-4 py-2'>First name</th>
                                <th className='px-4 py-2'>Last name</th>
                                <th className='px-4 py-2'>Role</th>
                                <th className='px-4 py-2'>Phone</th>
                                <th className='px-4 py-2'>Status</th>
                                <th className='px-4 py-2'>Created At</th>
                                <th className='px-4 py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.users?.map((el, idx) => (
                                <tr key={el._id} className='border border-[#2b3a4a]'>
                                    <td className='px-4 py-2 text-sm font-normal'>{idx + 1}</td>
                                    <td className='px-4 py-2 text-sm font-normal'>
                                        {edit?._id === el._id ? (
                                            <InputForm
                                                register={register}
                                                fw
                                                errors={errors}
                                                nameKey={'email'}
                                                validate={{
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                        message: 'Please enter a valid email',
                                                    },
                                                }}
                                                defaultValue={edit.email}
                                            />
                                        ) : (
                                            <span>{el.email}</span>
                                        )}
                                    </td>
                                    <td className='px-4 py-2 text-sm font-normal'>
                                        {edit?._id === el._id ? (
                                            <InputForm
                                                register={register}
                                                fw
                                                errors={errors}
                                                nameKey={'firstname'}
                                                validate={{
                                                    required: 'First name is required',
                                                }}
                                                defaultValue={edit.firstname}
                                            />
                                        ) : (
                                            <span>{el.firstname}</span>
                                        )}
                                    </td>
                                    <td className='px-4 py-2 text-sm font-normal'>
                                        {edit?._id === el._id ? (
                                            <InputForm
                                                register={register}
                                                fw
                                                errors={errors}
                                                nameKey={'lastname'}
                                                validate={{ required: 'Last name is required' }}
                                                defaultValue={edit.lastname}
                                            />
                                        ) : (
                                            <span>{el.lastname}</span>
                                        )}
                                    </td>
                                    <td className='px-4 py-2 text-sm font-normal'>
                                        {edit?._id === el._id ? (
                                            <InputSelectForm
                                                register={register}
                                                fw
                                                errors={errors}
                                                nameKey={'role'}
                                                validate={{ required: 'Required fill' }}
                                                defaultValue={el.role}
                                                option={roles}
                                            />
                                        ) : (
                                            <span>{roles.find((role) => +role.code === +el.role)?.value}</span>
                                        )}
                                    </td>
                                    <td className='px-4 py-2 text-sm font-normal'>
                                        {edit?._id === el._id ? (
                                            <InputForm
                                                register={register}
                                                fw
                                                errors={errors}
                                                nameKey={'mobile'}
                                                validate={{
                                                    required: 'Mobile is required',
                                                    pattern: {
                                                        value: /^\d{10}$/,
                                                        message: 'Please enter a valid phone number',
                                                    },
                                                }}
                                                defaultValue={edit.mobile}
                                            />
                                        ) : (
                                            <span>{el.mobile}</span>
                                        )}
                                    </td>
                                    <td className='px-4 py-2 text-sm font-normal'>
                                        {edit?._id === el._id ? (
                                            <InputSelectForm
                                                register={register}
                                                fw
                                                errors={errors}
                                                nameKey={'isBlocked'}
                                                validate={{ required: 'Required fill' }}
                                                defaultValue={el.isBlocked}
                                                option={isBlocked}
                                            />
                                        ) : (
                                            <span>
                                                {el.isBlocked ? (
                                                    <div className='flex items-center gap-1'>
                                                        <GrStatusGoodSmall color='red' />
                                                        <span>Blocked</span>
                                                    </div>
                                                ) : (
                                                    <div className='flex items-center gap-1'>
                                                        <GrStatusGoodSmall color='green' />
                                                        <span>Active</span>
                                                    </div>
                                                )}
                                            </span>
                                        )}
                                    </td>
                                    <td className='px-4 py-2 text-sm font-normal'>{moment(el.createdAt).format('L')}</td>
                                    <td className={clsx('flex gap-4 px-4 py-2  items-center', edit?._id === el._id && 'h-[81px]')}>
                                        {edit?._id === el._id ? (
                                            <MdCancel size={18} className='cursor-pointer transition duration-300 transform hover:text-orange-700' onClick={() => setEdit(null)} />
                                        ) : (
                                            <AiFillEdit size={18} className='cursor-pointer transition duration-300 transform hover:text-orange-700' onClick={() => setEdit(el)} />
                                        )}

                                        <RiDeleteBin6Line
                                            onClick={() => handleDeleteUser(el._id)}
                                            size={18}
                                            className='cursor-pointer transition duration-300 transform hover:text-orange-700'
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
            <div className='w-full flex justify-center'>
                <Pagination totalCount={users?.counts} pageSize={process.env.REACT_APP_USER_LIMIT} />
            </div>
        </div>
    );
};

export default ManageUser;
