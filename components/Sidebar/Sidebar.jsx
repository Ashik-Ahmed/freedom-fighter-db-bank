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
import Menu from './Menu';


const Sidebar = ({ user, setUser }) => {

    const [open, setOpen] = useState(true);

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
                { name: "Add Member", link: "/freedom-fighters/add-new", icon: FiUserPlus }
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

        <section className={`flex gap-6 h-screen overflow-scroll scrollbar-thin bg-primary/70 ${open && 'px-2'}`}>
            <div
                className={` ${open ? "w-[280px]" : "w-[70px]"} duration-700 text-gray-100 px-2`}
            >
                <div className="py-3 flex justify-between items-center">
                    <div className='flex gap-1 items-center'>
                        <span className='pi pi-telegram text-xl'></span>
                        {open && <Link href='/' className='text-xl font-bold '>Invite.</Link>}
                    </div>
                    <HiMenuAlt3
                        size={26}
                        className="cursor-pointer"
                        onClick={() => {
                            setOpen(!open);
                        }}
                    />
                </div>
                <div className="flex flex-col gap-1  relative">
                    {menus?.map((menu, index) => (
                        <Menu key={index} menu={menu} open={open} setOpen={setOpen} index={index} />
                    ))}
                    <div className='my-4 text-center'>
                        <Button onClick={handleLogout} icon='pi pi-sign-out' className='p-button-danger '><span className='ml-1'>{open && 'Logout'}</span></Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sidebar;