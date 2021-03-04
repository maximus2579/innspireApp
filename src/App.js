import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Home from "./pages/Home"
import SubHome from "./pages/SubHome"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Form from "./pages/Form"

const App = () =>{
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function getAllPostTypesTitles() {
            fetch('http://localhost/wordpress/wp-json/wp/v2/categories?exclude=1&&hide_empty=true&&parent=0&&_fields=slug,name')
                .then(response => response.json())
                .then(data => setCategories(data));
        }
        getAllPostTypesTitles();
    }, [])
    return (
      <Router>
          <>
              {/*routing*/}
              <Switch>
                  <Route path={"/"} exact children={categories.length > 0 ? (<Home titles={categories}/>) : <Loader type="ThreeDots" color={document.getElementsByTagName("html")[0].classList.contains("theme-dark") ? "#fff" : "#121212"} height={80} width={80}/>}/>
                  <Route path={"/registreren"} exact children={<Form action={"Registreren"}/>}/>
                  <Route path={"/inloggen"} exact children={<Form action={"Inloggen"}/>}/>
                  <Route path={"/:param"} children={<SubHome/>}/>
              </Switch>

          </>
      </Router>
  );
}


export default App;
