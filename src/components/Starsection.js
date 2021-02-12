import {Link} from "react-router-dom"
import {IconContext} from "react-icons"
import {AiFillStar} from "react-icons/ai"

const Starsection = ({title}) => {
    return (
        <div>
            <IconContext.Provider value={{ size: "100px", color: "white" }}>
                    <AiFillStar/>
            </IconContext.Provider>
            <div className={"center"}><Link to={"/" +title.title.rendered}>{title.title.rendered}</Link></div>
        </div>
    );
};

export default Starsection;
