import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Button from "./Button";
import Form from "./Form";
import Input from "./Input";

const SignupForm = () => {
    const [loading, setLoading] = useState(false);
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const navigate = useNavigate();

    const handleForm = async (e) => {
        e.preventDefault();

        if (!fullname || !username || !email || !password) {
            return toast.info("All Field Are Required!");
        }

        const user = {
            full_name: fullname,
            username,
            email,
            password
        }

        try {
            setLoading(true);
            const req = await fetch('http://127.0.0.1:5000/api/v1/user/signup', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const result = await req.json();

            // error handle
            const { success, errors } = result;

            if (!success || errors) {

                setLoading(false)
                Object.keys(errors).forEach((value) => {
                    toast.info(errors[value].msg);
                });

            } else {
                const { message } = result;
                setLoading(false)
                toast.success(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }
        } catch (error) {
            toast(error.message);
        }

    }
    return (
        <>
            <Form method="POST" className="pt-2" onSubmit={handleForm}>
                <div className="d-flex gap-3 mb-3">
                    <div className="flex">
                        <Input type="text" labelName={"Full Name"} name={"full_name"} value={fullname} onChange={(e) => setFullname(e.target.value)} />
                    </div>
                    <div className="flex">
                        <Input type="text" labelName={"Username"} name={"username"} value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                </div>
                <Input type="email" labelName={"Email"} name={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" labelName={"Password"} name={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />

                <Button className={"bg-main border-0 rounded text-white py-2 px-5 mt-3"} disabled={loading}>
                    Signup
                </Button>
            </Form>
        </>
    )
}

export default SignupForm