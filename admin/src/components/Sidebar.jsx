import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
    const [style, setStyle] = useState('navbar-nav bg-gradient-primary sidebar sidebar-dark accordion')

    const ChangeStyle = () => {
        if (style == 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion') {
            setStyle('navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled')
        } else {
            setStyle('navbar-nav bg-gradient-primary sidebar sidebar-dark accordion')
        }

    }


    const [ActiveLink, setActiveLink] = useState("nav-item active")

    const active_sidebar = () => {

    }
    return (
        <>
            {/* Sidebar */}
            <ul className={style} id="accordionSidebar">
                {/* Sidebar - Brand */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink" />
                    </div>
                    <div className="sidebar-brand-text mx-3">Admin dashboard <sup>2</sup></div>
                </a>
                {/* Divider */}
                <hr className="sidebar-divider my-0" />




                {/* Nav Item - Dashboard */}

                <NavLink to='/dashboard'className={({ isActive }) => isActive ? ActiveLink : "nav-item"} style={{ textDecoration: "none" }}>
                    <li >
                        <a className="nav-link">
                            <i className="fas fa-fw fa-tachometer-alt" />
                            <span>ข้อมูลผู้สมัคร</span>
                        </a>
                    </li>
                </NavLink>



                <NavLink to='/user_info' className={({ isActive }) => isActive ? ActiveLink : "nav-item"} style={{ textDecoration: "none" }}>
                    <li >
                        <a className="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                            </svg>
                            <span className='px-1'>จัดการข้อมูลผู้สมัคร</span>
                        </a>
                    </li>
                </NavLink>

                <NavLink to='/user_score' className={({ isActive }) => isActive ? ActiveLink : "nav-item"} style={{ textDecoration: "none" }}>
                    <li >
                        <a className="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                            </svg>
                            <span className='px-1'>จัดการคะแนนของผู้สมัครสอบ</span>
                        </a>
                    </li>
                </NavLink>
                
                <NavLink to='/certifi_rp' className={({ isActive }) => isActive ? ActiveLink : "nav-item"} style={{ textDecoration: "none" }}>
                    <li >
                        <a className="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                            </svg>
                            <span className='px-1'>รายงานข้อมูลเกียรติบัตรผู้ที่ผ่านการสอบ</span>
                        </a>
                    </li>
                </NavLink>



                <NavLink to='/waiting_for_payment' className={({ isActive }) => isActive ? ActiveLink : "nav-item"} style={{ textDecoration: "none" }}>
                    <li >
                        <a className="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                            </svg>
                            <span className='px-1'>ข้อมูลสำหรับผู้ที่ยังไม่ได้ชำระเงิน</span>
                        </a>
                    </li>
                </NavLink>

                <hr className="sidebar-divider d-none d-md-block" />
                {/* Sidebar Toggler (Sidebar) */}
                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" onClick={ChangeStyle} />
                </div>
            </ul>
            {/* End of Sidebar */}
        </>
    )
}

export default Sidebar