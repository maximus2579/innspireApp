import {useEffect} from "react"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import {useHistory} from "react-router-dom"

const Calendar = ({posts, param}) => {
    var events = posts
    var d = new Date();

    function showEvent (events, e){
        document.querySelector(".modal-content").innerHTML = `<span class="close">&times;</span><h2>${events[e.target.getAttribute('data-value')].title.rendered}</h2><p>${events[e.target.getAttribute('data-value')].content.rendered}</p>`
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
        "Zondag",
        "Maandag",
        "Dinsdag",
        "Woensdag",
        "Donderdag",
        "Vrijdag",
        "Zaterdag",
    ]

    async function setData () {
        d.setDate(1)
        const lastDay = new Date(d.getFullYear(), d.getMonth() +1, 0).getDate()
        const prevLastDay = new Date(d.getFullYear(), d.getMonth(), 0).getDate();
        const firstDayIndex = d.getDay();
        const lastDayIndex = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDay();
        const nextDays = 7 - lastDayIndex -1;

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
        document.querySelector("#jaar").innerHTML = d.getFullYear()
        document.querySelector("#maand").innerHTML = maanden[d.getMonth()];

        let days = ""
        for (let i = firstDayIndex; i>0; i--) {
            days += `<div class="prev-date"><p>${prevLastDay - i + 1}</p></div>`
        }
        for (let i = 1; i <= lastDay; i++) {
                if (i === new Date().getDate() && d.getMonth() === new Date().getMonth()) {
                    days += `<div class="main-date today"><p style="width: 10%">${i}</p><p style="width: 50%">- Vandaag</p></div>`;
                } else {
                    days += `<div class="main-date"><p>${i}</p></div>`;
                }
        }
        if (nextDays === 0){
            days += ""
            document.querySelector("#allDays").innerHTML = days;
        }
        else if(nextDays >= 1) {
            for (let i = 1; i <= nextDays; i++) {
                days += `<div class="next-date"><p>${i}</p></div>`;
                document.querySelector("#allDays").innerHTML = days;
            }
        }
        if (events.length > 0) {
            events.sort((a, b) => (a.cf.app_field_eindtijd < b.cf.app_field_eindtijd ? 1 : -1))
            for (let i2 = 0; i2 < events.length; i2++) {
                if (events[i2].cf.app_field_datum) {
                    var upcommingDate = events[i2].cf.app_field_datum[0]
                    var splitDate = upcommingDate.split("-")
                var Datum = new Date(splitDate)
                if (Datum.getMonth() === d.getMonth() && Datum.getFullYear() === d.getFullYear()) {
                    for (let i=0; i<document.querySelectorAll(".main-date").length; i++){
                        var number = document.querySelectorAll(".main-date")[i].querySelector("p").innerText
                        if (parseInt(number) === Datum.getDate()){
                            var content = document.querySelectorAll(".main-date")[i].innerHTML
                            document.querySelectorAll(".main-date")[i].innerHTML = content + `<div class="event" data-value="${[i2]}">${events[i2].cf.app_field_begintijd + ":00 t/m " + events[i2].cf.app_field_eindtijd + ":00 - " + events[i2].title.rendered}</div>`
                                for (let i3 = 0; i3 < document.querySelectorAll(".main-date")[i].querySelectorAll(".event").length; i3++) {
                                   document.querySelectorAll(".main-date")[i].querySelectorAll(".event")[i3].addEventListener("click", (e) => showEvent(events, e))
                                }
                        }
                    }
                }
            }
        }
    }
        function myFunction(x) {
            if (x.matches) { // If media query matches
                for (let i=0; i<document.querySelectorAll(".day").length; i++) {
                    document.querySelectorAll(".day>h3")[i].innerText = document.querySelectorAll(".day")[i].innerText[0]
                }
                if (document.querySelector(".today")) {
                    document.querySelector(".today").querySelectorAll("p")[1].innerText = ""
                }

            } else {
                for (let i=0; i<document.querySelectorAll(".day").length; i++) {
                    document.querySelectorAll(".day>h3")[i].innerText = week[i]
                }
                if (document.querySelector(".today")) {
                    document.querySelector(".today").querySelectorAll("p")[1].innerText = "- Vandaag"
                }
            }
        }
        if (param === "events") {
            var x = window.matchMedia("(max-width: 700px)")
            myFunction(x) // Call listener function at run time
            x.addEventListener('change', myFunction);
        }
    }
    useEffect(() => {
        document.querySelector(".prev").addEventListener("click", () => {
            d.setMonth(d.getMonth() - 1);
            setData()
        });

        document.querySelector(".next").addEventListener("click", () => {
            d.setMonth(d.getMonth() + 1);
            setData()
        });
        setData()
    }, [])

    return (
        <div className={"calendar"}>
            <div id={"myModal"} className={"modal"}>
                <div className={"modal-content"}>
                </div>
            </div>
            <div className={"switch"}>
            <div className={"prev"}><FaAngleLeft/></div>
            <h2 id={"maand"}></h2>
            <div className={"next"}><FaAngleRight/></div>
                <h2 id={"jaar"}></h2>
            </div>
            <div className={"days"}>
                <div>
                {week.map((dag, index) =>
                    <div key={index} className={"day"}><h3>{dag}</h3></div>
                )}
                </div>
                <div id={"allDays"}></div>
            </div>
        </div>
    );
};

export default Calendar;
