import { FaReply, FaShieldAlt, FaTruck, FaTty } from 'react-icons/fa';
import path from './path';
import icons from 'ultils/icons';
const { BiSolidGift, BiSolidDashboard, HiUserGroup, RiProductHuntFill, RiBillFill } = icons;
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
];
export const color = ['black', 'brown', 'gray', 'white', 'pink', 'yellow', 'orange', 'purple', 'green', 'blue'];
export const sorts = [
    {
        id: 1,
        value: '-quantity',
        text: 'Featured',
    },
    {
        id: 2,
        value: '-sold',
        text: 'Best selling',
    },
    {
        id: 3,
        value: 'title',
        text: 'Alphabetically, A-Z',
    },
    {
        id: 4,
        value: '-title',
        text: 'Alphabetically, Z-A',
    },
    {
        id: 5,
        value: 'price',
        text: 'Price, low to hight',
    },
    {
        id: 6,
        value: '-price',
        text: 'Price, hight to low',
    },
    {
        id: 7,
        value: 'createdAt',
        text: 'Date, old to new',
    },
    {
        id: 8,
        value: '-createdAt',
        text: 'Date, new to old',
    },
];
export const voteOptions = [
    {
        id: 1,
        text: 'Terrible',
    },
    {
        id: 2,
        text: 'Bad',
    },
    {
        id: 3,
        text: 'Neutral',
    },
    {
        id: 4,
        text: 'Good',
    },
    {
        id: 5,
        text: 'Perfect',
    },
];

export const adminSidebar = [
    {
        id: 1,
        type: 'single',
        text: 'Dashboard',
        path: `/${path.ADMIN}/${path.DASHBOARD}`,
        icon: <BiSolidDashboard color='orange' size={17} />,
    },
    {
        id: 2,
        type: 'single',
        text: 'Manage Users',
        path: `/${path.ADMIN}/${path.MANAGE_USER}`,
        icon: <HiUserGroup color='orange' size={17} />,
    },
    {
        id: 3,
        type: 'parent',
        text: 'Manage Products',
        icon: <RiProductHuntFill color='orange' size={17} />,
        submenu: [
            {
                text: 'Create Product',
                path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`,
            },
            {
                text: 'Manage Product',
                path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`,
            },
        ],
    },
    {
        id: 4,
        type: 'single',
        text: 'Manage Order',
        path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
        icon: <RiBillFill color='orange' size={17} />,
    },
];
export const roles = [
    {
        code: 1006,
        value: 'Admin',
    },
    {
        code: 2001,
        value: 'User',
    },
];
export const isBlocked = [
    {
        code: true,
        value: 'Blocked',
    },
    {
        code: false,
        value: 'Active',
    },
];
