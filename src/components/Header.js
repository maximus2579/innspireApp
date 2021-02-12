import ShowPosts from "./ShowPosts"

const Header = ({posts, param}) => {
    return (
           <ShowPosts posts={posts} param={param}/>
    );
};

export default Header;
