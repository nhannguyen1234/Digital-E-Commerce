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
