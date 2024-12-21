import { useEffect, useState } from "react"
import Meta from "../Meta";
import { useParams } from "react-router-dom";
import Cards from "../cards/Cards";

const Category = () => {
    const { id } = useParams();
    const [post, setPost] = useState([]);

    useEffect(() => {
        const post = async () => {
            const res = await fetch(`http://127.0.0.1:5000/api/v1/post/category/${id}`, {
                method: "GET",
            });

            const result = await res.json();
            setPost(result?.data);
        }
        post()
    }, [id])


    return (
        <>
            <Meta title={`${id}`} />
            <div className="row">
                {post?.map((val, key) => (
                    <div className="col-3 mb-3" key={key}>
                        <Cards image={val?.photo} title={val?.title} link={val?._id} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default Category