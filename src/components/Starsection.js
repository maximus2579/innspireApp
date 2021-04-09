import {Link} from "react-router-dom"
import {IconContext} from "react-icons"
import {AiFillStar} from "react-icons/ai"

const Starsection = ({title}) => {
    return (
        <div>
            <Link id={"link"} to={"/" +title.slug}>
            <IconContext.Provider value={{ size: "100px", color: "white" }}>
                    <AiFillStar/>
            </IconContext.Provider>
            <div className={"center"}>{title.name}</div>
            </Link>
        </div>
    );
};

export default Starsection;
