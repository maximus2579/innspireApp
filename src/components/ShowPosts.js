import logoSrc from "../assets/logo_innspire.png"
import {AiFillStar} from "react-icons/ai";
import {GiHamburgerMenu} from "react-icons/gi"
import {IconContext} from "react-icons";
import {Link, Route, Switch,} from "react-router-dom"
import ShowContent from "./ShowContent"
import Loader from "react-loader-spinner"
import React from "react";
// import SwitchTheme from "./SwitchTheme";
import Calendar from "./Calendar"

const ShowPosts = ({posts, param}) => {
    document.body.style.height = null;
    document.body.style.alignItems = null;
    document.body.style.backgroundColor = null;
    function hamburgerActivate(){
        if (document.querySelector("nav ul").style.display == "flex"){
            document.querySelector("nav ul").style.display = "none"
        } else{
            document.querySelector("nav ul").style.display = "flex"
        }
    }
    if (posts.length > 0) {
        if (param == "events"){
            return (
                <>
                    <nav>
                        <Link to={"/"}><img src={logoSrc} className={"logo"} alt={"Logo"}/></Link>
                    </nav>
                    <Calendar posts={posts} param={param}/>
                </>
            )
        } else {
            return (
                <>
                    <nav>
                        <Link to={"/"}><img src={logoSrc} className={"logo"} alt={"Logo"}/></Link>
                        <ul>
                            {posts.map((post, index) => <Link key={index} to={{pathname: "/" + param + "/" + post.slug}}
                                                              data={post.slug}>
                                <li className={"navItems"}>
                                    <IconContext.Provider value={{size: "30px", color: "white"}}>
                                        <AiFillStar/>
                                    </IconContext.Provider>
                                    <div>{post.title.rendered}</div>
                                </li>
                            </Link>)}
                        </ul>
                        <div className={"last-items"}>
                            {/*<SwitchTheme/>*/}
                            <div className={"hamburger"} onClick={hamburgerActivate}><GiHamburgerMenu/></div>
                        </div>
                    </nav>
                    <Switch>
                        <Route path={"/:param/:id"} children={<ShowContent posts={posts}/>}/>
                    </Switch>
                </>
            );
        }
    }
    else {
        return <Loader type="ThreeDots" color={document.getElementsByTagName("html")[0].classList.contains("theme-dark") ? "#fff" : "#121212"} height={80} width={80} />
    }
};

export default ShowPosts;
