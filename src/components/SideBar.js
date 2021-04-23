import {Link} from "react-router-dom";
import {IconContext} from "react-icons";
import {AiFillStar} from "react-icons/ai";

const SideBar = ({titles, posts}) => {
    return (
        <div className={"sideNav"}>
                <div>
                    {titles.map((title, index) =>
                        <div key={index} className={"sideNavItems"}>
                        <div className={"navCat"}>
                            <IconContext.Provider value={{size: "30px", color: "white"}}>
                                <AiFillStar/>
                            </IconContext.Provider>
                            <div className={"navCatLabel"}>{title.name}</div>
                        </div>
                        <div className={"navTitleLabel"}>
                            {title.slug === "events" ? <div key={index}><Link to={{pathname:`/${title.slug}/upcomming`}} data={"upcomming"}>upcomming</Link></div> : posts.map((post, index) =>
                                title.id === post.categories[0] ? <div key={index}><Link onClick={() => {
                                    if (window.matchMedia("(max-width: 700px)").matches) { // If media query matches
                                        document.querySelector(".sideNav").style.display = "none";
                                    }
                                }} to={{pathname:`/${title.slug}/${post.slug}`}} data={post.slug}>{post.title.rendered}</Link></div> : ""
                            )}
                        </div>
                        </div>
                    )}
                </div>
                {/*<div className={"last-items"}>*/}
                {/*    /!*<SwitchTheme/>*!/*/}
                {/*    <div className={"hamburger"}><GiHamburgerMenu/></div>*/}
                {/*</div>*/}
        </div>
    );
};

export default SideBar;
