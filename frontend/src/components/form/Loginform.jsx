import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { UseAuth } from "../contexts/AuthProvider"
import Button from "./Button"
import Form from "./Form"
import Input from "./Input"

const Loginform = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { currentUser, setCurrentUser } = UseAuth();

    const navigate = useNavigate();

    const handleForm = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            return toast.info('All field are required!');
        }

        const userObj = {
            username,
            password
        }

        try {
            const fetchUrl = 'http://127.0.0.1:5000/api/v1/user/login';
            const req = await fetch(fetchUrl, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(userObj)
            });

            const result = await req.json();

            // error handle
            const { errors } = result;
            if (errors) {
                Object.keys(errors).forEach((value) => {
                    toast.info(errors[value].msg);
                });
            } else {
                const { success, message, token, user } = result;

                if (success === true) {
                    toast.success(message);

                    // json to stringfy
                    const vaildJSON = JSON.stringify(user);

                    setCurrentUser({
                        ...currentUser,
                        token,
                        loggedUser: vaildJSON
                    });

                    localStorage.setItem('token', token);
                    localStorage.setItem('loggedUser', vaildJSON);

                    const userInfo = localStorage.getItem('loggedUser');
                    const { user_role } = JSON.parse(userInfo);
                    if (user_role === "admin") {
                        navigate('/admin/dashboard');
                    } else {
                        navigate('/user/dashboard');
                    }
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <>
            <Form method="POST" className="pt-2" onSubmit={handleForm}>
                <Input type="text" labelName={"Username"} name={"username"} onChange={(e) => setUsername(e.target.value)} value={username} />
                <Input type="password" labelName={"Password"} name={"password"} onChange={(e) => setPassword(e.target.value)} value={password} />

                <Button className={"bg-main border-0 rounded text-white py-2 px-5 mt-3"}>
                    Login
                </Button>
            </Form>
        </>
    )
}

export default Loginform