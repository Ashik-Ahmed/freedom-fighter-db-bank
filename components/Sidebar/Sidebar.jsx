import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import Link from 'next/link';

import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";


const Sidebar = ({ user, setUser }) => {

    const [toggleCollapse, setToggleCollapse] = useState(false)

    const [open, setOpen] = useState(false);

    const menus = [
        { name: "Dashboard", link: "/", icon: MdOutlineDashboard },
        { name: "Profile", link: "/", icon: AiOutlineUser },
        { name: "messages", link: "/", icon: FiMessageSquare },
        { name: "analytics", link: "/", icon: TbReportAnalytics, margin: true },
        { name: "File Manager", link: "/", icon: FiFolder },
        { name: "Cart", link: "/", icon: FiShoppingCart },
        { name: "Saved", link: "/", icon: AiOutlineHeart, margin: true },
        { name: "Setting", link: "/", icon: RiSettings4Line },
    ];

    // const menuItems = [
    //     {
    //         label: 'Profile',
    //         icon: 'pi pi-fw pi-user',
    //     },
    //     {
    //         label: 'Edit',
    //         icon: 'pi pi-fw pi-pencil',
    //         items: [
    //             {
    //                 label: 'Left',
    //                 icon: 'pi pi-fw pi-align-left'
    //             },
    //             {
    //                 label: 'Right',
    //                 icon: 'pi pi-fw pi-align-right'
    //             },
    //             {
    //                 label: 'Center',
    //                 icon: 'pi pi-fw pi-align-center'
    //             },
    //             {
    //                 label: 'Justify',
    //                 icon: 'pi pi-fw pi-align-justify'
    //             }
    //         ]
    //     }
    // ]

    return (
        // <div className={`flex flex-row justify-between pl-4 bg-primary ${toggleCollapse ? 'w-20' : 'w-80'}`} style={{ transition: "width 300ms cubic-bezier(0.2,0,0,1) 0s" }}>
        //     <div className={`border-2 flex-1 ${toggleCollapse ? 'hidden' : 'visible'}`}>
        //         <PanelMenu model={menuItems} className='bg-primary' />
        //     </div>
        //     <span className='border-2'>
        //         <Button icon={`pi pi-angle-double-left border-2 p-2 absolute top-0 border-secondary  ${toggleCollapse ? 'visible' : 'hidden'} ${toggleCollapse && 'rotate-180'}`} onClick={() => setToggleCollapse(!toggleCollapse)} />
        //     </span>
        // </div >

        <section className="flex gap-6">
            <div
                className={`bg-primary/70 min-h-screen ${open ? "w-72" : "w-16"
                    } duration-500 text-gray-100 px-2`}
            >
                <div className="py-3 flex justify-end">
                    <HiMenuAlt3
                        size={26}
                        className="cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <div className="mt-2 flex flex-col gap-2 relative">
                    {menus?.map((menu, i) => (
                        <Link
                            href={menu?.link}
                            key={i}
                            className={` ${menu?.margin && "mt-5"
                                } group flex items-center text-sm  gap-3.5 font-medium py-2 px-2 hover:bg-primary rounded-md`}
                        >
                            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                            <h2
                                style={{
                                    transitionDelay: `${i + 3}00ms`,
                                }}
                                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                    }`}
                            >
                                {menu?.name}
                            </h2>
                            <h2
                                className={`${open && "hidden"
                                    } absolute left-48 bg-primary font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit `}
                            >
                                {menu?.name}
                            </h2>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Sidebar;