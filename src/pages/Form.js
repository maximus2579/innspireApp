import {useState} from 'react';
import {Link, useHistory} from "react-router-dom";

const Form = ({action}) => {
    let history = useHistory()
    document.body.style.height = "100%";
    document.body.style.alignItems = "center";
    document.querySelector("#root").style.justifyContent = "center";
    document.querySelector("#root").style.display = "flex";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [telefoonnummer, setTelefoonnummer] = useState("");
    const [bedrijf, setBedrijf] = useState("");
    const [achternaam, setAchternaam] = useState("");
    const [voornaam, setVoornaam] = useState("");
    if (action === "Registreren"){
        async function addUser (username, password, email, voornaam, achternaam, telefoonnummer, bedrijf){
            fetch(`${process.env.REACT_APP_PROTOCOL}//${process.env.REACT_APP_BASE_URL}/wp-json/wp/v2/users/register`, {
                method: "POST", headers: {
                    'Accept': 'application/json',
                    "content-type": "application/json",
                },
                body: JSON.stringify({username: username, password: password, email: email,  voornaam: voornaam, achternaam: achternaam, telefoonnummer: telefoonnummer, bedrijf: bedrijf})
            })
                .then(response => response.json())
                .then(data => {
                    if (data.code){
                        let code = document.getElementById("code")
                        code.style.display = "block"
                        if (data.code === 200){
                            code.style.color = "#80ffa4"
                            code.innerHTML = data.message
                            history.push("/inloggen")
                        }
                        else{
                            code.style.color = "red"
                            code.innerHTML = data.message
                            setUsername('')
                            setPassword('')
                            setUsername('')
                            setPassword('')
                            setEmail('')
                            setTelefoonnummer('')
                            setBedrijf('')
                            setAchternaam('')
                            setVoornaam('')
                        }
                    }

                });
        }

        function onSubmit (e){
            e.preventDefault()
            addUser(username, password, email, voornaam, achternaam, telefoonnummer, bedrijf)
            e.preventDefault()
        }

        return (
            <form onSubmit={onSubmit}>
                <h1>{action}</h1>
                <label htmlFor={"voornaam"}>Voornaam:</label><input required type="text" name={"voornaam"} id={"voornaam"} value={voornaam} onChange={(e) => setVoornaam(e.target.value)}/>
                <label htmlFor={"achternaam"}>Achternaam:</label><input required type="text" name={"achternaam"} id={"achternaam"} value={achternaam} onChange={(e) => setAchternaam(e.target.value)}/>
                <label htmlFor={"telefoonnummer"}>Telefoonnummer:</label><input required type="tel" name={"telefoonnummer"} id={"telefoonnummer"} value={telefoonnummer} onChange={(e) => setTelefoonnummer(e.target.value)}/>
                <label htmlFor={"bedrijf"}>Bedrijf: (optioneel)</label><input type="text" name={"bedrijf"} id={"bedrijf"} value={bedrijf} onChange={(e) => setBedrijf(e.target.value)}/>
                <label htmlFor={"email"}>Email:</label><input required type="email" name={"email"} id={"email"} value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor={"username"}>Gebruikersnaam:</label><input required type="text" name={"username"} id={"username"} value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor={"password"}>Wachtwoord:</label><input required type="password" name={"password"} id={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type={"submit"}/>
                <p id={"code"}></p>
                <Link to={"/"}><div style={{color: "blue", margin: "10px 0"}}>Homepagina</div></Link>
            </form>
        );
    } else {
        async function login () {
            fetch(`${process.env.REACT_APP_PROTOCOL}//${process.env.REACT_APP_BASE_URL}/wp-json/jwt-auth/v1/token`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({username: username, password: password})
            })
                .then(response => response.json())
                .then(data => {
                    if (data.token){
                        localStorage.setItem('token', data.token)
                        localStorage.setItem('username', data.user_display_name)
                        localStorage.setItem('thema', data.thema)
                        localStorage.setItem('planningpoker', data.planning_poker)
                        document.documentElement.classList.add(localStorage.getItem("thema"))
                        history.push("/")
                    }
                    else{
                        alert("Onjuist")
                        setUsername('')
                        setPassword('')
                    }

                });
        }
        function onSubmit (e){
            e.preventDefault();
            login()
        }

        return (
            <form onSubmit={onSubmit}>
                <h1>{action}</h1>
                <label htmlFor={"username"}>Gebruikersnaam:</label><input required type="text" name={"username"} id={"username"} value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor={"password"}>Wachtwoord:</label><input required type="password" name={"password"} id={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type={"submit"}/>
                <p>Nog geen account?</p>
                <Link to={"/registreren"}><div style={{color: "blue", marginBottom: "10px"}}>registreren</div></Link>
                <Link to={"/"}><div style={{color: "blue", margin: "10px 0"}}>Homepagina</div></Link>
            </form>
        );
    }
};

export default Form;
