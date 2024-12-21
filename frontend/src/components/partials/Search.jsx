import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("title") || "");
    const navigate = useNavigate();

    const handleSearchForm = (e) => {
        e.preventDefault();

        setSearchParams({ title: search });
        navigate(`/search?title=${encodeURIComponent(search)}`);
    }

    return (
        <div className="p-0">
            <form className="d-flex" method="GET" onSubmit={handleSearchForm}>
                <input className="form-control me-2" style={{ width: "550px" }} type="search" placeholder="Search" onChange={(e) => setSearch(e.target.value)} value={search} />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    )
}

export default Search