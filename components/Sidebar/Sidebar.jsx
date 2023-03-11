import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import Link from 'next/link';

import { HiMenuAlt3, HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineDashboard, MdFilterListAlt, MdInsertInvitation, } from "react-icons/md";
import { RiSettings4Line, RiMailSettingsLine, RiFilterLine, RiUserSettingsLine, RiLogoutCircleRLine } from "react-icons/ri";
import { TbReportAnalytics, TbList, TbListCheck } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart, FiUserPlus } from "react-icons/fi";
import { CgUserList, CgBrowse } from "react-icons/cg"
import { FaUsersCog } from "react-icons/fa"
import Cookies from 'universal-cookie';


const Sidebar = ({ user, setUser }) => {

    const [open, setOpen] = useState(true);
    const [accordionOpen, setAccordionOpen] = useState(false);

    const cookie = new Cookies()

    const handleLogout = () => {
        cookie.remove('TOKEN')
        setUser(false)
    }

    const menus = [
        { name: "Dashboard", link: "/", icon: MdOutlineDashboard },
        {
            name: "Manage Members", icon: HiOutlineUserGroup, items: [
                { name: "Browse Members", link: "/freedom-fighters", icon: CgUserList },
                { name: "Add Member", link: "/selection/primary-selected", icon: FiUserPlus }
            ]
        },
        { name: "Manage Events", link: "/events", icon: MdInsertInvitation, },
        {
            name: "Invitation Mgt.", icon: RiMailSettingsLine, items: [
                { name: "Filter Members", link: "/selection", icon: RiFilterLine },
                { name: "Primary List", link: "/selection/primary-selected", icon: TbList },
                { name: "Final List", link: "/selection/final-selected", icon: TbListCheck }
            ]
        },
        { name: "Manage Users", link: "/manage-users", icon: FaUsersCog, margin: true },
        { name: "Analytics", link: "/", icon: TbReportAnalytics },
        { name: "File Manager", link: "/", icon: FiFolder },
        { name: `Profile (${user.name})`, link: `/profile/${user._id}`, icon: RiUserSettingsLine, margin: true },
    ];


    return (
        // <div className={`flex flex-row justify-between pl-4 bg-primary ${toggleCollapse ? 'w-20' : 'w-80'}`} style={{ transition: "width 300ms cubic-bezier(0.2,0,0,1) 0s" }}>
        //     <div className={`border-2 flex-1 ${toggleCollapse ? 'hidden' : 'visible'}`}>
        //         <PanelMenu model={menuItems} className='bg-primary' />
        //     </div>
        //     <span className='border-2'>
        //         <Button icon={`pi pi-angle-double-left border-2 p-2 absolute top-0 border-secondary  ${toggleCollapse ? 'visible' : 'hidden'} ${toggleCollapse && 'rotate-180'}`} onClick={() => setToggleCollapse(!toggleCollapse)} />
        //     </span>
        // </div >

        <section className="flex gap-6 bg-primary/70 scrollbar-none">
            <div
                className={` ${open ? "w-[20vw]" : "w-16"
                    } duration-700 text-gray-100 px-2`}
            >
                <div className="py-3 flex justify-between items-center">
                    <div className='flex gap-1 items-center'>
                        <span className='pi pi-telegram text-xl'></span>
                        {open && <p className='text-xl font-bold'>Invite.</p>}
                    </div>
                    <HiMenuAlt3
                        size={26}
                        className="cursor-pointer"
                        onClick={() => {
                            setOpen(!open);
                            setAccordionOpen(false)
                        }}
                    />
                </div>
                <div className="flex flex-col gap-1  relative">
                    {menus?.map((menu, i) => (
                        menu?.items ?
                            <div className='font-medium'>
                                <div onClick={() => setAccordionOpen(!accordionOpen)} className={`${open && 'py-2'} flex gap-3.5 text-md items-center px-2 hover:bg-primary rounded-md cursor-pointer border-b`}>
                                    <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                                    <h2
                                        style={{
                                            transitionDelay: `${i + 3}00ms`,
                                        }}
                                        className={`w-full flex items-center justify-between ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
                                        {menu.name}
                                        {accordionOpen ? <p className='pi pi-angle-up'></p> : <p className='pi pi-angle-down'></p>}
                                    </h2>
                                </div>
                                <div
                                    // ref={contentElement}
                                    // style={{ height: height }}
                                    className={` overflow-hidden ml-3.5 ${accordionOpen ? 'visible' : 'hidden'}  transition-all duration-700`}>
                                    {
                                        menu?.items?.map((menuItem, index) => {
                                            return (
                                                <Link
                                                    href={menuItem?.link}
                                                    key={i}
                                                    className={` ${menuItem?.margin && "mt-4"} ${open && 'py-2'} group flex items-center text-md  gap-3 font-medium  px-2 hover:bg-primary rounded-md`}>
                                                    <div className=''>{React.createElement(menuItem?.icon, { size: "20" })}</div>
                                                    <h2>
                                                        {menuItem?.name}
                                                    </h2>
                                                    <h2 className={`${open && "hidden"} absolute z-2 left-48 bg-primary font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit `}>
                                                        <p className='px-2 py-2'>{menuItem?.name}</p>
                                                    </h2>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            :
                            <Link
                                href={menu?.link}
                                key={i}
                                className={` ${menu?.margin && "mt-4"
                                    } group flex items-center text-md  gap-3.5 font-medium py-2 px-2 hover:bg-primary rounded-md border-b`}>
                                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                                <h2
                                    style={{
                                        transitionDelay: `${i + 3}00ms`,
                                    }}
                                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
                                    {menu?.name}
                                </h2>
                                <h2
                                    className={`${open && "hidden"
                                        } absolute z-2 left-48 bg-primary font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit `}>
                                    <p className='px-2 py-2'>{menu?.name}</p>
                                </h2>
                            </Link>
                    ))}
                    <div className='mt-4'>
                        <Button onClick={handleLogout} icon='pi pi-sign-out' label='Logout' className='p-button-danger p-button-sm'></Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sidebar;