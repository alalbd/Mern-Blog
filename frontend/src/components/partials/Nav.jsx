import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const Nav = () => {
    const [cat, setCat] = useState([])
    const styles = {
        fontSize: "14px"
    }

    useEffect(() => {
        const navBar = async () => {
            const res = await fetch(`http://127.0.0.1:5000/api/v1/category/all`, {
                method: "GET",
            });

            const result = await res.json();
            setCat(result?.data);
        }

        navBar()
    }, []);

    return (
        <div className="container-fluid py-1">
            <div className="d-flex justify-content-center align-items-center gap-3">
                {cat?.map((val, key) => (
                    <Link key={key} className="nav-link active" style={styles} to={`/category/${val?.category_slug}`}>{val.category_name}</Link>
                ))}
            </div>
        </div>
    )
}

export default Nav