import React from 'react';
import { InputForm, InputSelectForm, Button, MarkDownEditor } from 'components';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const CreateProduct = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        watch,
    } = useForm();
    const { categories } = useSelector((state) => state.app);
    const handleCreateProduct = (data) => {
        console.log(data);
    };
    return (
        <div className='w-full'>
            <div className='h-[75px] flex items-center justify-between text-3xl font-bold px-4 border-b shadow-md '>
                <span>Create New Product</span>
            </div>
            <div className='p-4'>
                <form onSubmit={handleSubmit(handleCreateProduct)}>
                    <InputForm
                        label='Name Product'
                        register={register}
                        nameKey='title'
                        errors={errors}
                        validate={{ required: 'Required fill this field' }}
                        placeholder='Name product'
                        fw
                    />
                    <div className='flex gap-4 my-8'>
                        <InputForm
                            label='Price'
                            register={register}
                            nameKey='price'
                            errors={errors}
                            validate={{ required: 'Required fill this field' }}
                            placeholder='Price'
                            type='number'
                            style='flex-1'
                        />
                        <InputForm
                            label='Quantity'
                            register={register}
                            nameKey='quantity'
                            errors={errors}
                            validate={{ required: 'Required fill this field' }}
                            placeholder='Quantity'
                            type='number'
                            style='flex-1'
                        />
                        <InputForm
                            label='Color'
                            register={register}
                            nameKey='color'
                            errors={errors}
                            validate={{ required: 'Required fill this field' }}
                            placeholder='Color'
                            type='text'
                            style='flex-1'
                        />
                    </div>
                    <div className=' flex gap-4 my-4'>
                        <InputSelectForm
                            label='Category'
                            register={register}
                            nameKey='category'
                            errors={errors}
                            validate={{ required: true }}
                            style='flex-1'
                            option={categories?.map((el) => ({ code: el._id, value: el.title }))}
                        />
                        <InputSelectForm
                            label='Brand (Optional)'
                            register={register}
                            nameKey='brand'
                            errors={errors}
                            style='flex-1'
                            option={categories?.find((el) => el._id === watch('category'))?.brand?.map((item, idx) => ({ code: idx, value: item }))}
                        />
                    </div>

                    <div className='float-right'>
                        <Button name='Create Product' type='submit' />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
