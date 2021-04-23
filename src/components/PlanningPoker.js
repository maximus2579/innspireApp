import {useEffect} from 'react';
import ReactDOMServer from "react-dom/server";
import {GiPizzaCutter} from "react-icons/gi";
import {IoShirtOutline} from "react-icons/io5";

const PlanningPoker = ({post}) => {
    var numbers = []
    var size = []
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
                    var previouscontent = document.querySelector("#planningpoker_parent").innerHTML
                    document.querySelectorAll(".classic li")[i].addEventListener("click", (e) => {
                        document.querySelector("#planningpoker_parent").innerHTML = `<div id="gekozen"><div id="gekozen_card"><p>${e.target.innerHTML}</p></div></div>`
                        document.querySelector('#gekozen>*').addEventListener("click", () => {
                            document.querySelector("#planningpoker_parent").innerHTML = previouscontent
                                var key = "";
                                var BTNs_planningpoker = document.querySelector(".postContent>div").children
                                for (let i=0; i<BTNs_planningpoker.length; i++){
                                    if (BTNs_planningpoker[i].classList.contains("navItemActive")){
                                        key = BTNs_planningpoker[i]
                                    }
                                }
                                getPlanningpoker()
                                key.click()


                        })
                    })
                }
            }
        }
        function tShirt(){
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
                        var previouscontent = document.querySelector("#planningpoker_parent").innerHTML
                        document.querySelector("#planningpoker_parent").innerHTML = `<div id="gekozen">${e.target.parentElement.innerHTML}</div>`
                        document.querySelector('#gekozen>*').addEventListener("click", () => {
                            document.querySelector("#planningpoker_parent").innerHTML = previouscontent
                                var key = "";
                                var BTNs_planningpoker = document.querySelector(".postContent>div").children
                                for (let i=0; i<BTNs_planningpoker.length; i++){
                                    if (BTNs_planningpoker[i].classList.contains("navItemActive")){
                                        key = BTNs_planningpoker[i]
                                    }
                                }
                                getPlanningpoker()
                                key.click()
                           })
                    })
                }
            }
        }
        if (document.getElementById('classic')) {
            classic()
            tShirt()
            if (localStorage.getItem("planningpoker")) {
                document.getElementById(localStorage.getItem("planningpoker")).click()
            }
        }
    }
    useEffect(() => {
        getPlanningpoker()
    });
    return (
    <>
        <div className={"postContent"} style={{width: "100%"}}>
            <div style={{display: "flex", justifyContent: "space-evenly"}}>
                <div id="classic">Classic</div>
                <div id="t-shirt">t-shirt sizing</div>
            </div>
        </div>
        <div dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
    </>
    );
};

export default PlanningPoker;
