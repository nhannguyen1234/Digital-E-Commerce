import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login, Home, Accessible } from './pages/public';
import path from './ultils/path';
import { getCategories } from './store/asyncActions';
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
                    <Route path={path.LOGIN} element={<Login />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
