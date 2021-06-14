import {useEffect} from "react"

const HomeBody = ({posts, titleID}) => {
    function myFunction(x) {
        if (x.matches) { // If media query matches
            if (document.querySelector(".contentSection")) {
                document.querySelector(".contentSection").style.marginLeft = ""
            }
        } else {
            if (document.querySelector(".contentSection")) {
                document.querySelector(".contentSection").style.marginLeft = document.querySelector(".sideNav").offsetWidth.toString() + "px"
            }
        }
    }
    function MakeActive(){
        for (let i=0; i<document.querySelectorAll(".sideNav a").length; i++){
            document.querySelectorAll(".sideNav a")[i].classList.remove("navItemActive")
        }
        document.querySelector(".sideNav a").classList.add("navItemActive")
    }
    var x = window.matchMedia("(max-width: 800px)")
    useEffect(() => {
        MakeActive()
        myFunction(x)
        x.addListener(myFunction)
    })
    return (
        <div className={"contentSection"}>
            {posts.map((post, index) => {
                if (post.categories[0] === titleID) {
                    if (post.fimg_url) {
                        return (
                            <div key={index} className={"postContent postContent_image"}>
                                <div className={"image_content"}>
                                    <div className={"featured_image"}>
                                        <img src={post.fimg_url}/>
                                    </div>
                                    <div className={"postContent"}>
                                    <h1>{post.title.rendered}</h1>
                                    <div dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return(
                            <div className={"postContent"}>
                                <h1>{post.title.rendered}</h1>
                                <div dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
                            </div>
                    )
                    }
                }
            })}
        </div>
    )
};

export default HomeBody;
