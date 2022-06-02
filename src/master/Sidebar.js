import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar(props) {
    const [open, setOpen] = useState({
        dashboard: false,
        master: false,
        fit: false,
        report: false,
        search: false
    });

    const [linkPage, setLinkPage] = useState('');

    useEffect(() => {
        setLinkPage(window.location.pathname);
    });

    const clickNav = (params) => {
        if (params === 'dashboard') {
            setOpen({
                dashboard: true,
                master: false,
                fit: false,
                report: false,
                search: false
            });
        }
        else if (params === 'master') {
            setOpen({
                dashboard: false,
                master: true,
                fit: false,
                report: false,
                search: false
            });
        }
        else if (params === 'fit') {
            setOpen({
                dashboard: false,
                master: false,
                fit: true,
                report: false,
                search: false
            });
        }
        else if (params === 'report') {
            setOpen({
                dashboard: false,
                master: false,
                fit: false,
                report: true,
                search: false
            });
        }
        else if (params === 'search') {
            setOpen({
                dashboard: false,
                master: false,
                fit: false,
                report: false,
                search: true
            });
        }
    }

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <div className="brand-link">
                <img src="pln.png" className="brand-image" />
                <span className="brand-text font-weight-light">PT PLN PERSERO</span>
            </div>
            <div className="sidebar">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item" onClick={() => clickNav('dashboard')}>
                            <NavLink
                                to="/dashboard"
                                className={linkPage === '/dashboard' || linkPage === '/' ? 'nav-link active' : 'nav-link'}>
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Dashboard
                                </p>
                            </NavLink>
                        </li>
                        <li className={open.master || linkPage === '/master/dataPeserta' || linkPage === '/master/dataPenguji' ? 'nav-item menu-open' : 'nav-item'} onClick={() => clickNav('master')}>
                            <a href="#" className={open.master || linkPage === '/master/dataPeserta' || linkPage === '/master/dataPenguji' ? 'nav-link active' : 'nav-link'}>
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
                                        className={linkPage === '/master/dataPeserta' ? "nav-link active" : "nav-link"} >
                                        <p>Data Peserta</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/master/dataPenguji"
                                        className={linkPage === '/master/dataPenguji' ? "nav-link active" : "nav-link"} >
                                        <p>Data Penguji</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className={open.fit || linkPage === '/fit-proper/pendaftaran' || linkPage === '/fit-proper/penilaian' || linkPage === '/fit-proper/wawancara/pendaftaran' || linkPage === '/fit-proper/wawancara/penilaian' ? 'nav-item menu-open' : 'nav-item'} onClick={() => clickNav('fit')}>
                            <a href="#" className={open.fit || linkPage === '/fit-proper/pendaftaran' || linkPage === '/fit-proper/penilaian' || linkPage === '/fit-proper/wawancara/pendaftaran' || linkPage === '/fit-proper/wawancara/penilaian' ? 'nav-link active' : 'nav-link'}>
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
                                        className={linkPage === '/fit-proper/pendaftaran' ? "nav-link active" : "nav-link"} >
                                        <p>Pendafataran Fit & Proper</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/fit-proper/wawancara/pendaftaran"
                                        className={linkPage === '/fit-proper/wawancara/pendaftaran' ? "nav-link active" : "nav-link"} >
                                        <p>Pendafataran Wawancara</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/fit-proper/penilaian"
                                        className={linkPage === '/fit-proper/penilaian' ? "nav-link active" : "nav-link"} >
                                        <p>Penilaian Fit & Proper</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/fit-proper/wawancara/penilaian"
                                        className={linkPage === '/fit-proper/wawancara/penilaian' ? "nav-link active" : "nav-link"} >
                                        <p>Penilaian Wawancara</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className={open.report || linkPage === '/report/rekap-nilai' ? 'nav-item menu-open' : 'nav-item'} onClick={() => clickNav('report')}>
                            <a href="#" className={open.report || linkPage === '/report/rekap-nilai' ? 'nav-link active' : 'nav-link'}>
                                <i className="nav-icon fas fa-file"></i>
                                <p>
                                    Report
                                    <i className="fas fa-angle-left right"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <NavLink
                                        to="/report/rekap-nilai"
                                        className={linkPage === '/report/rekap-nilai' ? "nav-link active" : "nav-link"} >
                                        <p>Rekap Nilai Fit & Proper</p>
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