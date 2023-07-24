const path = {
    ACCESSIBLE: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    PRODUCTS: ':category',
    BLOGS: 'blogs',
    OUR_SERVICES: 'services',
    FAQ: 'faqs',
    DETAIL_PRODUCT_CATEGORY_PID__TITLE: ':category/:pid/:title',
    RESET_PASSWORD: 'reset-password/:token',

    // Admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGE_USER: 'manage-user',
    MANAGE_PRODUCTS: 'manage-products',
    MANAGE_ORDER: 'manage-order',
    CREATE_PRODUCT: 'create-product',

    // USer
    USER: 'user',
    PERSONAL: 'personal',
};
export default path;
