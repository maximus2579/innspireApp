import {useParams, useHistory} from "react-router-dom";
import React, {useEffect} from "react";
import Loader from "react-loader-spinner";
import {IoShirtOutline} from "react-icons/io5";
import { GiPizzaCutter } from "react-icons/gi";
import ReactDOMServer from 'react-dom/server';


const ShowContent = ({posts}) => {
    var history = useHistory();
    console.log(localStorage.getItem("planningpoker"))
    var numbers = []
    function getPlanningpoker () {
        for (let i = 0; i < document.querySelectorAll(".classic li").length; i++) {
            numbers.push(document.querySelectorAll(".classic li")[i].innerHTML)
        }
        function classic () {
            document.getElementById('classic').addEventListener("click", () => classicContent())
            function classicContent(){
                document.getElementById('classic').classList.add("navItemActive")
                document.getElementById('t-shirt').classList.remove("navItemActive")
                document.getElementsByClassName('t-shirt')[0].style.display = 'none'
                document.getElementsByClassName('classic')[0].style.display = 'flex'
                for (let i = 0; i < document.querySelectorAll(".classic li").length; i++) {
                   document.querySelectorAll(".classic li")[i].innerHTML = `<p>${numbers[i]}</p>`
                    if (document.querySelectorAll(".classic li")[i].innerText === "pizza slicer"){
                        document.querySelectorAll(".classic li")[i].innerHTML = ReactDOMServer.renderToString(<GiPizzaCutter/>)
                    }
                    document.querySelectorAll(".classic li")[i].addEventListener("click", (e) => {
                        document.querySelector(".postContent").classList.add("center")
                        document.querySelector(".classic").style.display = "none"
                        document.querySelector(".postContent").innerHTML = `<div id="gekozen"><div id="gekozen_card"><p>${e.target.innerHTML}</p></div></div>`
                        document.querySelector('#gekozen>*').addEventListener("click", () => history.go(0))
                    })
                }
            }
        }
        function tShirt(){
            var size = []
            for (let i = 0; i < document.querySelectorAll(".t-shirt li").length; i++) {
                size.push(document.querySelectorAll(".t-shirt li")[i].innerHTML)
            }
            document.getElementById('t-shirt').addEventListener("click", () => tshirtContent())
            function tshirtContent (){
                document.getElementById('t-shirt').classList.add("navItemActive")
                document.getElementById('classic').classList.remove("navItemActive")
                document.getElementsByClassName('classic')[0].style.display = 'none'
                document.getElementsByClassName('t-shirt')[0].style.display = 'flex'
                for (let i = 0; i < document.querySelectorAll(".t-shirt li").length; i++) {
                    document.querySelectorAll(".t-shirt li")[i].innerHTML = ReactDOMServer.renderToString(<IoShirtOutline/>)
                    var path = document.querySelectorAll(".t-shirt li svg")[i].innerHTML
                    document.querySelectorAll(".t-shirt li svg")[i].innerHTML = `${path}<text x="50%" y="50%" font-size="100px" font-weight="900" dominant-baseline="middle" text-anchor="middle">${size[i]}</text>`
                    if (document.querySelectorAll(".t-shirt li")[i].innerText === "pizza slicer"){
                        document.querySelectorAll(".t-shirt li")[i].innerHTML = `<div style="width: 100%">${ReactDOMServer.renderToString(<GiPizzaCutter/>)}</div>`
                        document.querySelectorAll(".t-shirt li")[i].style.width = "100%"
                    }
                    document.querySelectorAll(".t-shirt li svg")[i].addEventListener("click", (e) => {
                        document.querySelector(".postContent").classList.add("center")
                        document.querySelector(".t-shirt").style.display = "none"
                        document.querySelector(".postContent").innerHTML = `<div id="gekozen">${e.target.parentElement.innerHTML}</div>`
                        document.querySelector('#gekozen>*').addEventListener("click", () => history.go(0))
                    })
                }
            }
        }
        if (document.getElementById('classic')) {
            classic()
            tShirt()
            if (localStorage.getItem("planningpoker")){
                document.getElementById(localStorage.getItem("planningpoker")).click()
            }
        }
    }

    useEffect(() => {
        getPlanningpoker()
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
        posts.map((post) => {
        if (post.slug === params.id) {
            if (post.fimg_url){
                return (
                    <div className={"postContent postContent_image"}>
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
                        <div className={"postContent"}><p>Geen content beschikbaar</p></div>
                    )
                } else if (post.slug === "planning-poker") {
                    return (
                        <>
                        <div className={"postContent"}>
                            <div style={{display: "flex", justifyContent: "space-evenly"}}>
                                <div id="classic">Classic</div>
                                <div id="t-shirt">t-shirt sizing</div>
                            </div>
                        </div>
                            <div dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
                        </>

                    )
                } else {
                    return <div className={"postContent"} dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
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
