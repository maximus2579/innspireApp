import SideBar from "./SideBar";
import {Route, Switch} from "react-router-dom";
import ShowContent from "./ShowContent";

const Body = ({titles, posts}) => {
    document.body.style.height = "";
    document.body.style.alignItems = "";
    return (
        <>
            <SideBar titles={titles} posts={posts}/>
            <Switch>
                <Route path={"/:param/:id"} exact children={<ShowContent posts={posts}/>}/>
            </Switch>
        </>
    );
};

export default Body;
