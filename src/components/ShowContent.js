import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import Loader from "react-loader-spinner";
import PlanningPoker from "./PlanningPoker";
import ListEvents from "./ListEvents";


const ShowContent = ({posts}) => {
    function MakeActive(id){
        for (let i=0; i<document.querySelectorAll(".sideNav a").length; i++){
            document.querySelectorAll(".sideNav a")[i].classList.remove("navItemActive")
            if (document.querySelectorAll(".sideNav a")[i].attributes[0].value == id){
                document.querySelectorAll(".sideNav a")[i].classList.add("navItemActive")
            }
        }
    }
    const params = useParams();
    var allPosts = []
    useEffect(() => {
        MakeActive(params.id)
    });
    if (posts.length > 0) {
        return(
        posts.map((post, index) => {
        if (params.id === "upcomming" && post.categories[0] === 11){
            allPosts.join(post)
                return(
                    <ListEvents posts={allPosts}/>
                )
            }
        else if (post.slug === params.id) {
            if (post.fimg_url){
                return (
                    <div className={"contentSection"}>
                    <div key={index} className={"postContent postContent_image"}>
                        <div className={"image_content"}>
                            <div className={"featured_image"}>
                                <img src={post.fimg_url}/>
                            </div>
                            <div dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
                        </div>
                        </div>
                    </div>
                )
            } else if (post.content.rendered === "") {
                    return (
                        <div className={"contentSection"}>
                        <div key={index} className={"postContent"}><p>Geen content beschikbaar</p></div>
                        </div>
                    )
                } else if (post.slug === "planning-poker") {
                    return (
                        <div className={"contentSection"}>
                        <div key={index} id={"planningpoker_parent"}>
                           <PlanningPoker post={post}/>
                        </div>
                        </div>
                    )
                }
            else {
                    return (
                        <div className={"contentSection"}>
                            <div key={index} className={"postContent"} dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
                        </div>
                    )
                }
        }
    })
        )
    }
    else{
        return(

            <Loader type="ThreeDots" color="#FFF" height={80} width={80} />
        )
    }

};
export default ShowContent;
