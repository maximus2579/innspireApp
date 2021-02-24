import {useEffect} from "react"

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
        var firstnewDate = new Date (d.getFullYear(), d.getMonth(), (d.getDate() -d.getDay() +1))
        var secondnewDate = new Date (d.getFullYear(), d.getMonth(), (d.getDate() -d.getDay() +7))
        var subheaderString = firstnewDate.getDate()+ " " +maanden[firstnewDate.getMonth()]+ " t/m " +secondnewDate.getDate()+ " " +maanden[secondnewDate.getMonth()]
        document.querySelector(".calendar h1").innerHTML = d.getFullYear()
        document.querySelector(".calendar h2").innerHTML = subheaderString
        if (events.length > 0){
            for (let i = 0; i<events.length; i++){
                var beginDag = events[i].acf.begin_datum.substring(0,2)
                var beginMaand = events[i].acf.begin_datum.substring(3,5)
                var beginJaar = events[i].acf.begin_datum.substring(6,10)
                var beginTijd = events[i].acf.begin_datum.substring(11,16)
                var eindDag = events[i].acf.begin_datum.substring(0,2)
                var eindMaand = events[i].acf.begin_datum.substring(3,5)
                var eindJaar = events[i].acf.begin_datum.substring(6,10)
                var eindTijd = events[i].acf.begin_datum.substring(11,16)
                console.log(beginTijd)
                var datum = new Date (parseInt(beginJaar), (parseInt(beginMaand) -1), parseInt(beginDag))
                if (datum > firstnewDate && datum < secondnewDate){
                    var eventday = datum.getDay() -1;
                    var content = document.querySelectorAll(".days>div>div")[eventday]
                    content.classList.add("event")
                    content.innerHTML = "<p>" + beginTijd + " t/m " + eindTijd + "</p><h4>" +events[i].title.rendered + "</h4>"
                }
                // console.log(parseInt(dag), d.getDay())
            }
        }
    }
    useEffect(() => {
        setData()

    }, [])

    return (
        <div className={"calendar"}>
            <h1></h1>
            <button onClick={() => newWeek()}> - </button>
            <h2></h2>
            <button onClick={() => newWeek("+")}> + </button>
            <div className={"days"}>
                {week.map((dag) =>
                <div>
                    <h3>{dag}</h3>
                    <div></div>
                </div>
                )}
            </div>
        </div>
    );
};

export default Calendar;
