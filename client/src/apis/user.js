import axios from '../axios';
export const apiRegister = (data) =>
    axios({
        url: '/user/register',
        method: 'POST',
        data,
    });
export const apiLogin = (data) =>
    axios({
        url: '/user/login',
        method: 'POST',
        data,
    });
export const apiForgotPassword = (data) =>
    axios({
        url: '/user/forgotpassword',
        method: 'POST',
        data,
    });
export const apiResetPassword = (data) =>
    axios({
        url: '/user/resetpassword',
        method: 'PATCH',
        data,
    });
export const apiGetCurrent = () =>
    axios({
        url: '/user/current',
        method: 'GET',
    });
export const apiGetAllUser = (params) =>
    axios({
        url: '/user/',
        method: 'GET',
        params,
    });
export const apiUpdateUserByAdmin = (uid, data) =>
    axios({
        url: '/user/' + uid,
        method: 'PATCH',
        data,
    });
export const apiDeleteUserByAdmin = (uid) =>
    axios({
        url: '/user/' + uid,
        method: 'DELETE',
    });
