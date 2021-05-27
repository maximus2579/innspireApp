import {useParams, useHistory} from "react-router-dom";
import React, {useEffect} from "react";
import Loader from "react-loader-spinner";
import PlanningPoker from "./PlanningPoker";
import ListEvents from "./ListEvents";
import Structures from "./Structures";


const ShowContent = ({posts, titleID, titleIDChildren}) => {
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
    var x = window.matchMedia("(max-width: 700px)")
    function MakeActive(id){
        for (let i=0; i<document.querySelectorAll(".sideNav a").length; i++){
            document.querySelectorAll(".sideNav a")[i].classList.remove("navItemActive")
            if (document.querySelectorAll(".sideNav a")[i].attributes[0].value === id){
                document.querySelectorAll(".sideNav a")[i].classList.add("navItemActive")
            }
        }
    }
    useEffect(() => {
        MakeActive(params.id)
        myFunction(x)
        x.addListener(myFunction)
        if(document.querySelector("#navStructures")){
            console.log(document.querySelector("#navStructures").children)
            for (let i = 0; i<document.querySelector("#navStructures").children.length; i++){
                document.querySelector("#navStructures").children[i].addEventListener("click", ()=> {
                    history.push("/" + params.param + document.querySelector("#navStructures").children[i].attributes[0].value)
                })
            }
        }
    });
    // titles.map( (title) => {
    // if (params.param === title.slug){
        console.log(posts)
        if (posts.length > 0) {
            // console.log(title.id)
                // posts.sort((a, b) => (a.cf.app_field_datum > b.cf.app_field_datum ? 1 : -1))
                return (
                    <div className={"contentSection"}>
                        {posts.map((post, index) => {
                            console.log(titleIDChildren, post.categories);
                                if (params.id === "upcomming" && titleID === post.categories[0]) {
                                    return <ListEvents key={index} post={post}/>
                                }
                                else if (params.id === "structures" && titleIDChildren[0] === post.categories[0]) {
                                    return <Structures key={index} post={post}/>
                                }
                                else if (post.slug === params.id) {
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
            } else {
            return (
                <Loader type="ThreeDots" color="#FFF" height={80} width={80}/>
            )
        }


};
export default ShowContent;
