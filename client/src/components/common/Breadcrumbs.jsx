import React from 'react';
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import icons from 'ultils/icons';
const { MdOutlineKeyboardArrowRight } = icons;
const Breadcrumbs = ({ title, category }) => {
    const routes = [
        { path: '/:category', breadcrumb: category.charAt(0).toUpperCase() + category.slice(1) },
        { path: '/', breadcrumb: 'Home' },
        { path: '/:category/:pid/:title', breadcrumb: title },
    ];
    const breadcrumbs = useBreadcrumbs(routes);
    return (
        <div className='flex gap-1'>
            {breadcrumbs
                ?.filter((el) => !el.match.route === false)
                .map(({ match, breadcrumb }, index, self) => (
                    <Link className='flex items-center gap-1' key={match.pathname} to={match.pathname}>
                        <span className='flex items-center text-gray-600 hover:text-hovermain'>{breadcrumb}</span>
                        {index !== self.length - 1 && <MdOutlineKeyboardArrowRight size={16} />}
                    </Link>
                ))}
        </div>
    );
};

export default Breadcrumbs;
