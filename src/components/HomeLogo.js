import logo from "../assets/logo_innspire.png"
import Starsection from "../components/Starsection"
import SwitchTheme from "./SwitchTheme";

const HomeLogo = ({titles}) => {
    document.body.style.height = "100%";
    document.body.style.alignItems = "center";
    return (
        <>
            <SwitchTheme/>
            <div className={"center"}><img src={logo} alt={"Logo"} className={"logoHome"}/></div>
            <div className={"logoOptions"}>
                {titles.map((title, index) => <Starsection key={index} title={title}/>)}
            </div>
        </>
    );
};

export default HomeLogo;
