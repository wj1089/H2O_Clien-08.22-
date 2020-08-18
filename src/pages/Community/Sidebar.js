import React from 'react';
import './community.css'
import {MDBInput} from 'mdbreact'
import {Link} from "react-router-dom";


const SideBar = () => {
    return (
        <>
            <nav className="sidebar sidebar-offcanvas">
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <span className="menu-title"><Link to="/Community">자유 게시판</Link></span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <span className="menu-title"><Link to="/Community/CustomerServiceCenter">고객서비스센터</Link></span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <span className="menu-title"><Link to="/Community/QueAn">Q&A</Link></span>
                        </a>
                    </li>

                    <MDBInput label="Search" size="sm" />
                </ul>
            </nav>
        </>
    );
};

export default SideBar;