const ListEvents = ({post}) => {
    return (
        <>
                <div className={"eventItem"}>
                    {post.fimg_url ? <img src={post.fimg_url}/> : ""}
            <h3>{post.title.rendered}</h3><div className={"eventItemString"}>{post.cf.app_field_datum} - {post.cf.app_field_begintijd}:00 t/m {post.cf.app_field_eindtijd}:00</div>
            <div dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
                </div>
            </>
    );
};

export default ListEvents;
