import React from 'react';
import './Header.css';
import logo from './../../assets/stone-logo.svg';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const HeaderComponent = () => {
    const hash = localStorage.getItem('@stone-report/hash');
    const history = useHistory();

    function logOutOnClick() {
        localStorage.removeItem('@stone-report/hash');
        history.push('/');
    }

    return (
        <>
            <header className="headerContainer">
                <img src={logo} alt="Stone"/>
                {
                    hash ? <p className="hash">Token do usuário: {hash}</p> : null
                }
                <div className="linksDiv">
                    {
                        hash ? 
                            <p className="link" onClick={logOutOnClick}>Logout</p> : 
                            <Link to="/" className="link">Login</Link>
                    }
                    {
                        hash ? 
                            <Link to="/reports" className="link">Reports</Link> :
                            <Link to="/" className="link">Reports</Link>
                    }
                    
                </div>
            </header>
        </>
    );
}

export default HeaderComponent;