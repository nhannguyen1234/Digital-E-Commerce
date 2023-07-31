import React, { memo, useState } from 'react';
import icons from 'ultils/icons';
import { adminSidebar } from 'ultils/constants';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const { RiAdminFill, BiSolidChevronDown, BiSolidChevronRight } = icons;
const activedStyle = 'p-4 flex items-center text-white bg-[#263442] transition duration-400';
const notActivedStyle = 'p-4 flex items-center text-[#8699ad] transition-all duration-300 hover:text-white';

const AdminSidebar = () => {
    const [active, setActive] = useState([]);
    const handleShowDropdown = (tabID) => {
        if (active.some((el) => el === tabID)) setActive((prev) => prev.filter((el) => el !== tabID));
        else setActive((prev) => [...prev, tabID]);
    };
    return (
        <section className='h-full text-sm bg-[#2b3a4a]'>
            <div className=' flex items-center justify-center gap-2 px-5 py-[40px] bg-[#2d3f52]'>
                <RiAdminFill color='orange' size={30} />
                <small className='text-sm uppercase text-white'>Admin Workspace</small>
            </div>
            <div>
                {adminSidebar.map((el) => (
                    <div key={el.id}>
                        {el.type === 'single' && (
                            <NavLink
                                to={el.path}
                                className={({ isActive }) => clsx(isActive ? activedStyle : notActivedStyle)}
                            >
                                <div className='flex items-center gap-4'>
                                    <span>{el.icon}</span>
                                    <span>{el.text}</span>
                                </div>
                            </NavLink>
                        )}
                        {el.type === 'parent' && (
                            <div
                                onClick={() => handleShowDropdown(el.id)}
                                className=' flex flex-col text-sm text-[#8699ad] duration-1000 hover:text-white transition-all '
                            >
                                <div className='flex items-center justify-between p-4 cursor-pointer '>
                                    <div className='flex items-center gap-4'>
                                        <span>{el.icon}</span>
                                        <span>{el.text}</span>
                                    </div>
                                    {active.some((id) => id === el.id) ? (
                                        <BiSolidChevronDown color='white ' />
                                    ) : (
                                        <BiSolidChevronRight color='white' />
                                    )}
                                </div>
                                {active.some((id) => id === el.id) && (
                                    <div onClick={(e) => e.stopPropagation()} className='flex flex-col'>
                                        {el.submenu.map((item) => (
                                            <NavLink
                                                key={item.text}
                                                to={item.path}
                                                className={({ isActive }) =>
                                                    clsx(isActive ? activedStyle : notActivedStyle)
                                                }
                                            >
                                                <span className='pl-10'>{item.text}</span>
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default memo(AdminSidebar);
