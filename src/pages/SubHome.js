import Header from "../components/Header"
import {useParams} from "react-router-dom"
import {useState, useEffect} from "react";

const SubHome = () => {
    let {param} = useParams();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function getAllPostTypes() {
            fetch(`http://localhost/wordpress/wp-json/wp/v2/${param}`)
                .then(response => response.json())
                .then(data => setPosts(data))
        }

        getAllPostTypes(param)
    }, [])
    return (
        <Header posts={posts} param={param}/>
    );
};
export default SubHome;
