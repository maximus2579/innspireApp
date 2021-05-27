const Structure = ({post}) => {
    function getStructure (id){
        for (let i=0; i<document.getElementsByClassName("structure").length; i++) {
            console.log(document.getElementsByClassName("structure")[i].attributes[0].value, id)
            if (parseInt(document.getElementsByClassName("structure")[i].attributes[0].value) === id) {
                document.getElementsByClassName("structure")[i].classList.remove("hide")
                document.getElementsByClassName("structure")[i].classList.add("visible")
            }
        }
    }
    // console.log(post)
    // post.map ( (structure) => {
        return (
            <div className={"postContent"}>
                <div id="navStructures">
                    <div onClick={() => getStructure(post.id)}>{post.title.rendered}</div>
                </div>
                    <div data-id={post.id} className={"structure hide"} dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
            </div>
        );
    // })

};

export default Structure;
