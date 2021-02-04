import logoSrc from "../assets/logo_innspire.png"

const Nav = () => {
    return (
        <nav>
           <img src={logoSrc} className={"logo"} alt={"Logo"} />
        </nav>
    );
};

export default Nav;
