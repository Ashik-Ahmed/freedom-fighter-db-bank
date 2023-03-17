import Link from 'next/link';
import React from 'react';

const SubMenu = ({ menuItem, open }) => {
    return (
        <Link
            href={menuItem?.link}
            className={` ${menuItem?.margin && "mt-4"} ${open && 'py-2'} group flex items-center text-sm  gap-3 font-medium  px-2 hover:bg-primary rounded-md ml-3`}>
            <div className=''>{React.createElement(menuItem?.icon, { size: "20" })}</div>
            <h2>
                {menuItem?.name}
            </h2>
            <h2 className={`${open && "hidden"} absolute z-2 left-48 bg-primary font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit `}>
                <p className='px-2 py-2'>{menuItem?.name}</p>
            </h2>
        </Link>
    );
};

export default SubMenu;