import React, { memo } from 'react';

const Button = ({ name, handleOnclick, style, iconsBefore, iconsAfter, fw, type = 'button' }) => {
    return (
        <button
            type={type}
            className={
                style
                    ? style
                    : `px-4 py-2 rounded-md text-white bg-hovermain select-auto font-semibold my-2 transition duration-300 transform hover:bg-gray-800 ${fw ? 'w-full' : ''}`
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
