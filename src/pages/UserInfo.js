import {useEffect, useState} from 'react';
import { useHistory } from 'react-router'

const UserInfo = () => {
    (function () {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTheme('theme-dark');
        } else {
            setTheme('theme-light');
        }
    })();

    function setTheme(themeName) {
        localStorage.setItem('theme', themeName);
        document.documentElement.className = themeName;
    }
    document.body.style.height = "100%";
    document.body.style.alignItems = "center";
    document.body.style.backgroundColor = null

    const history = useHistory();
    const [email, setEmail] = useState("")
    const [voornaam, setVoornaam] = useState("")
    const [achternaam, setAchternaam] = useState("")
    const [bijnaam, setBijnaam] = useState("")
    const [bedrijf, setBedrijf] = useState("")
    const [tel, setTel] = useState("")
    const [planningpoker, setPlanningpoker] = useState("")
    const [thema, setThema] = useState("")
    const allThema = ["theme-light", "theme-dark"];
    const allPoker = ["classic", "t-shirt"];

    if (thema !== "" && planningpoker !== ""){
        var optionsThema = [];
        var optionsPoker = [];
        for (let i =0; i<allThema.length; i++){
            optionsThema.push(`<option ${allThema[i] === thema ? "selected" : ""} value="${allThema[i]}">${allThema[i]}</option>`)
        }
        for (let i =0; i<allPoker.length; i++){
            optionsPoker.push(`<option ${allPoker[i] === planningpoker ? "selected" : ""} value="${allPoker[i]}">${allPoker[i]}</option>`)
        }
        document.getElementById("thema").innerHTML = optionsThema
        document.getElementById("planningpoker").innerHTML = optionsPoker
    }
    async function info () {
        fetch(`${process.env.REACT_APP_PROTOCOL}//${process.env.REACT_APP_BASE_URL}/wp-json/wp/v2/users/me`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setEmail(data.email)
                setAchternaam(data.last_name)
                setBijnaam(data.username)
                setVoornaam(data.first_name)
                setBedrijf(data.meta.bedrijf)
                setTel(data.meta.tel)
                setThema(data.meta.thema)
                setPlanningpoker(data.meta.planning_poker)


            })
    }

    function showUser (prop, e){
        e.preventDefault();
        var allSettings = document.querySelectorAll("#userInfo>div:nth-child(2)>div")
        var allLinks = document.querySelectorAll("#userInfo>div:nth-child(1) a")
        for (let i = 0; i<allSettings.length; i++){
            allSettings[i].style.display = "none"
        }
        for (let i = 0; i<allLinks.length; i++){
            allLinks[i].classList.remove("navItemActive")
        }
       document.querySelector("#" + prop).style.display = "block"
       e.target.classList.add("navItemActive")
    }
    function editUser (e){
        e.preventDefault();
        e.target.parentElement.innerHTML = "<input type='submit'>"
        var inputs = document.getElementById("userInfo").querySelectorAll("input");
        for (let i = 0; i<inputs.length; i++){
            inputs[i].disabled = false
        }
        var inputs1 = document.getElementById("userInfo").querySelectorAll("select");
        for (let i = 0; i<inputs1.length; i++){
            inputs1[i].disabled = false
        }
    }

    async function saveUser (e){
        e.preventDefault()
        fetch(`http://${process.env.REACT_APP_BASE_URL}/wp-json/wp/v2/users/me`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body : JSON.stringify({
                username: bijnaam,
                first_name: voornaam,
                last_name: achternaam,
                email: email,
                meta: {
                    tel: tel,
                    bedrijf: bedrijf,
                    planning_poker: planningpoker,
                    thema: thema
                }
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log()
                var code = document.getElementById("code")
                if(data.code) {
                    code.style.display = "block"
                    code.style.color = "red"
                    code.innerHTML = data.message
                }
                else{
                    history.go(0)
                }
            })
    }
    useEffect(() => {
        info()

    }, [])
    return (
        <form id={"userInfo"} onSubmit={saveUser}>
            <div>
                <a onClick={(e) => showUser("user_data", e)} className={"navItemActive"}>Gebruiker:</a>
                <a onClick={(e) => showUser("user_setting", e)}>Instellingen:</a>
            </div>
            <div>
                <div id={"user_data"}>
                    <label htmlFor={"bijnaam"}>Username</label>
                    <input type={"text"} id={"bijnaam"} name={"bijnaam"} value={bijnaam} onChange={(e) => setBijnaam(e.target.value)} disabled/>
                    <label htmlFor={"email"}>E-mail</label>
                    <input type={"text"} id={"email"} name={"email"} value={email} disabled onChange={(e) => setEmail(e.target.value)}/>
                    <hr/>
                    <label htmlFor={"voornaam"}>Voornaam</label>
                    <input type={"text"} id={"voornaam"} value={voornaam} disabled onChange={(e) => setVoornaam(e.target.value)}/>
                    <label htmlFor={"achternaam"}>Achternaam</label>
                    <input type={"text"} id={"achternaam"} value={achternaam} disabled onChange={(e) => setAchternaam(e.target.value)}/>
                    <label htmlFor={"bedrijf"}>Bedrijf</label>
                    <input type={"text"} id={"bedrijf"} value={bedrijf} disabled onChange={(e) => setBedrijf(e.target.value)}/>
                    <label htmlFor={"tel"}>Telefoonnummer:</label>
                    <input type={"tel"} id={"tel"} value={tel} disabled onChange={(e) => setTel(e.target.value)}/>
                    <div id={"submit_div"}><div onClick={(e) => editUser(e)}>Gegevens wijzigen</div></div>
                    <p id={"code"}></p>
                </div>
                <div id={"user_setting"}>
                    <label htmlFor={"thema"}>Thema</label>
                    <select id={"thema"} name={"thema"} style={{width: "100%"}} onChange={(e) => setThema(e.target.value)} disabled>
                    </select>
                    <label htmlFor={"planningpoker"}>Planningpoker</label>
                    <select id={"planningpoker"} style={{width: "100%"}} name={"planningpoker"} onChange={(e) => setPlanningpoker(e.target.value)} disabled>
                    </select>
                    <div id={"submit_div"}><div onClick={(e) => editUser(e)}>Gegevens wijzigen</div></div>
                    <p id={"code"}></p>
                </div>
            </div>
        </form>
    );
};

export default UserInfo;
