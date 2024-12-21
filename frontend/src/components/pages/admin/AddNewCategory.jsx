import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Input from '../../form/Input';
import Form from '../../form/Form';
import Button from '../../form/Button';


const AddNewCategory = () => {
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const user = localStorage.getItem('loggedUser');
    const token = localStorage.getItem('token');
    const { userID } = JSON.parse(user);

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            const data = {
                user: userID,
                category_name: category,
            }

            const validStr = JSON.stringify(data);

            const res = await fetch('http://127.0.0.1:5000/api/v1/category/create', {
                method: "POST",
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
            <Form method={"POST"} onSubmit={handleForm}>
                <div className="row">
                    <div className="col-8">
                        <Input labelName={"Category Name"} onChange={(e) => setCategory(e.target.value)} value={category} />
                    </div>
                    <div className="col-4 d-flex align-items-center">
                        <div className="mt-3">
                            <Button className={"btn btn-success py-1 px-3"}>Add Category</Button>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default AddNewCategory