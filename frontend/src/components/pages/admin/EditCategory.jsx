import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Input from '../../form/Input';
import Form from '../../form/Form';
import Button from '../../form/Button';

const EditCategory = ({ name }) => {
    const [category, setCategory] = useState(name);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { id } = useParams();

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            const data = {
                category_name: category,
            }
            const validStr = JSON.stringify(data);
            const res = await fetch(`http://127.0.0.1:5000/api/v1/category/update/${id}`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: validStr
            });
            const result = await res.json();

            setTimeout(() => {
                toast.success(result?.message);
                navigate("/admin/all/category");
            }, 2000);
        } catch (error) {
            toast.error(error?.error.message);
        }
    }

    return (
        <>
            <Form method={"PUT"} onSubmit={handleForm}>
                <div className="row">
                    <div className="col-8">
                        <Input labelName={"Category Name"} onChange={(e) => setCategory(e.target.value)} value={category} />
                    </div>
                    <div className="col-4 d-flex align-items-center">
                        <div className="mt-3">
                            <Button className={"btn btn-success py-1 px-3"}>Update Category</Button>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default EditCategory