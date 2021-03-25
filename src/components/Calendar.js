import {useEffect} from "react"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Calendar = ({posts}) => {
    var events = posts
    var d = new Date();
    function newWeek (par) {
        if (par == "+"){
            d.setDate(d.getDate() + 7)
        }
        else {
            d.setDate(d.getDate() -7)
        }
        setData()
    }

    function showEvent (){
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];
        modal.style.display = "block";
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }



    var week = [
        "Maandag",
        "Dinsdag",
        "Woensdag",
        "Donderdag",
        "Vrijdag",
        "Zaterdag",
        "Zondag"
    ]
    var maanden = [
        "januari",
        "februari",
        "maart",
        "april",
        "mei",
        "juni",
        "juli",
        "augustus",
        "september",
        "oktober",
        "november",
        "december"
    ]

    async function setData () {

        var firstnewDate = new Date(d.getFullYear(), d.getMonth(), (d.getDate() - d.getDay() + 1))
        var secondnewDate = new Date(d.getFullYear(), d.getMonth(), (d.getDate() - d.getDay() + 7))
        var subheaderString = firstnewDate.getDate() + " " + maanden[firstnewDate.getMonth()] + " t/m " + secondnewDate.getDate() + " " + maanden[secondnewDate.getMonth()]
        document.querySelector("#jaar").innerHTML = d.getFullYear()
        document.querySelector("#substring").innerHTML = subheaderString
        for (let i = 0; i < 7; i++) {
            var contentEvents = []
            for (let i1 = 8; i1 <= 18; i1++) {
                contentEvents.push(`<div><p>${i1}:00</p></div>`)
            }
            document.querySelectorAll(".days>div>div")[i].innerHTML = contentEvents.join("")
            document.querySelectorAll(".days>div>div")[i].classList.remove("event")
        }
        if (events.length > 0) {
            for (let i2 = 0; i2 < events.length; i2++) {
                if (events[i2].cf.app_field_datum) {
                var beginTijd = events[i2].cf.app_field_begintijd
                var eindTijd = events[i2].cf.app_field_eindtijd
                    var upcommingDate = events[i2].cf.app_field_datum[0]
                    var splitDate = upcommingDate.split("-")
                    console.log(new Date(splitDate))
                var Datum = new Date(splitDate)
                    console.log(Datum)
                if (Datum >= firstnewDate && Datum <= secondnewDate) {
                    if (Datum.getDay() === 0){
                        Datum.set = 7
                    }
                    for (let i3 = 0; i3<11; i3++){
                        var content = document.querySelectorAll(".days>div>div")[Datum.getDay() === 0 ? 6 : Datum.getDay() - 1].querySelectorAll("div")[i3]
                        var x = parseInt(content.querySelector("p").innerText.substring(0,2));
                        if (x >= parseInt(beginTijd) && x <= parseInt(eindTijd)){
                            content.classList.add("event")
                            content.innerHTML= content.innerHTML + "<h4>" + events[i2].title.rendered + "</h4>"
                            document.querySelector(".modal-content").innerHTML = `<span class="close">&times;</span><h2>${events[i2].title.rendered}</h2><p>${events[i2].content.rendered}</p>`
                            content.addEventListener("click", showEvent)
                        }
                    }
                }
            }
        }
    }
    }
    useEffect(() => {
        setData()
    }, [])

    return (
        <div className={"calendar"}>
            <div id={"myModal"} className={"modal"}>
                <div className={"modal-content"}>
                </div>
            </div>
            <h1 id={"jaar"}></h1>
            <div className={"calendar-BTN"} onClick={() => newWeek()}><FaAngleLeft/></div>
            <h2 id={"substring"}></h2>
            <div className={"calendar-BTN"} onClick={() => newWeek("+")}><FaAngleRight/></div>
            <div className={"days"}>
                {week.map((dag) =>
                <div>
                    <h3>{dag}</h3>
                    <div className={"urenblokken"}></div>
                </div>
                )}
            </div>
        </div>
    );
};

export default Calendar;
