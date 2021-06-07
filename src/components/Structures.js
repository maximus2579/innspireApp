const Structures = ({posts}) => {
    function getStructure (e, id){
        for (let i=0; i<document.getElementsByClassName("structure").length; i++) {
            console.log(document.querySelectorAll("#navStructures > div")[i])
            document.querySelectorAll("#navStructures > div")[i].classList.remove("structureActive")
            document.getElementsByClassName("structure")[i].classList.add("hide")
                e.target.classList.add("structureActive")
            if (parseInt(document.getElementsByClassName("structure")[i].attributes[0].value) === id){
                document.getElementsByClassName("structure")[i].classList.remove("hide")
                document.getElementsByClassName("structure")[i].classList.add("visible")
            }
        }
    }
    // post.map ( (structure) => {
    return (
        <div className={"contentSection"}>
            <div className={"postContentStructures"}>
                <div id="navStructures">
                    {posts.map((post) => <div onClick={(e) => getStructure(e, post.id)}>{post.title.rendered}</div>)}
                </div>
                    {posts.map((post) => <div data-id={post.id} className={"structure hide"} dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>)}
            </div>
        </div>
        );
    // })

};

export default Structures;
