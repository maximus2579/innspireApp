import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Home from "./pages/Home"
import SubHome from "./pages/SubHome"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Form from "./pages/Form"
import UserInfo from "./pages/UserInfo";

const App = () =>{
    const [categories, setCategories] = useState([]);
    if (document.documentElement.classList.contains(null)){
        localStorage.setItem("thema", "theme-light")
    }
    document.documentElement.classList.add(localStorage.getItem("thema"))
    useEffect(() => {
        async function getAllPostTypesTitles() {
            fetch(`${process.env.REACT_APP_PROTOCOL}//${process.env.REACT_APP_BASE_URL}/wp-json/wp/v2/categories?exclude=1&&hide_empty=true&&parent=0&&_fields=slug,name`)
                .then(response => response.json())
                .then(data => setCategories(data));
        }
        getAllPostTypesTitles();
        document.documentElement.classList.add(localStorage.getItem("thema"))
    }, [])
    return (
      <Router>
          <>
              {/*routing*/}
              <Switch>
                  <Route path={"/"} exact children={categories.length > 0 ? (<Home titles={categories}/>) : <Loader type="ThreeDots" color={document.getElementsByTagName("html")[0].classList.contains("theme-dark") ? "#fff" : "#121212"} height={80} width={80}/>}/>
                  <Route path={"/registreren"} exact children={<Form action={"Registreren"}/>}/>
                  <Route path={"/inloggen"} exact children={<Form action={"Inloggen"}/>}/>
                  <Route path={"/user-info"} exact children={<UserInfo/>}/>
                  <Route path={"/:param"} children={<SubHome/>}/>
              </Switch>

          </>
      </Router>
  );
}


export default App;
