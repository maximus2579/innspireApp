const Structures = ({posts}) => {
    function getStructure (id){
        for (let i=0; i<document.getElementsByClassName("structure").length; i++) {
            document.getElementsByClassName("structure")[i].classList.add("hide")
            if (parseInt(document.getElementsByClassName("structure")[i].attributes[0].value) === id){
                document.getElementsByClassName("structure")[i].classList.remove("hide")
                document.getElementsByClassName("structure")[i].classList.add("visible")
            }
        }
    }
    console.log(posts)
    // post.map ( (structure) => {
    return (
        <div className={"contentSection"}>
            <div className={"postContent"}>
                <div id="navStructures">
                    {posts.map((post) => <div onClick={() => getStructure(post.id)}>{post.title.rendered}</div>)}
                </div>
                <hr className={"devider"}/>
                    {posts.map((post) => <div data-id={post.id} className={"structure hide"} dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>)}
            </div>
        </div>
        );
    // })

};

export default Structures;
