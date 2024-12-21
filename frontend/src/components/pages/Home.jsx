import React, { useEffect, useState } from "react"
import Cards from "../cards/Cards"
import Meta from "../Meta"

const Home = () => {
    const [post, setPost] = useState([]);

    useEffect(() => {
        const post = async () => {
            const res = await fetch(`http://127.0.0.1:5000/api/v1/post/get/for/all`, {
                method: "GET",
            });

            const result = await res.json();
            setPost(result?.data);
        }

        post()
    }, [])

    return (
        <>
            <Meta title="Home - MERN BLOG" />
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

export default React.memo(Home)