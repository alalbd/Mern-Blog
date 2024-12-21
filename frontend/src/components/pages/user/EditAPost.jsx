import { Editor } from 'primereact/editor';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Button from "../../form/Button";
import Form from "../../form/Form";
import Input from "../../form/Input";
import SelectInput from '../../form/SelectInput';

const EditAPost = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState('');

    const navigate = useNavigate();

    const user = localStorage.getItem('loggedUser');
    const token = localStorage.getItem('token');

    const { userID } = JSON.parse(user);

    const { id } = useParams();


    // Get a edit post data
    useEffect(() => {
        const FeatchData = async () => {
            const res = await fetch(`http://127.0.0.1:5000/api/v1/post/update/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const resultData = await res.json();

            setTitle(resultData?.data?.title);
            setDesc(resultData?.data?.desc);
            setCategory(resultData?.data?.category);
            setContent(resultData?.data?.content);
            setPhoto(resultData?.data?.photo);
        }

        FeatchData();

    }, [id, token]);

    const handleImage = (e) => {
        setPhoto('');
        const image = e.target.files[0];
        setPhoto(image);
    }

    // Update Post
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

            const res = await fetch(`http://127.0.0.1:5000/api/v1/post/update/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });

            const result = await res.json();

            setTimeout(() => {
                toast.success(result?.message);
                navigate("/user/all/post");
            }, 2000);
        } catch (error) {
            toast.error(error?.error.message);
        }
    }

    return (
        <>
            <Form onSubmit={handleForm}>
                <div className="row">
                    <div className="col-8">
                        <Input labelName={"Post Title"} onChange={(e) => setTitle(e.target.value)} value={title} />
                        <Editor onTextChange={(e) => setContent(e.htmlValue)} style={{ height: '320px' }} value={content} />
                    </div>
                    <div className="col-4">
                        <SelectInput labelName={"Category"} onChange={(e) => setCategory(e.target.value)} value={category} />
                        <Input labelName={"Descption"} onChange={(e) => setDesc(e.target.value)} value={desc} />
                        <div className="mb-3">

                            {typeof photo === "object" ? (
                                <img src={URL.createObjectURL(photo)} alt='' className='img-fluid' />
                            ) : (
                                <img src={`${import.meta.env.VITE_REACT_APP_PUBLIC_PATH}upload/posts/${photo}`} alt="" className='img-fluid' />
                            )}
                            <input type='file' onChange={handleImage} />
                        </div>
                        <Button className={"btn btn-success py-1 px-3"}>Update Post</Button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default EditAPost