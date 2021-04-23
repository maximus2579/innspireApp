import React from 'react';
import {Link} from "react-router-dom";
import logoSrc from "../assets/logo_innspire.png";
import {GiHamburgerMenu} from "react-icons/all";

function hamburgerActivate(){
    if (document.querySelector(".sideNav").style.display == "flex"){
        document.querySelector(".sideNav").style.display = "none"
    } else{
        document.querySelector(".sideNav").style.display = "flex"
    }
}

const Header = () => {
    return (
        <div className={"fixedNav"}><div className={"hamburger"} onClick={hamburgerActivate}><GiHamburgerMenu/></div><img src={logoSrc} className={"logo"} alt={"Logo"}/><div id={"profile"}><Link to={"/inloggen"} id={"inloggen"}><div>Inloggen</div></Link></div></div>
    );
};

export default Header;
