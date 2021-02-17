import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Home from "./pages/Home"
import SubHome from "./pages/SubHome"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}
// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark'){
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}
// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
    } else {
        setTheme('theme-light');
    }
})();

const App = () =>{
    const [postnames, setPostnames] = useState([]);
    useEffect(() => {
        async function getAllPostTypesTitles() {
            fetch('http://localhost/wordpress/wp-json/wp/v2/apptitels')
                .then(response => response.json())
                .then(data => setPostnames(data));
        }

        getAllPostTypesTitles();
    }, [])
    return (
      <Router>
          <>
              <button id="switch" onClick={toggleTheme}>Switch</button>
              {/*routing*/}
              <Switch>
                  <Route path={"/"} exact children={postnames.length > 0 ? (<Home titles={postnames}/>) : <Loader type="ThreeDots" color="#FFF" height={80} width={80} />}/>
                  <Route path={"/:param"} children={<SubHome/>}/>
              </Switch>

          </>
      </Router>
  );
}


export default App;
