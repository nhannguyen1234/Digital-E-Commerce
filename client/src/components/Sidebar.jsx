import { NavLink } from 'react-router-dom';
import icons from '../ultils/icons';
import { createSlug } from '../ultils/helperFn';
import { useSelector } from 'react-redux';
const Sidebar = () => {
    const { PiListDashesFill } = icons;
    const { categories } = useSelector((state) => state.app);
    return (
        <div className="flex flex-col border">
            <div className="flex items-center gap-4 bg-hovermain px-[20px] py-[10px]">
                <PiListDashesFill size={20} color="white" />
                <span className="text-white font-semibold text-[16px]">ALL COLLECTIONS</span>
            </div>
            {categories?.map((el) => (
                <NavLink
                    key={createSlug(el.title)}
                    to={createSlug(el.title)}
                    className={({ isActive }) =>
                        isActive
                            ? 'px-[50px] py-[15px] text-sm bg-hovermain text-white hover:text-hovermain'
                            : 'px-[50px] py-[15px] text-sm hover:text-hovermain'
                    }
                >
                    {el.title}
                </NavLink>
            ))}
        </div>
    );
};

export default Sidebar;
