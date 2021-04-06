import logo from "../assets/logo_innspire.png"
import Starsection from "../components/Starsection"
// import SwitchTheme from "../components/SwitchTheme";
import {Link, useHistory} from "react-router-dom";
import {useEffect} from "react"

const Home = ({titles}) => {
    let history = useHistory()

    function logOut () {
        localStorage.clear();
        window.location.reload();
    }

    function checkLogin () {
        if (localStorage.getItem("token")) {
            document.getElementById("profile").innerHTML = `<p id="username">${localStorage.getItem("username")}</p><p id="info">User info</p><p id="uitloggen">Uitloggen</p>`
            document.getElementById("uitloggen").addEventListener("click", () => logOut())
            document.getElementById("info").addEventListener("click", () => history.push('/user-info'))
        }
    }

    // async function info () {
    //     fetch(`http://${process.env.REACT_APP_BASE_URL}/wp-json/wp/v2/users/me`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + localStorage.getItem("token")
    //         },
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data)
    //             console.log('Email:', data.email)
    //             console.log('Naam:', data.first_name + data.last_name)
    //             console.log('Bijnaam:', data.extra.nickname[0])
    //             console.log('Bedrijf:', data.extra.bedrijf[0])
    //             console.log('Nummer:', data.extra.tel[0]);
    //         })
    // }

    useEffect(() => {
        checkLogin()
    }, [])
    return (
        <div className={"app"}>
            <div className={"fixedNav"}><div id={"profile"}><Link to={"inloggen"} id={"inloggen"}><div>Inloggen</div></Link></div></div>
            <div className={"center"}><img src={logo} alt={"Logo"} className={"logoHome"}/></div>
            <div className={"logoOptions"}>
                {titles.map((title, index) => <Starsection key={index} title={title}/>)}
            </div>
        </div>
    );
};

export default Home;
