import SideBar from "./SideBar";
import {Route, Switch} from "react-router-dom";
import ShowContent from "./ShowContent";
import NoMatch from "./NoMatch";

const Body = ({titles, posts}) => {
    document.body.style.height = "";
    document.body.style.alignItems = "";

    return (
        <>
            <SideBar titles={titles} posts={posts}/>
            <Switch>
                {titles.map((title) => <Route path={`/${title.slug}/:id`} exact children={<ShowContent titleID={title.id} titleIDChildren={title.children} posts={posts}/>}/>)}
                <Route path={"*"} >
                    <NoMatch/>
                </Route>
            </Switch>
        </>
    );
};

export default Body;
