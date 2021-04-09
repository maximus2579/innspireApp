import React from 'react';

const ListEvents = ({posts}) => {
    posts.sort((a, b) => (a.cf.app_field_datum > b.cf.app_field_datum ?  1 : -1))
    return (
        <div className={"listContent"} >
            {posts.map((post, index) =>
                <div key={index} className={"eventItem"}>
            <h3>{post.title.rendered}</h3><div className={"eventItemString"}>{post.cf.app_field_datum} - {post.cf.app_field_begintijd}:00 t/m {post.cf.app_field_eindtijd}:00</div>
            <div dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
                </div>
            )}
        </div>
    );
};

export default ListEvents;
