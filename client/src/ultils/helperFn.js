import icons from './icons';
const { AiFillStar, AiOutlineStar } = icons;

export const createSlug = (string) =>
    string
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split(' ')
        .join('-');
export const formatPrice = (number) => parseInt(number).toLocaleString();
export const formatStarFromNumber = (number, size) => {
    // star = 4 => [1,1,1,1,0]
    if (!Number(number)) return;
    const star = [];
    number = Math.round(number);
    for (let i = 0; i < +number; i++) star.push(<AiFillStar color='orange' size={size || 16} />);
    for (let i = 5; i > +number; i--) star.push(<AiOutlineStar color='orange ' size={size || 16} />);
    return star;
};
export const formatTimes = (t) => {
    t = Number(t) / 1000;
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = Math.floor((t % 3600) % 60);
    return { h, m, s };
};
export const validate = (payload, setInvalidFields) => {
    let invalids = 0;
    const formatPayload = Object.entries(payload);
    for (let arr of formatPayload) {
        if (arr[1].trim() === '') {
            invalids++;
            setInvalidFields((prev) => [...prev, { name: arr[0], mes: 'Require this field.' }]);
        }
    }
    for (let arr of formatPayload) {
        switch (arr[0]) {
            case 'email':
                const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!arr[1].match(regexEmail)) {
                    invalids++;
                    setInvalidFields((prev) => [...prev, { name: arr[0], mes: 'Email invalid.' }]);
                }
                break;
            case 'password':
                switch (true) {
                    case arr[1].length < 6:
                        invalids++;
                        setInvalidFields((prev) => [...prev, { name: arr[0], mes: 'The password must be at least 6 characters long.' }]);
                        break;
                    case !arr[1].match(/(?=.*[A-Z])/):
                        invalids++;
                        setInvalidFields((prev) => [...prev, { name: arr[0], mes: 'The password must contain at least 1 uppercase letter.' }]);
                        break;
                    case !arr[1].match(/(?=.*\d)/):
                        invalids++;
                        setInvalidFields((prev) => [...prev, { name: arr[0], mes: 'The password must contain at least 1 number.' }]);
                        break;
                    case !arr[1].match(/(?=.*[@$!%*?&.])/):
                        invalids++;
                        setInvalidFields((prev) => [...prev, { name: arr[0], mes: 'The password must contain at least 1 special character.' }]);
                        break;
                    default:
                        break;
                }
                break;
            case 'mobile':
                const regexMobile = /^\d{10}$/;
                if (!arr[1].match(regexMobile)) {
                    invalids++;
                    setInvalidFields((prev) => [...prev, { name: arr[0], mes: 'Phone number invalid' }]);
                }
                break;
            default:
                break;
        }
    }
    return invalids;
};
export const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};
