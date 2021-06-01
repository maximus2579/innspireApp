import {useParams} from "react-router-dom";
import {useEffect} from 'react'

const MediaQuery = () => {
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
    var x = window.matchMedia("(max-width: 800px)")
    function MakeActive(id, titleID){
        for (let i=0; i<document.querySelectorAll(".sideNav a").length; i++){
            document.querySelectorAll(".sideNav a")[i].classList.remove("navItemActive")
            if (document.querySelectorAll(".sideNav a")[i].attributes[0].value === id && parseInt(document.querySelectorAll(".sideNav a")[i].parentElement.parentElement.parentElement.children[0].children[1].dataset.id) === titleID){
                document.querySelectorAll(".sideNav a")[i].classList.add("navItemActive")
            }
        }
    }

    useEffect(() => {
        MakeActive(params.id, titleID)
        myFunction(x)
        x.addListener(myFunction)
    });
};

export default MediaQuery;
