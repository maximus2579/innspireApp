import logo from "../assets/logo_innspire.png"
import Starsection from "../components/Starsection"
const HomeLogo = ({titles}) => {
    return (
        <>
        <img src={logo} alt={"Logo"} className={"logo"}/>
        <div className={"logoOptions"}>
            {titles.map((title) => <Starsection title={title}/>)}
        </div>
        </>
    );
};

HomeLogo.defaultProps = {
    titles: [
        "people",
        "devOps",
        "agenda",
        "agile"
    ]
}

export default HomeLogo;
