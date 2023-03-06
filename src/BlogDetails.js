import { useParams, useHistory } from "react-router-dom";
import useFetch from "./usefetch";
import { useState } from "react";

const BlogDetails = () => {
    const { id } = useParams();
    const { data:blog, error, isPending } = useFetch(`http://localhost:8000/blogs/`+ id);
    const history = useHistory();
    const [isWaiting, setIsWaiting] = useState(false);


    const handleClick = () => {
        setIsWaiting(true);
        fetch(`http://localhost:8000/blogs/`+ blog.id, {
            method: "DELETE"
        }).then(() => {
            history.push("/");
        })
    }
    return ( 
        <div className="blog-details">
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div>}
            { blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    <div>{ blog.body }</div>
                    { !isWaiting && <button onClick={handleClick}>delete</button>}
                    { isWaiting && <button disabled>Deleting Blog...</button> }
                </article>
            )}
        </div>
     );
}
 
export default BlogDetails;