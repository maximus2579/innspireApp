import {useEffect} from 'react';
import {useParams} from "react-router-dom";
import Structures from "./Structures";
import PlanningPoker from "./PlanningPoker";
import Loader from "react-loader-spinner";

const ShowSubContent = ({posts, titleID, titleIDParent}) => {
    const params = useParams();
    function myFunction(x) {
        if (x.matches) { // If media query matches
            if (document.querySelector(".contentSection")) {
                document.querySelector(".contentSection").style.marginLeft = ""
            }
        } else {
            if (document.querySelector(".contentSection")) {
                document.querySelector(".contentSection").style.marginLeft = document.querySelector(".sideNav").offsetWidth.toString() + "px"
            }
        }
    }
    var x = window.matchMedia("(max-width: 700px)")
    function MakeActive(id, catID){
        for (let i=0; i<document.querySelectorAll(".sideNav a").length; i++){
            document.querySelectorAll(".sideNav a")[i].classList.remove("navItemActive")
            if (document.querySelectorAll(".sideNav a")[i].attributes[0].value === id && parseInt(document.querySelectorAll(".sideNav a")[i].parentElement.parentElement.parentElement.children[0].children[0].dataset.id) === catID){
                document.querySelectorAll(".sideNav a")[i].classList.add("navItemActive")
            }
        }
    }
    useEffect(() => {
        MakeActive(params.id, titleID)
        myFunction(x)
        x.addListener(myFunction)
    });
    if (posts.length > 0) {
        if (params.id === "structures"){
            var filteredPosts = posts.filter(post => titleID === post.categories[0])
            return <Structures posts={filteredPosts} />
        }
        else {
            return (
                <div className={"contentSection"}>
                    {posts.map((post, index) => {
                        console.log(post, post.categories, titleIDParent, titleID)
                        if (post.slug === params.id && titleID === post.categories[0]) {
                            if (post.fimg_url) {
                                return (
                                    <div key={index} className={"postContent postContent_image"}>
                                        <div className={"image_content"}>
                                            <div className={"featured_image"}>
                                                <img src={post.fimg_url}/>
                                            </div>
                                            <div dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
                                        </div>
                                    </div>
                                )
                            } else if (post.content.rendered === "") {
                                return (
                                    <div key={index} className={"postContent"}><p>Geen content
                                        beschikbaar</p>
                                    </div>
                                )
                            } else if (post.slug === "planning-poker") {
                                return (
                                    <div key={index} id={"planningpoker_parent"}>
                                        <PlanningPoker post={post}/>
                                    </div>
                                )
                            } else {
                                return <div key={index} className={"postContent"}
                                            dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
                            }
                        }
                    })}
                </div>
            )
        }} else {
        return (
            <Loader type="ThreeDots" color="#FFF" height={80} width={80}/>
        )
    }
};

export default ShowSubContent;
