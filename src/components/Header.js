import React from 'react';
import {Link} from "react-router-dom";
import logoSrc from "../assets/logo_innspire.png";
import {GiHamburgerMenu} from "react-icons/all";

function hamburgerActivate(){
    if (document.querySelector(".sideNav").classList.contains("visible")){
        document.querySelector(".sideNav").classList.add("hide")
    } else{
        document.querySelector(".sideNav").classList.remove("hide")
        document.querySelector(".sideNav").classList.add("visible")
    }
}

const Header = () => {
    return (
        <div className={"fixedNav"}><div className={"hamburger"} onClick={hamburgerActivate}><GiHamburgerMenu/></div><img src={logoSrc} className={"logo"} alt={"Logo"}/><div id={"profile"}><Link to={"/inloggen"} id={"inloggen"}><div>Inloggen</div></Link></div></div>
    );
};

export default Header;
