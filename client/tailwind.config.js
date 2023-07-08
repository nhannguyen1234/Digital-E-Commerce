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
                overlay: 'rgba(0,0,0,0.3)',
            },
            colors: {
                hovermain: '#ee3131',
                main: '#505050',
            },
            flex: {
                2: '2 2 0%',
                3: '3 3 0%',
                4: '4 4 0%',
                5: '5 5 0%',
                6: '6 6 0%',
                7: '7 7 0%',
                8: '8 8 0%',
            },
            keyframes: {
                'slide-top': {
                    ' 0%': {
                        '-webkit-transform': 'translateY(20px);',
                        transform: 'translateY(20px);',
                    },
                    '100%': {
                        '-webkit-transform': ' translateY(0px);',
                        transform: ' translateY(0px);',
                    },
                },
                'slide-top-sm': {
                    ' 0%': {
                        '-webkit-transform': 'translateY(4px);',
                        transform: 'translateY(4px);',
                    },
                    '100%': {
                        '-webkit-transform': ' translateY(0px);',
                        transform: ' translateY(0px);',
                    },
                },

                'fade-in': {
                    '0%': {
                        '-webkit-transform': ' translateZ(80px);',
                        transform: 'translateZ(80px);',
                        opacity: '0;',
                    },
                    '100%': {
                        '-webkit-transform': ' translateZ(0);',
                        transform: 'translateZ(0);',
                        opacity: '1;',
                    },
                },
            },
            animation: {
                'slide-top': 'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'slide-top-sm': 'slide-top-sm 0.2s linear both;',
                'fade-in': 'fade-in 0.3s linear both;',
            },
        },
    },
    plugins: [],
};
