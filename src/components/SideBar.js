import {Link} from "react-router-dom";
import {IconContext} from "react-icons";
import {AiFillStar, AiFillHome} from "react-icons/ai";
import {useEffect} from "react"

const SideBar = ({titles, posts}) => {
    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
    function myFunction(x) {
        if (x.matches) { // If media query matches
            document.querySelector(".sideNav").classList.remove("visible")
            document.querySelector(".sideNav").classList.add("hide")
        } else {
            document.querySelector(".sideNav").classList.remove("hide")
            document.querySelector(".sideNav").classList.add("visible")
        }
    }
    var x = window.matchMedia("(max-width: 800px)")
    // Attach listener function on state changes
    useEffect(() => {
        myFunction(x) // Call listener function at run time
        x.addListener(myFunction)
    });
    // posts.sort((a, b) => (a.title.rendered  > b.title.rendered) ?  1 : -1)
    return (
        <div className={"sideNav"}>
                <div>
                    <div className={"sideNavItems"}>
                        <div className={"homeClass"}>
                            <IconContext.Provider value={{size: "30px", color: "white"}}>
                                <AiFillHome/>
                            </IconContext.Provider>
                            <div className={"navCatLabel"}><Link className="navItemActive" onClick={() => {myFunction(x)}} to={{pathname:`/`}} data={"home"}>{"Home"}</Link></div>
                        </div>
                    </div>
                    {titles.map((title, index) =>
                     title.parent === 0 && title.slug !== "home"?
                        <div key={index} className={"sideNavItems"}>
                            <div className={"navCat"}>
                                <div className={"cat"}>
                                <IconContext.Provider value={{size: "30px", color: "white"}}>
                                    <AiFillStar/>
                                </IconContext.Provider>
                                <div className={"navCatLabel"} data-id={title.id}>{decodeHtml(title.name)}</div>
                                </div>
                                <div className={"navTitleLabel"}>
                                    {title.slug === "events" ? <div key={index}><Link to={{pathname:`/${title.slug}/upcomming`}} data={"upcomming"} onClick={() => {myFunction(x)}}>upcomming</Link></div> :
                                        posts.map((post, index) =>
                                            post.categories.map( (categorie, index) =>
                                                title.id === categorie ?
                                                    <div key={index}><Link onClick={() => {myFunction(x)}} to={{pathname:`/${title.slug}/${post.slug}`}} data={post.slug}>{decodeHtml(post.title.rendered)}</Link></div> : "" ))
                                    }
                                    {title.children ?
                                        title.children.map((children) =>
                                            titles.map((title1) => children === title1.id ?
                                                <div className={"navSubCat"}>
                                            <div className={"cat"}><div className={"navSubCatLabel"} data-id={title1.id}>{decodeHtml(title1.name)}</div></div>
                                            <div>
                                                {
                                                    title.slug === "liberating-structures" && posts.filter(post => post.categories[0] === children) ?
                                                    <div><Link onClick={() => {myFunction(x)}} to={{pathname: `/${title.slug}/${title1.slug}/structures`}} data={"structures"}>{"structures"}</Link></div> :
                                                    posts.map((post, index) =>
                                                    post.categories.map( (categorie) => {
                                                        if (categorie === children) {
                                                                return <div key={index}><Link onClick={() => {myFunction(x)}} to={{pathname: `/${title.slug}/${title1.slug}/${post.slug}`}} data={post.slug}>{decodeHtml(post.title.rendered)}</Link></div>
                                                            }

                                                    })
                                                    )}
                                            </div>
                                        </div>
                                                : "")
                                        )
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
