import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import Loader from "react-loader-spinner";
import PlanningPoker from "./PlanningPoker";


const ShowContent = ({posts}) => {
    useEffect(() => {
        MakeActive(params.id)
    });
    function MakeActive(id){
        for (let i=0; i<document.querySelectorAll("a").length; i++){
            document.querySelectorAll("a")[i].classList.remove("navItemActive")
            if (document.querySelectorAll("a")[i].attributes[0].value == id){
                document.querySelectorAll("a")[i].classList.add("navItemActive")
            }
        }
    }
    const params = useParams();
    if (posts.length > 0) {
        return(
        posts.map((post, index) => {
        if (post.slug === params.id) {
            if (post.fimg_url){
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
                        <div key={index} className={"postContent"}><p>Geen content beschikbaar</p></div>
                    )
                } else if (post.slug === "planning-poker") {
                    return (
                        <div key={index} id={"planningpoker_parent"}>
                           <PlanningPoker post={post}/>
                        </div>
                    )
                }
            else {
                    return <div key={index} className={"postContent"} dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
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
