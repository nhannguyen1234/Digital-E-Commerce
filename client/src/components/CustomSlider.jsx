import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

const CustomSlider = ({ product, settings }) => {
    const [numberSlider, setNumberSlider] = useState(3);
    const customSettings = { ...settings, slidesToShow: numberSlider };
    useEffect(() => {
        if (product?.images?.length === 2) {
            setNumberSlider(2);
        } else setNumberSlider(3);
    }, [product]);
    return (
        <>
            <Slider className='detail-product-btn' {...customSettings}>
                {product?.images?.map((el) => (
                    <div key={el} className='flex justify-center items-center'>
                        <div className=' w-[130px] h-[122px] border '>
                            <img src={el} alt='sub-imgs' className=' h-[120px] w-[120px] object-contain ' />
                        </div>
                    </div>
                ))}
            </Slider>
        </>
    );
};

export default CustomSlider;
