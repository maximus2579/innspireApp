import SideBar from "./SideBar";
import {Route, Switch} from "react-router-dom";
import ShowContent from "./ShowContent";
import ShowSubContent from "./ShowSubContent";
import NoMatch from "./NoMatch";

const Body = ({titles, posts}) => {
    document.body.style.height = "";
    document.body.style.alignItems = "";
    // var filter = titles.filter(title => title.children[0] === titles.filter(title1 => title1.id))
    // console.log(filter)
    return (
        <>
            <SideBar titles={titles} posts={posts}/>
            <Switch>
                {titles.map((title) => <Route path={`/${title.slug}/:id`} exact children={<ShowContent titleID={title.id} titleIDChildren={title.children} posts={posts}/>}/>)}
                {titles.map((title) => title.children.map ((child) => titles.map((title1) => title1.id === child ?
                    // console.log(title.slug, title1.slug)
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
