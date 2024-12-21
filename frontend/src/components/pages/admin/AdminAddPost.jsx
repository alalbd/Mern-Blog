import { Editor } from 'primereact/editor';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import SelectInput from '../../form/SelectInput';
import Input from '../../form/Input';
import Form from '../../form/Form';
import Button from '../../form/Button';


const AdminAddPost = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState('');

    const navigate = useNavigate();

    const user = localStorage.getItem('loggedUser');
    const token = localStorage.getItem('token');
    const { userID } = JSON.parse(user);

    const handleImage = (e) => {
        const image = e.target.files[0];
        setPhoto(image);
    }

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            // form data
            let formData = new FormData();
            formData.append('title', title);
            formData.append('user', userID);
            formData.append('desc', desc);
            formData.append('category', category);
            formData.append('content', content);
            formData.append('photo', photo);

            const res = await fetch('http://127.0.0.1:5000/api/v1/post/create', {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });

            const result = await res.json();

            if (result.success === false) {
                toast.success(result?.errors?.photo?.msg);
            } else {
                setTimeout(() => {
                    toast.success(result?.message);
                    navigate("/admin/all/post");
                }, 2000);
            }

        } catch (error) {
            toast.error(error?.error.message);
        }
    }

    return (
        <>
            <Form method={"POST"} onSubmit={handleForm}>
                <div className="row">
                    <div className="col-8">
                        <Input labelName={"Post Title"} onChange={(e) => setTitle(e.target.value)} value={title} />
                        <Editor onTextChange={(e) => setContent(e.htmlValue)} style={{ height: '320px' }} value={content} />
                    </div>
                    <div className="col-4">
                        <SelectInput labelName={"Category"} onChange={(e) => setCategory(e.target.value)} value={category} />
                        <Input labelName={"Descption"} onChange={(e) => setDesc(e.target.value)} value={desc} />
                        <div className="mb-3">
                            {photo ? (<img src={URL.createObjectURL(photo)} alt='' className='img-fluid' />) : ""}
                            <input type='file' onChange={handleImage} />
                        </div>
                        <Button className={"btn btn-success py-1 px-3"}>Add Post</Button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default AdminAddPost