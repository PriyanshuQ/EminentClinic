import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../layout.css'

function Layout({ children }) {
    const location = useLocation()
    const userMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'home-outline'
        },
        {
            name: 'Appointments',
            path: '/appointments',
            icon: 'list'
        },
        {
            name: 'Apply Doctor',
            path: '/apply-doctor',
            icon: 'person-add'
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: 'person'
        },
        {
            name: 'Logout',
            path: '/logout',
            icon: 'log-in-outline'
        },
    ];

    const menuToBeRendered = userMenu

  return (
    <div className='main'>
        <div className='d-flex layout'>
            <div className='sidebar'>
                <div className='sidebar-header'>
                    <h1>CM_</h1>
                </div>
                <div className="menu">
                    {menuToBeRendered.map((menu)=>{
                        const isActive = location.pathname == menu.path
                        return <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                            <ion-icon name={menu.icon}></ion-icon>
                            <Link className ="text-sidebar"to={menu.path}>{menu.name}</Link>
                        </div>
                    })}
                </div>
            </div>
            <div className='content'>
                <div className="header">
                    header
                </div>
                <div className="body">
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Layout