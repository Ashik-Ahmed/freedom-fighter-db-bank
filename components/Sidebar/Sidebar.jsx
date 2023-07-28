import { Button } from 'primereact/button';
import React, { useState } from 'react';
import Link from 'next/link';

import { HiMenuAlt3, HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineDashboard, MdInsertInvitation, MdAdminPanelSettings } from "react-icons/md";
import { RiMailSettingsLine, RiFilterLine, RiUserSettingsLine } from "react-icons/ri";
import { TbReportAnalytics, TbList, TbListCheck } from "react-icons/tb";
import { FiFolder, FiUserPlus } from "react-icons/fi";
import { CgUserList } from "react-icons/cg"
import { FaUsersCog } from "react-icons/fa"
import Cookies from 'universal-cookie';
import Menu from './Menu';
import { useRouter } from 'next/router';


const Sidebar = ({ user, setUser }) => {

    const [open, setOpen] = useState(true);
    console.log(user.role);

    const cookie = new Cookies()
    const router = useRouter()

    const handleLogout = () => {
        cookie.remove('TOKEN')
        setUser(null)
        router.push('/')
    }

    const menus = [
        { name: "Dashboard", link: "/", icon: MdOutlineDashboard },
        {
            name: "Manage Members", icon: HiOutlineUserGroup, link: '/freedom-fighters', items: [
                { name: "Browse Members", link: "/freedom-fighters", icon: CgUserList },
                { name: "Add Member", link: "/freedom-fighters/add-new", icon: FiUserPlus },
                // { name: "Add Category", link: "/freedom-fighters/add-category", icon: MdOutlineLibraryAdd }
            ]
        },
        {
            name: "Invitation Mgt.", icon: RiMailSettingsLine, link: '/selection', items: [
                { name: "Filter Members", link: "/selection", icon: RiFilterLine },
                { name: "Primary List", link: "/selection/primary-selected", icon: TbList },
                { name: "Final List", link: "/selection/final-selected", icon: TbListCheck }
            ]
        },

        {
            name: "Analytics", link: "/analytics", icon: TbReportAnalytics, items: [
                { name: "Security Clearance Report", link: "/analytics/security-clearance-report", icon: FaUsersCog },
            ]
        },
        // { name: "File Manager", link: "/file-manager", icon: FiFolder },
        {
            name: "Admin", link: "/admin", protected: true, icon: MdAdminPanelSettings, items: [
                { name: "Manage Member Category", link: "/admin/manage-member-category", icon: RiFilterLine },
                { name: "Manage Priority Criteria", link: "/admin/manage-filter-criteria", icon: TbList },
                { name: "Manage Events", link: "/admin/events", icon: MdInsertInvitation, },
                { name: "Manage Users", link: "/admin/manage-users", icon: FaUsersCog },
            ]
        },
        { name: `Profile Settings`, link: `/profile/${user._id}`, icon: RiUserSettingsLine, margin: true },
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

        <section className={`flex gap-6 h-screen bg-primary ${open && 'px-2'}`}>
            <div className={` ${open ? "w-[240px]" : "w-[55px]"} duration-700 text-gray-100 pl-2`}>
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
                <div className="flex flex-col gap-1 relative">
                    {menus?.map((menu, index) => (
                        <div key={index} className={`${(menu?.protected && (user?.role == 'user' && 'hidden'))} ${menu.margin && 'mt-4'}`}>
                            <Menu key={index} menu={menu} open={open} setOpen={setOpen} index={index} user={user} />
                        </div>
                    ))}
                    <div className='my-4 text-center'>
                        <Button onClick={handleLogout} icon='pi pi-sign-out' className='p-button-danger p-button-sm'>
                            {
                                open && <span className='ml-1 duration-700'>Logout</span>
                            }
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sidebar;