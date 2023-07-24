import React from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from 'store/app/appSlice';
const Modal = ({ children }) => {
    const dispatch = useDispatch();
    return (
        <div
            onClick={() => dispatch(showModal({ isShowModal: false, childrenModal: null }))}
            className='inset-0 z-50 absolute bg-overlay flex items-center justify-center'
        >
            {children}
        </div>
    );
};

export default Modal;
