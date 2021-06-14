import SideBar from "./SideBar";
import {Route, Switch} from "react-router-dom";
import ShowContent from "./ShowContent";
import ShowSubContent from "./ShowSubContent";
import NoMatch from "./NoMatch";
import HomeBody from "./HomeBody";

const Body = ({titles, posts}) => {
    document.body.style.height = "";
    document.body.style.alignItems = "";
    return (
        <>
            <SideBar titles={titles} posts={posts}/>
            <Switch>
                {titles.map((title) => title.slug === "home" ? <Route path={`/`} exact children={<HomeBody titleID={title.id} posts={posts}/>}/> :
                    <Route path={`/${title.slug}/:id`} exact children={<ShowContent titleID={title.id} titleIDChildren={title.children} titles={titles} posts={posts}/>}/>)}
                {titles.map((title) => title.children.map ((child) => titles.map((title1) => title1.id === child ?
                    <Route path={`/${title.slug}/${title1.slug}/:id`} exact children={<ShowSubContent titleID={child} posts={posts}/>}/>
                    : "" )))}
                <Route path={"*"} >
                    <NoMatch/>
                </Route>
            </Switch>
        </>
    );
};

export default Body;
