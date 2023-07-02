/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}', './public/index.html'],
    theme: {
        fontFamily: {
            main: ['Poppins', 'sans-serif'],
        },
        extend: {
            width: {
                main: '1220px',
            },
            backgroundColor: {
                main: '#ee3131',
            },
            colors: {
                hovermain: '#ee3131',
                main: '#505050',
            },
        },
    },
    plugins: [],
};
