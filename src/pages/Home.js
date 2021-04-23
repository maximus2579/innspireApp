import {Link, useHistory} from "react-router-dom";
import {useEffect} from "react"
import Body from "../components/Body"
import logoSrc from "../assets/logo_innspire.png";
import Header from "../components/Header";

const Home = ({titles, posts}) => {
    let history = useHistory()
    function logOut () {
        localStorage.clear();
        localStorage.setItem("thema", "theme-light")
        window.location.reload();
    }

    function checkLogin () {
        if (localStorage.getItem("token")) {
            document.getElementById("profile").innerHTML = `<p id="username">${localStorage.getItem("username")}</p><div class="dropdown"><p id="info">User info</p><p id="uitloggen">Uitloggen</p></div>`
            document.getElementById("uitloggen").addEventListener("click", () => logOut())
            document.getElementById("info").addEventListener("click", () => history.push('/user-info'))
        }
    }
    useEffect(() => {
        checkLogin()
    }, [])
    return (
        <div className={"app"}>
            <Header/>
            <Body titles={titles} posts={posts}/>
        </div>
    );
};

export default Home;
