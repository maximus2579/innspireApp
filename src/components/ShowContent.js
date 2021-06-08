import {useParams, useHistory} from "react-router-dom";
import {useEffect} from "react";
import Loader from "react-loader-spinner";
import PlanningPoker from "./PlanningPoker";
import ListEvents from "./ListEvents";

const ShowContent = ({posts, titleID, titleIDChildren, titles}) => {
    const params = useParams();
    const history = useHistory();
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
    var x = window.matchMedia("(max-width: 800px)")
    function MakeActive(id, titleID){
        for (let i=0; i<document.querySelectorAll(".sideNav a").length; i++){
            document.querySelectorAll(".sideNav a")[i].classList.remove("navItemActive")
            if (document.querySelectorAll(".sideNav a")[i].attributes[0].value === id && parseInt(document.querySelectorAll(".sideNav a")[i].parentElement.parentElement.parentElement.children[0].children[1].dataset.id) === titleID){
                document.querySelectorAll(".sideNav a")[i].classList.add("navItemActive")
            }
        }
    }
    function NavStructure(){
        if (document.querySelector("#navStructures")){
            function getStructure (){
                for (let i =0; i<document.querySelector("#navStructures").children.length; i++){
                    document.querySelector("#navStructures").children[i].addEventListener("click", () => history.push(document.querySelector("#navStructures").children[i].dataset.url))
                }
            }
            var newPosts = posts.filter(post => post.categories[0] === titleID)
            for (let i = 0; i<titleIDChildren.length; i++){
                newPosts.push(posts.filter(post => post.categories[0] === titleIDChildren[i]))
            }
            var allPosts = newPosts.flat()
            var tableCells = [];
            for (let i1 =0; i1<titles.length; i1++){
            for (let i=0; i<allPosts.length; i++){
                    if (titles[i1].id === allPosts[i].categories[0]) {
                        var htmlObject = document.createElement('div');
                        htmlObject.innerHTML = allPosts[i].content.rendered;
                        tableCells.push(`<div class="${params.id === allPosts[i].slug ? "structureActive" : ""}" data-url="${titles[i1].id === titleID ? allPosts[i].slug : titles[i1].slug + "/" + allPosts[i].slug}">${htmlObject.querySelector(".icon img") ? `<img src='${htmlObject.querySelector(".icon img").src}'/>` : ""}<p>${allPosts[i].title.rendered}</p></div>`)
                    }
                }
            }
            document.querySelector("#navStructures").innerHTML = tableCells.join("")
            getStructure()
        }
    }

    useEffect(() => {
        NavStructure()
        MakeActive(params.id, titleID)
        myFunction(x)
        x.addListener(myFunction)
    });
        if (posts.length > 0) {
            if (params.id === "upcomming") {
                var filteredPosts = posts.filter(post => titleID === post.categories[0])
                return <ListEvents posts={filteredPosts} />
            }
            else {
                return (
                    <div className={"contentSection"}>
                        {posts.map((post, index) => {
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
export default ShowContent;
