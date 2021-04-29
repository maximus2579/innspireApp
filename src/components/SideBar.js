import {Link} from "react-router-dom";
import {IconContext} from "react-icons";
import {AiFillStar} from "react-icons/ai";
import {useEffect} from "react"

const SideBar = ({titles, posts}) => {
    function myFunction(x) {
        if (x.matches) { // If media query matches
            document.querySelector(".sideNav").classList.remove("visible")
            document.querySelector(".sideNav").classList.add("hide")
            document.querySelector(".contentSection").style.marginLeft = ""
        } else {
            document.querySelector(".sideNav").classList.remove("hide")
            document.querySelector(".sideNav").classList.add("visible")
            document.querySelector(".contentSection").style.marginLeft = document.querySelector(".sideNav").offsetWidth.toString() + "px"
        }
    }

    var x = window.matchMedia("(max-width: 700px)")
    // Attach listener function on state changes
    useEffect(() => {
        myFunction(x) // Call listener function at run time
        x.addListener(myFunction)
    });

    return (
        <div className={"sideNav"}>
                <div>
                    {titles.map((title, index) =>
                     title.parent === 0 ?
                        <div key={index} className={"sideNavItems"}>
                            <div className={"navCat"}>
                                <div className={"cat"}>
                                <IconContext.Provider value={{size: "30px", color: "white"}}>
                                    <AiFillStar/>
                                </IconContext.Provider>
                                <div className={"navCatLabel"} data-id={title.id}>{title.name}</div>
                                </div>
                                <div className={"navTitleLabel"}>
                                    {title.slug === "events" ? <div key={index}><Link to={{pathname:`/${title.slug}/upcomming`}} data={"upcomming"} onClick={() => {myFunction(x)}}>upcomming</Link></div> :
                                        posts.map((post, index) =>
                                            post.categories.map( (categorie, index) =>
                                                title.id === categorie ?
                                                    <div key={index}><Link onClick={() => {myFunction(x)}} to={{pathname:`/${title.slug}/${post.slug}`}} data={post.slug}>{post.title.rendered}</Link></div> : "" ))
                                    }
                                    {title.children[0] ?
                                        <div className={"navSubCat"}>
                                            <div className={"cat"}><div className={"navSubCatLabel"} data-id={title.id}>{titles.map((title1, index) => title.children[0] === title1.id ? title1.name : "")}</div></div>
                                            <div>
                                                {posts.map((post, index) =>
                                                    post.categories.map( (categorie, index) =>
                                                        categorie === title.children[0]? <div key={index}><Link onClick={() => {myFunction(x)}} to={{pathname:`/${title.slug}/${post.slug}`}} data={post.slug}>{post.title.rendered}</Link></div> : ""
                                                    ))}
                                            </div>
                                        </div>
                                        : ""}
                                </div>
                            </div>

                </div>
                         : ""
                    )}
        </div>
        </div>
    );
};

export default SideBar;
