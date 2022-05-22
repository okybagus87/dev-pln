import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

export default function Sidebar(props) {
    const [open, setOpen] = useState({
        dashboard: false,
        master: false,
        fit: false
    });

    const [linkPage, setLinkPage] = useState('');

    useEffect(() => {
        setLinkPage(window.location.pathname);
        if (open.dashboard && open.master && open.fit) {
            setOpen({
                ...open,
                dashboard: !open.dashboard,
                master: !open.master,
                fit: !open.fit
            });
        }
    });

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <div className="brand-link">
                <img src="Logo pln.png" className="brand-image" />
                <span className="brand-text font-weight-light">FP TLN</span>
            </div>
            <div className="sidebar">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item" onClick={() => setOpen({...open, dashboard: !open.dashboard})}>
                            <NavLink
                                to="/dashboard"
                                className={open.dashboard ? 'nav-link active' : 'nav-link'}>
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Dashboard
                                </p>
                            </NavLink>
                        </li>
                        <li className={open.master || linkPage == '/master/dataPeserta' || linkPage == '/master/dataPenguji' ? 'nav-item menu-open' : 'nav-item'} onClick={() => setOpen({...open, master: !open.master})}>
                            <a href='#' className={open.master || linkPage == '/master/dataPeserta' || linkPage == '/master/dataPenguji' ? 'nav-link active' : 'nav-link'}>
                                <i className="nav-icon fas fa-edit"></i>
                                <p>
                                    Master
                                    <i className="fas fa-angle-left right"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <NavLink
                                        to="/master/dataPeserta"
                                        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} >
                                        <p>Data Peserta</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/master/dataPenguji"
                                        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} >
                                        <p>Data Penguji</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className={open.fit || linkPage == '/fit-proper/pendaftaran' ? 'nav-item menu-open' : 'nav-item'} onClick={() => setOpen({...open, fit: !open.fit})}>
                            <a href='#' className={open.fit || linkPage == '/fit-proper/pendaftaran' ? 'nav-link active' : 'nav-link'}>
                                <i className="nav-icon fas fa-desktop"></i>
                                <p>
                                    Fit & Proper
                                    <i className="fas fa-angle-left right"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <NavLink
                                        to="/fit-proper/pendaftaran"
                                        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} >
                                        <p>Pendafataran Fit & Proper</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}