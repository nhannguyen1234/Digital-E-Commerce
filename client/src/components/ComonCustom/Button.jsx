import React, { memo } from 'react';

const Button = ({ name, handleOnclick, style, iconsBefore, iconsAfter, fw }) => {
    return (
        <button
            type='button'
            className={
                style ? style : `px-4 py-2 rounded-md text-white bg-hovermain font-semibold my-2 ${fw ? 'w-full' : ''}`
            }
            onClick={() => {
                handleOnclick && handleOnclick();
            }}
        >
            {iconsBefore}
            {name}
            {iconsAfter}
        </button>
    );
};

export default memo(Button);
