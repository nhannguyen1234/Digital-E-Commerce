import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login, Home, Accessible, DetailProduct, FAQs, Products, Service, Blogs, ResetPassword } from './pages/public';
import path from './ultils/path';
import { getCategories } from './store/app/asyncActions';
import { useDispatch } from 'react-redux';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    return (
        <div className='font-main'>
            <Routes>
                <Route path={path.ACCESSIBLE} element={<Accessible />}>
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.PRODUCTS} element={<Products />} />
                    <Route path={path.BLOGS} element={<Blogs />} />
                    <Route path={path.DETAIL_PRODUCT__PID__TITLE} element={<DetailProduct />} />
                    <Route path={path.OUR_SERVICES} element={<Service />} />
                    <Route path={path.FAQ} element={<FAQs />} />
                </Route>
                <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
                <Route path={path.LOGIN} element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
