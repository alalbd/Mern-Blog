import { NavLink } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Meta from "../../Meta";
import AdminAddPost from "./AdminAddPost";

const AdminAddNewPost = () => {
    const user = localStorage.getItem('loggedUser');
    const { name, email } = JSON.parse(user);

    return (
        <>
            <Meta title={"Add New Post"} />
            <div className="container">
                <div className="row">
                    <AdminSidebar name={name} email={email} />
                    <div className="col-9">
                        <div className="card">
                            <div className="p-2">
                                <div className="d-flex justify-content-between">
                                    <h3 className="m-0">Add New Post</h3>
                                    <NavLink to={"/admin/all/post"} className="py-1 px-3 border rounded">
                                        Back
                                    </NavLink>
                                </div>
                            </div>
                        </div>

                        <div className="py-3">
                            <div className="card">
                                <div className="card-body">
                                    <AdminAddPost />
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div >
        </>

    )
}

export default AdminAddNewPost;