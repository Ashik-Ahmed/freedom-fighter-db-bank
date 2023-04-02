import Link from 'next/link';
import React, { useState } from 'react';
import SubMenu from './SubMenu';

const Menu = ({ menu, open, index }) => {
    const [accordionOpen, setAccordionOpen] = useState(false);
    return (
        // menu?.items ?
        //     <div className='font-medium'>
        //         <div onClick={() => setAccordionOpen(!accordionOpen)} className={`${open && 'py-2'} flex gap-3.5 text-md items-center px-2 hover:bg-primary rounded-md cursor-pointer border-b transition-all ease-in duration-200`}>
        //             <div>{React.createElement(menu?.icon, { size: "20" })}</div>
        //             <h2
        //                 style={{
        //                     transitionDelay: `${index + 3}00ms`,
        //                 }}
        //                 className={`w-full flex items-center justify-between ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
        //                 {menu.name}
        //                 {accordionOpen ? <p className='pi pi-angle-up'></p> : <p className='pi pi-angle-down'></p>}
        //             </h2>
        //         </div>
        //         <div
        //             // ref={contentElement}
        //             // style={{ height: height }}
        //             className={` overflow-hidden ${accordionOpen ? 'visible' : 'hidden'} ${open ? 'ml-3' : 'ml-1.5'}`}>
        //             {
        //                 menu?.items?.map((menuItem, index) => {
        //                     return (
        //                         <SubMenu key={index} menuItem={menuItem} open={open} />
        //                     )

        //                 })
        //             }
        //         </div>
        //     </div>
        //     :
        <Link
            // href={menu?.link}
            href={'/'}
            key={index}
            className={` ${menu?.margin && "mt-4"} group flex items-center text-md  gap-3.5 font-medium py-2 px-2 hover:bg-primary rounded-md border-b transition-all ease-in duration-200`}>
            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
            <h2
                style={{
                    transitionDelay: `${index + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
                {menu?.name}
            </h2>
            <h2
                className={`${open && "hidden"} absolute z-2 left-48 bg-primary font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit `}>
                <p className='px-2 py-2'>
                    {menu?.name}
                </p>
            </h2>
        </Link>
    );
};

export default Menu;