import { useEffect, useState } from "react"
import Meta from "../Meta";
import { useParams } from "react-router-dom";
import domPurify from "dompurify";
import moment from "moment";
import defImg from "../../assets/default.png";

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState([]);

    useEffect(() => {
        const post = async () => {
            const res = await fetch(`http://127.0.0.1:5000/api/v1/post/details/${id}`, {
                method: "GET",
            });

            const result = await res.json();
            setPost(result?.data);
        }
        post()
    }, [id])

    const postPhoto = () => {
        const postImg = post[0]?.photo;
        if (postImg === "default.png") {
            return <img src={defImg} alt={post[0]?.title} className="img-fluid" />
        } else {
            return <img src={`${import.meta.env.VITE_REACT_APP_PUBLIC_PATH}upload/posts/${post[0]?.photo} `} alt={post[0]?.title} className="img-fluid" />
        }
    }

    return (
        <>
            <Meta title={`${post[0]?.title}`} />
            <div className="row">
                <div className="col-12 py-3">
                    <div className="h3 mb-0">{post[0]?.title}</div>
                    <span className="text-muted">{moment(post[0]?.createdAt).startOf("day").fromNow()}</span>
                </div>
                <div className="col-12 py-3 text-center">
                    {postPhoto()}
                </div>
                <div className="col-12 py-2">
                    <div
                        dangerouslySetInnerHTML={{ __html: domPurify.sanitize(post[0]?.content, { ALLOWED_TAGS: ['b', 'p'] }) }}
                    />
                </div>
            </div>
        </>
    )
}

export default PostDetails