import {useParams} from "react-router-dom";
import React from "react";
import Loader from "react-loader-spinner";


const ShowContent = ({posts}) => {
    function MakeActive(id){
        for (let i=0; i<document.querySelectorAll("a").length; i++){
            document.querySelectorAll("a")[i].classList.remove("navItemActive")
            if (document.querySelectorAll("a")[i].attributes[0].value == id){
                document.querySelectorAll("a")[i].classList.add("navItemActive")
            }
        }
    }
    const params = useParams();
    MakeActive(params.id)
    const content =[];
    posts.map((post) => {
        if (post.id == params.id) {
            if (post.content.rendered == ""){
                content.push("<p>Geen content beschikbaar</p>")
            } else {
                content.push(post.content.rendered)
                console.log(post.content.rendered)
            }
        }
    })
    if (posts.length > 0) {
        return (
                <div className={"postContent"} dangerouslySetInnerHTML={{__html: content}}>
                </div>
            )
    }
    else{
        return(
            <Loader type="ThreeDots" color="#FFF" height={80} width={80} />
        )
    }

};

export default ShowContent;
