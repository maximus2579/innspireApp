import missingSrc from "../assets/404.png";
import {useEffect} from "react";

const NoMatch = () => {
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
    useEffect( () =>{
        myFunction(x)
        x.addListener(myFunction)
    } )
    return (
        <div className={"contentSection"}>
            <div  className={"postContent postContent_image"}>
                <div className={"image_content"}>
                    <div className={"featured_image"}>
                        <img src={missingSrc}/>
                    </div>
                    <div>
                        <h2 style={{padding: "1vw", margin: "0"}}>Geen Content gevonden!</h2>
                        <div>Probeer de content te zoeken in de sidebar!</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoMatch;
