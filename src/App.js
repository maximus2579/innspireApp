import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Home from "./pages/Home"
import SubHome from "./pages/SubHome"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

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
