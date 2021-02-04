import {IconContext} from "react-icons"
import {AiFillStar} from "react-icons/ai"
import {Link, BrowserRouter as Router} from "react-router-dom"

const Starsection = ({title}) => {
    return (
        <div>
            <IconContext.Provider value={{ size: "100px", color: "white" }}>
                    <AiFillStar/>
            </IconContext.Provider>
            <div className={"centerText"}><Router><div><Link to={"/" +title}>{title}</Link></div></Router></div>
        </div>
    );
};

export default Starsection;
