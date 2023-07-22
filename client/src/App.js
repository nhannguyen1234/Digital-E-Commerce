import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login, Home, Accessible, DetailProduct, FAQs, Products, Service, Blogs, ResetPassword } from './pages/public';
import { Modal } from './components';
import path from './ultils/path';
import { getCategories } from './store/app/asyncActions';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
    const dispatch = useDispatch();
    const { isShowModal, childrenModal } = useSelector((state) => state.app);
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    return (
        <div className='font-main relative'>
            {isShowModal && <Modal>{childrenModal}</Modal>}
            <Routes>
                <Route path={path.ACCESSIBLE} element={<Accessible />}>
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.BLOGS} element={<Blogs />} />
                    <Route path={path.DETAIL_PRODUCT_CATEGORY_PID__TITLE} element={<DetailProduct />} />
                    <Route path={path.FAQ} element={<FAQs />} />
                    <Route path={path.OUR_SERVICES} element={<Service />} />
                    <Route path={path.PRODUCTS} element={<Products />} />
                </Route>
                <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
                <Route path={path.LOGIN} element={<Login />} />
            </Routes>
            <ToastContainer />
        </div>
    );
}

export default App;
