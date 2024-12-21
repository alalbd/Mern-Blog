
import { useEffect, useState } from "react";

const SelectInput = ({ labelName, ...rest }) => {
    const [cat, setCat] = useState([]);
    const token = localStorage.getItem('token');


    const dataCat = async () => {
        const res = await fetch('http://127.0.0.1:5000/api/v1/category/get/all', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const result = await res.json();

        setCat(result?.data);
    }

    useEffect(() => {
        dataCat();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])





    return (
        <div className="mb-3">
            <label htmlFor="fullName" className="form-label">{labelName}</label>
            <select className="form-select" {...rest} aria-label="Default select example">
                <option >Select Menu</option>
                {cat?.map((val) => (
                    <option key={val?._id} value={val?._id}>{val?.category_name}</option>
                ))}

            </select>
        </div>

    )
}

export default SelectInput