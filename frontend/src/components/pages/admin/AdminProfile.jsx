import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "../../../styles/Tabs.css";
import AdminSidebar from "./AdminSidebar";
import Meta from "../../Meta";
import Input from "../../form/Input";
import Form from "../../form/Form";
import Button from "../../form/Button";

const AdminProfile = () => {
    const user = localStorage.getItem('loggedUser');
    const token = localStorage.getItem('token');
    const { name, email, userID, username, user_role } = JSON.parse(user);
    const [tab, setTab] = useState(1);
    const [fullname, setName] = useState(name);
    const [useremail, setEmail] = useState(email);
    const [usernames, setUsername] = useState(username);
    const [password, setPassword] = useState('');
    const info = JSON.parse(user);
    const [localData, setLocalData] = useState(info);

    const navigate = useNavigate();

    // tabs
    const handleTabs = (id) => {
        return setTab(id);
    }

    const tabClass = (id, className) => {
        return tab === id ? className : "";
    }

    // Handle Form
    const handleInfoForm = async (e) => {
        e.preventDefault();

        try {
            const data = {
                fullname
            }

            const validStr = JSON.stringify(data);

            const res = await fetch(`http://127.0.0.1:5000/api/v1/user/profile/update/${userID}`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: validStr
            });

            const result = await res.json();

            // Update local variable 
            const updateValue = {
                ...localData,
                name: fullname
            }
            localStorage.setItem('loggedUser', JSON.stringify(updateValue))

            setTimeout(() => {
                toast.success(result?.message);
                navigate("/admin/dashboard");
            }, 2000);
        } catch (error) {
            toast.error(error?.error.message);
        }
    }

    // password update
    const handlePassForm = async (e) => {
        e.preventDefault();

        try {
            const data = {
                password
            }

            const validStr = JSON.stringify(data);
            const res = await fetch(`http://127.0.0.1:5000/api/v1/user/profile/password/update/${userID}`, {
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
                navigate("/admin/dashboard");
            }, 2000);
        } catch (error) {
            toast.error(error?.error.message);
        }
    }

    return (
        <>
            <Meta title={"Profile update"} />
            <div className="container">
                <div className="row">
                    <AdminSidebar name={name} email={email} role={user_role} />
                    <div className="col-9">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex justify-content-between">
                                    <h3 className="m-0">Profile</h3>
                                    <NavLink to={"/admin/dashboard"} className="py-1 px-3 border rounded">
                                        Back Dashboard
                                    </NavLink>
                                </div>
                            </div>
                        </div>

                        <div className="py-3">
                            <div className="card">
                                <div className="card-body">
                                    <ul className="nav nav-tabs d-flex justify-content-center">
                                        <li className="nav-item w-50">
                                            <a className={`nav-link ${tabClass(1, "active")}`} aria-current="page" href="#" onClick={() => handleTabs(1)}>Info Update</a>
                                        </li>
                                        <li className="nav-item w-50">
                                            <a className={`nav-link ${tabClass(2, "active")}`} href="#" onClick={() => handleTabs(2)}>Password Change</a>
                                        </li>
                                    </ul>

                                    <div className={`content ${tabClass(1, "active-content")}`}>
                                        <div className="py-3 px-3">
                                            <Form method={"PUT"} onSubmit={handleInfoForm}>
                                                <Input labelName={"Full Name"} onChange={(e) => setName(e.target.value)} value={fullname} />

                                                <Input labelName={"Email"} placeholder={useremail} disabled />

                                                <Input labelName={"Username"} placeholder={usernames} disabled />

                                                <Button className={"btn btn-success py-1 px-3"}>
                                                    Update
                                                </Button>
                                            </Form>
                                        </div>
                                    </div>

                                    <div className={`content ${tabClass(2, "active-content")}`}>
                                        <div className="py-3 px-3">
                                            <Form method={"PUT"} onSubmit={handlePassForm}>
                                                <Input labelName={"Password"} type={"password"} onChange={(e) => setPassword(e.target.value)} value={password} />
                                                <Button className={"btn btn-success py-1 px-3"}>
                                                    Update Password
                                                </Button>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}

export default AdminProfile;