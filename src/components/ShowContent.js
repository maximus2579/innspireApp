import {useParams, useHistory} from "react-router-dom";
import React, {useEffect} from "react";
import Loader from "react-loader-spinner";
import {IoShirtOutline} from "react-icons/io5";
import { GiPizzaCutter } from "react-icons/gi";
import ReactDOMServer from 'react-dom/server';


const ShowContent = ({posts}) => {
    var history = useHistory();
    console.log(localStorage.getItem("planningpoker"))
    function getPlanningpoker () {
        function classic () {
            document.getElementById('classic').addEventListener("click", () => classicContent())
            function classicContent(){
                document.getElementById('classic').classList.add("navItemActive")
                document.getElementById('t-shirt').classList.remove("navItemActive")
                document.getElementsByClassName('t-shirt')[0].style.display = 'none'
                document.getElementsByClassName('classic')[0].style.display = 'flex'
                for (let i = 0; i < document.querySelectorAll(".classic li").length; i++) {
                    if (document.querySelectorAll(".classic li")[i].innerText === "pizza slicer"){
                        document.querySelectorAll(".classic li")[i].innerHTML = ReactDOMServer.renderToString(<GiPizzaCutter/>)
                    }
                    document.querySelectorAll(".classic li")[i].addEventListener("click", (e) => {
                        document.querySelector(".postContent").classList.add("center")
                        document.querySelector(".postContent").innerHTML = `<div id="gekozen"><div id="gekozen_card">${e.target.innerHTML}</div></div>`
                        document.querySelector('#gekozen>*').addEventListener("click", () => history.push(0))
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
                        console.log(e)
                        document.querySelector(".postContent").classList.add("center")
                        document.querySelector(".postContent").innerHTML = `<div id="gekozen">${e.target.parentElement.innerHTML}</div>`
                        document.querySelector('#gekozen>*').addEventListener("click", () => history.push(0))
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
                    content.push(
                        `<div style="display: flex; justify-content: space-evenly"><div id="classic">Classic</div><div id="t-shirt">t-shirt sizing</div></div>
                        ${post.content.rendered}`
                    )
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
