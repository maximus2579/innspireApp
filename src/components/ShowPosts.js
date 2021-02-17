import logoSrc from "../assets/logo_innspire.png"
import {AiFillStar} from "react-icons/ai";
import {IconContext} from "react-icons";
import {Link, Route, Switch,} from "react-router-dom"
import ShowContent from "./ShowContent"
import Loader from "react-loader-spinner"
import React from "react";

const ShowPosts = ({posts, param}) => {
    document.body.style.height = null;
    document.body.style.alignItems = null;
    if (posts.length > 0) {
        return (
            <>
                <nav>
                    <Link to={"/"}><img src={logoSrc} className={"logo"} alt={"Logo"}/></Link>
                    <ul>
                        {posts.map((post) => <Link to={{pathname: "/" + param + "/" + post.id}} data={post.id}>
                            <li className={"navItems"}>
                                <IconContext.Provider value={{size: "30px", color: "white"}}>
                                    <AiFillStar/>
                                </IconContext.Provider>
                                <div>{post.title.rendered}</div>
                            </li>
                        </Link>)}
                    </ul>
                </nav>
                <Switch>
                    <Route path={"/:param/:id"} children={<ShowContent posts={posts}/>}/>
                </Switch>
            </>
        );
    }
    else {
        return <Loader type="ThreeDots" color="#FFF" height={80} width={80} />
    }
};

export default ShowPosts;
