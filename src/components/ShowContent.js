import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import Loader from "react-loader-spinner";

const ShowContent = ({posts}) => {
    useEffect(() => {
        for (let i = 0; i<document.querySelectorAll(".planningLijst li").length; i++) {
            document.querySelectorAll(".planningLijst li")[i].addEventListener("click", (e) => {
                document.querySelector(".planningLijst").style.display = "none"
                document.querySelector(".postContent").classList.add("center")
                document.querySelector(".postContent").innerHTML = `<div id="gekozen_card">${e.target.innerHTML}</div>`
            })
        }
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
    const content =[];
    posts.map((post) => {
        if (post.slug == params.id) {
            if (post._embedded['wp:featuredmedia']){
                content.push(`<div class="image_content"><div class="featured_image"><img src="${post._embedded['wp:featuredmedia'][0].source_url}"></div><div>${post.content.rendered}</div></div>`)
                if (document.querySelector(".postContent")){
                    document.querySelector(".postContent").classList.add("postContent_image")
                }
            } else {
                if (document.querySelector(".postContent")) {
                    if (document.querySelector(".postContent").classList.contains("postContent_image")) {
                        document.querySelector(".postContent").classList.remove("postContent_image")
                    }
                }
                if (post.content.rendered == "") {
                    content.push("<p>Geen content beschikbaar</p>")
                } else if (post.title.rendered == "Planning poker") {
                    content.push(post.content.rendered)
                } else {
                    content.push(post.content.rendered)
                }
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
