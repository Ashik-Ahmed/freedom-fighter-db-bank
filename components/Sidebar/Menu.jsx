import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Menu = ({ menu, open, index, user }) => {
    const [accordionOpen, setAccordionOpen] = useState(false);
    const router = useRouter()
    const path = router.asPath;
    console.log(menu.permission);
    return (
        menu?.items ?

            <>
                <div
                    onMouseEnter={() => setAccordionOpen(true)}
                    onMouseLeave={() => setAccordionOpen(false)}
                    // href='/'
                    // href={'/'}
                    key={index}
                    className={`  ${path.includes(menu?.link) && "border-l-8 border-l-white"} group flex items-center text-md  gap-3.5 py-2 px-2 hover:bg-secondary rounded-md border-b transition-all ease-in duration-200 cursor-pointer`}>
                    <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                    <div className='w-full flex justify-between items-center'>
                        <h2
                            style={{
                                transitionDelay: `${index + 3}00ms`,
                            }}
                            className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
                            {
                                menu?.name
                            }
                        </h2>
                        {accordionOpen ? <p className='pi pi-angle-up'></p> : <p className='pi pi-angle-down'></p>}
                    </div>
                    <h2
                        className={`${open ? "group-hover:left-[232px]  left-80" : " group-hover:left-12"} absolute left-48 bg-primary whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:duration-300 group-hover:w-fit `}>
                        <p className='py-2'>
                            {
                                menu?.items.map((item, index) => {
                                    return (
                                        <Link href={item.link} key={index} className='block px-2 py-2 rounded-md hover:bg-secondary'>
                                            {item.name}
                                        </Link>
                                    )
                                })
                            }
                        </p>
                    </h2>
                </div >
            </>

            // <div className='font-medium '>
            //     <div onClick={() => setAccordionOpen(!accordionOpen)} className={`${open && 'py-2'} flex gap-3.5 text-md items-center px-2 hover:bg-primary rounded-md cursor-pointer border-b transition-all ease-in duration-200`}>
            //         <div>{React.createElement(menu?.icon, { size: "20" })}</div>
            //         <h2
            //             style={{
            //                 transitionDelay: `${index + 3}00ms`,
            //             }}
            //             className={`w-full flex items-center justify-between ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
            //             {menu.name}
            //             {accordionOpen ? <p className='pi pi-angle-up'></p> : <p className='pi pi-angle-down'></p>}
            //         </h2>
            //     </div>
            //     <div
            //         // ref={contentElement}
            //         // style={{ height: height }}
            //         className={` overflow-hidden ${accordionOpen ? 'visible' : 'hidden'} ${open ? 'ml-3' : 'ml-1.5'}`}>
            //         {
            //             menu?.items?.map((menuItem, index) => {
            //                 return (
            //                     <SubMenu key={index} menuItem={menuItem} open={open} />
            //                 )

            //             })
            //         }
            //     </div>
            // </div>


            :
            <Link
                href={menu?.link}
                // href={'/'}
                key={index}
                className={` ${menu.permission == 'admin' && 'hidden', menu?.margin && "mt-4", path == menu?.link && "border-l-8 border-l-white"} group flex items-center text-md gap-3.5 py-2 px-2 hover:bg-secondary rounded-md border-b transition-all ease-in duration-200`}>
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                    style={{
                        transitionDelay: `${index + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
                    {menu?.name}
                </h2>
                <h2
                    className={`${open && "hidden"} absolute left-48 bg-primary whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-12 group-hover:duration-300 group-hover:w-fit `}>
                    <p className='px-2 py-2 bg-secondary'>
                        {menu?.name}
                    </p>
                </h2>
            </Link>
    );
};

export default Menu;