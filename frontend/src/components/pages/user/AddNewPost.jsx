import { NavLink } from "react-router-dom";
import Meta from "../../Meta";
import AddPost from "./AddPost";
import Sidebar from "./template/Sidebar";

const AddNewPost = () => {
    const user = localStorage.getItem('loggedUser');

    const { name, email } = JSON.parse(user);

    return (
        <>
            <Meta title={"Add New Post"} />
            <div className="container">
                <div className="row">
                    <Sidebar name={name} email={email} />
                    <div className="col-9">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex justify-content-between">
                                    <h3 className="m-0">Add New Post</h3>
                                    <NavLink to={"/user/all/post"} className="py-1 px-3 border rounded">
                                        Back
                                    </NavLink>
                                </div>
                            </div>
                        </div>

                        <div className="py-3">
                            <div className="card">
                                <div className="card-body">
                                    <AddPost />
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div >
        </>

    )
}

export default AddNewPost;