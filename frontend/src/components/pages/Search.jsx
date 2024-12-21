import { useEffect, useState } from "react"
import Meta from "../Meta";
import { useSearchParams } from "react-router-dom";

const SearchResult = () => {
    const [post, setPost] = useState([]);
    const [searchParams, setParams] = useSearchParams();
    const title = searchParams.get("title");

    useEffect(() => {
        const post = async () => {
            const res = await fetch(`http://127.0.0.1:5000/api/v1/post/search/result/${title}`, {
                method: "GET",
            });

            const result = await res.json();
            setPost(result?.data);
        }

        post()
    }, [title])


    return (
        <>
            <Meta title="Search" />
            <div className="row">
                {!post?.length > 0 ? "No post Found" : <>
                    {post?.map((val, key) => (
                        <div className="card my-1" key={key}>
                            <p className="m-0 py-2">{val?.title}</p>
                        </div>
                    ))}
                </>}
            </div>
        </>
    )
}

export default SearchResult