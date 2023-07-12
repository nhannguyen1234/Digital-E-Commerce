import { FaReply, FaShieldAlt, FaTruck, FaTty } from 'react-icons/fa';
import path from './path';
import { BiSolidGift } from 'react-icons/bi';
export const navigation = [
    {
        id: 1,
        value: 'HOME',
        path: `/${path.HOME}`,
    },
    {
        id: 2,
        value: 'PRODUCTS',
        path: `/${path.PRODUCTS}`,
    },
    {
        id: 3,
        value: 'BLOGS',
        path: `/${path.BLOGS}`,
    },
    {
        id: 4,
        value: 'OUR SERVICES',
        path: `/${path.OUR_SERVICES}`,
    },
    {
        id: 5,
        value: 'FAQS',
        path: `/${path.FAQ}`,
    },
];
export const incentives = [
    { icon: <FaShieldAlt size={20} />, name: 'Guarantee', about: 'Quality Checked' },
    { icon: <FaTruck size={20} />, name: 'Free Shipping', about: 'Free On All Products' },
    { icon: <BiSolidGift size={20} />, name: 'Special Gift Cards', about: 'Special Gift Cards' },
    { icon: <FaReply size={20} />, name: 'Free Return', about: 'Within 7 Days' },
    { icon: <FaTty size={20} />, name: 'Consultancy', about: 'Lifetime 24/7/356' },
];
export const productInfoTabs = [
    { id: 1, name: 'DESCRIPTION' },
    { id: 2, name: 'WARRANTY' },
    { id: 3, name: 'DELIVERY' },
    { id: 4, name: 'PAYMENT' },
    { id: 5, name: 'CUSTOMER REVIEW' },
];
