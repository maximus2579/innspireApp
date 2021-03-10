import {useParams} from "react-router-dom"
import {useState, useEffect} from "react";
import ShowPosts from "../components/ShowPosts";

const SubHome = () => {
    let {param} = useParams();
    const [posts, setPosts] = useState([]);
    const [Categories, setCategories] = useState([]);
    async function getAllCategories() {
        fetch(`${process.env.REACT_APP_PROTOCOL}//${process.env.REACT_APP_BASE_URL}/wp-json/wp/v2/categories?exclude=1&&hide_empty=true&&parent=0&&_fields=slug,id`)
            .then(response => response.json())
            .then(data => setCategories(data));
    }
    async function getAllPostTypes(Categories) {
        var id;
        for (let i = 0; i < Categories.length; i++) {
            if (Categories[i].slug == param) {
                id = Categories[i].id
            }
        }
        if (id) {
            fetch(`${process.env.REACT_APP_PROTOCOL}//${process.env.REACT_APP_BASE_URL}/wp-json/wp/v2/app?_embed&&categories=${id}&&_fields=slug,title,content,cf,_links`)
                .then(response => response.json())
                .then(data => setPosts(data))
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [])
    useEffect(() => {
        getAllPostTypes(Categories);
    }, [Categories])

    return (
        <ShowPosts posts={posts} param={param}/>
    );
};
export default SubHome;
