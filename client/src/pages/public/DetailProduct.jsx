import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetProduct, apiGetProducts } from '../../apis';
import { Breadcrumbs, Button, SelectQuantity, ProductInfomation, CustomSlider, NAProduct } from '../../components/';
import settings from '../../ultils/settingSlide';
import ReactImageMagnify from 'react-image-magnify';
import { formatPrice, formatStarFromNumber } from '../../ultils/helperFn';
import icons from '../../ultils/icons';
import { incentives } from '../../ultils/constants';
import Slider from 'react-slick';
const { BsFillSquareFill } = icons;

const DetailProduct = () => {
    const { pid, title, category } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [related, setRelated] = useState(null);
    const fetchProductData = async () => {
        const response = await apiGetProduct(pid);
        if (response.success) setProduct(response.productData);
        console.log(response);
    };
    const fetchProductFromCategory = async () => {
        const response = await apiGetProducts({ limit: 6, category });
        if (response.success) setRelated(response.products);
    };
    useEffect(() => {
        if (pid) {
            fetchProductData();
            fetchProductFromCategory();
        }
    }, [pid]);
    const handleQuantity = useCallback(
        (number) => {
            if (!Number(number) || Number(number) < 1) {
                return;
            } else {
                setQuantity(number);
            }
        },
        [setQuantity],
    );
    const handleChangeQuantity = useCallback(
        (flag) => {
            if (flag === 'minus' && quantity === 1) return;
            if (flag === 'minus') setQuantity((prev) => +prev - 1);
            if (flag === 'plus') setQuantity((prev) => +prev + 1);
        },
        [setQuantity, quantity],
    );
    return (
        <div className='w-full flex flex-col m-auto'>
            <div className='w-full h-20 bg-[#f7f7f7] flex justify-center items-center flex-col'>
                <div className='w-main flex flex-col justify-center text-[14px] gap-2'>
                    <span className='text-[18px] font-semibold'>{title.toUpperCase()}</span>
                    <Breadcrumbs title={title} category={category} />
                </div>
            </div>
            <div className='w-main m-auto flex mt-4'>
                <div className='w-2/5 flex flex-col gap-6 justify-center'>
                    <div className='w-[458px] h-[458px] border '>
                        <ReactImageMagnify
                            {...{
                                smallImage: {
                                    alt: '',
                                    isFluidWidth: true,
                                    src: product?.thumb,
                                },
                                largeImage: {
                                    src: product?.thumb,
                                    width: 1200,
                                    height: 1200,
                                },
                            }}
                        />
                    </div>

                    <div className='w-full'>
                        <CustomSlider product={product} settings={settings} />
                    </div>
                </div>
                <div className='w-2/5 flex flex-col gap-4 pl-4'>
                    <div className='flex items-center justify-between'>
                        <div className='text-[30px] font-semibold'>{`${formatPrice(product?.price)} VND`}</div>
                        <span className='text-hovermain text-sm pr-6'>{`Available: ${product?.quantity}`}</span>
                    </div>
                    <div>
                        <div className='flex items-center'>
                            {formatStarFromNumber(product?.totalRatings)?.map((el, index) => (
                                <span key={index}>{el}</span>
                            ))}
                            <span className='text-hovermain text-sm pl-4'>{`Sold: ${product?.sold}`}</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        {product?.description?.map((el, index) => (
                            <div key={index} className='flex gap-4 items-center'>
                                <BsFillSquareFill size={5} />
                                <span className='text-[#505050] text-[14px] '>{el}</span>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col gap-2 pt-4'>
                        <div className='flex gap-2 '>
                            <span className='font-semibold flex items-center justify-center'>Quantity</span>
                            <SelectQuantity
                                quantity={quantity}
                                handleQuantity={handleQuantity}
                                handleChangeQuantity={handleChangeQuantity}
                            />
                        </div>
                        <Button name='Add to cart' fw />
                    </div>
                </div>
                <div className='w-1/5 '>
                    <div className='flex flex-col gap-4 '>
                        {incentives?.map((el, index) => (
                            <div key={index} className='flex items-center border py-[10px] gap-4 pl-4'>
                                <span className=' flex items-center justify-center rounded-full w-8 h-8 bg-gray-700 text-gray-200'>
                                    {el.icon}
                                </span>
                                <div className='flex flex-col'>
                                    <span className='text-sm text-[#505050]'>{el.name}</span>
                                    <span className='text-xs text-[#999999]'>{el.about}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='w-main m-auto mt-4'>
                <ProductInfomation />
            </div>
            <div className='w-main m-auto mt-4'>
                <div className='border-b-2 border-b-red-600 font-semibold pt-4 pb-2 text-[18px]'>
                    OTHER CUSTOMERS ALSO BUY:
                </div>
                <div className='w-full mt-6 '>
                    <Slider {...settings}>
                        {related?.map((el) => (
                            <NAProduct key={el._id} productData={el} />
                        ))}
                    </Slider>
                </div>
            </div>
            <div className='h-[500px]'></div>
        </div>
    );
};

export default DetailProduct;
