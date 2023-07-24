import React, { memo, useState } from 'react';
import { productInfoTabs } from 'ultils/constants';
import { formatStarFromNumber } from 'ultils/helperFn';
import Votebar from './Votebar';
import Button from '../button/Button';
import { apiRatings } from 'apis/product';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from 'store/app/appSlice';
import VoteOptions from './VoteOptions';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import path from 'ultils/path';
import { useNavigate } from 'react-router-dom';
import Comment from './Comment';

const ProductInfomation = ({ totalRatings, ratings, nameProduct, pid, rerender }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.user);
    const [isActiveTabs, setIsActiveTabs] = useState(1);
    const handleSubmitVoteOptions = async ({ comments, score }) => {
        if (!comments || !score || !pid) {
            toast.warning('Please vote in form when submit', {
                position: toast.POSITION.TOP_CENTER,
            });
            return;
        }
        await apiRatings({ star: score, comment: comments, pid: pid, updatedAt: Date.now() });
        dispatch(showModal({ isShowModal: false, childrenModal: null }));
        rerender();
    };
    const handleVoteNow = () => {
        if (!isLoggedIn) {
            Swal.fire({
                text: 'Login to vote',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Go Login',
                title: 'Sign in to use this feature',
                showCancelButton: true,
            }).then((rs) => {
                if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
            });
        } else {
            dispatch(
                showModal({
                    isShowModal: true,
                    childrenModal: (
                        <VoteOptions handleSubmitVoteOptions={handleSubmitVoteOptions} nameProduct={nameProduct} />
                    ),
                }),
            );
        }
    };

    return (
        <div>
            <div className='flex items-center gap-2 relative bottom-[-1px]  transition duration-300 transform'>
                {productInfoTabs.map((el) => (
                    <span
                        key={el.id}
                        className={`py-2 px-4 font-medium cursor-pointer ${
                            isActiveTabs === el.id ? 'bg-white border  border-b-0 animate-fade-in' : 'bg-gray-200'
                        }`}
                        onClick={() => {
                            setIsActiveTabs(el.id);
                        }}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className='w-full border-2 rounded-lg shadow-md'>
                {productInfoTabs.some((el) => el.id === isActiveTabs) &&
                    productInfoTabs.find((el) => el.id === isActiveTabs).name}
            </div>
            <div className='w-main m-auto mt-4 flex flex-col gap-4'>
                <div className='border-b-2 border-b-red-600 font-semibold pt-4 pb-2 text-[18px]'>CUSTOMER REVIEW</div>
                <div className='flex flex-col px-4 py-8 border-2 rounded-lg shadow-md '>
                    <div className='flex w-full'>
                        <div className='flex-4 flex flex-col items-center justify-center gap-2 border rounded-s-lg border-red-600'>
                            <div className='font-semibold text-2xl text-[#363636]'>{`${totalRatings}/5`}</div>
                            <div className='flex'>
                                {formatStarFromNumber(totalRatings, 18)?.map((el, index) => (
                                    <span key={index}>{el}</span>
                                ))}
                            </div>
                            <div>{`${ratings?.length} Reviews and comments`}</div>
                        </div>
                        <div className='flex-6 pl-4 flex flex-col gap-2'>
                            {[...Array(5).keys()].reverse().map((el) => (
                                <Votebar
                                    key={el}
                                    number={el + 1}
                                    ratingsCount={ratings?.filter((item) => item.star === el + 1)?.length}
                                    totalRatings={ratings?.length}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col p-4 gap-2 items-center justify-center text-sm'>
                        <span> Do you review this product?</span>
                        <Button handleOnclick={handleVoteNow} name='Vote now' />
                    </div>
                    <div className='flex flex-col gap-4'>
                        {ratings?.map((el) => (
                            <Comment
                                key={el._id}
                                star={el.star}
                                updatedAt={el.updatedAt}
                                comment={el.comment}
                                postedBy={el.postedBy}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ProductInfomation);
