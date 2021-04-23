import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Home from "./pages/Home"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Form from "./pages/Form"
import UserInfo from "./pages/UserInfo";

const App = () =>{
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    async function getAllPostTypesTitles() {
        fetch(`${process.env.REACT_APP_PROTOCOL}//${process.env.REACT_APP_BASE_URL}/wp-json/wp/v2/categories?exclude=1&&hide_empty=true&&parent=0&&_fields=slug,name,id`)
            .then(response => response.json())
            .then(data => setCategories(data));
    }
    async function getAllPostTypes() {
            fetch(`${process.env.REACT_APP_PROTOCOL}//${process.env.REACT_APP_BASE_URL}/wp-json/wp/v2/app`)
                .then(response => response.json())
                .then(data => setPosts(data))
    }
    useEffect(() => {
        getAllPostTypesTitles();
        getAllPostTypes();
        document.documentElement.classList.add(localStorage.getItem("thema"))
    }, [])

    return (
      <Router>
          <>
              {/*routing*/}
              <Switch>
                  <Route path={"/registreren"} exact children={<Form action={"Registreren"}/>}/>
                  <Route path={"/inloggen"} exact children={<Form action={"Inloggen"}/>}/>
                  <Route path={"/user-info"} exact children={<UserInfo/>}/>
                  <Route path={"/"} children={categories.length > 0 ? (<Home titles={categories} posts={posts}/>) :
                      <Loader type="ThreeDots" style={{textAlign: "center"}} color={document.getElementsByTagName("html")[0].classList.contains("theme-dark") ? "#fff" : "#121212"} height={80} width={80}/>
                  }/>
              </Switch>

          </>
      </Router>
  );
}


export default App;
