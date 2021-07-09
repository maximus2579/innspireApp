import {useHistory} from "react-router-dom";
import {useEffect} from "react"
import Body from "../components/Body"

import Header from "../components/Header";

const Home = ({titles, posts}) => {
    let history = useHistory()

    // logout user
    function logOut (){
        localStorage.clear()
        window.location.reload()
    }

    // user logged out


    function checkLogin () {
        if (localStorage.getItem("token")) {
            document.getElementById("profile").innerHTML = `<div id="name">${localStorage.getItem("username")}<div class="dropdown"><p id="info">User info</p><p id="uitloggen">Uitloggen</p></div></div>`
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
