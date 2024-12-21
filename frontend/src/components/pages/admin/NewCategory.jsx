import { NavLink } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AddNewCategory from "./AddNewCategory";
import Meta from "../../Meta";

const NewCategory = () => {
    const user = localStorage.getItem('loggedUser');
    const { name, email } = JSON.parse(user);

    return (
        <>
            <Meta title={"Add New Category"} />
            <div className="container">
                <div className="row">
                    <AdminSidebar name={name} email={email} />
                    <div className="col-9">
                        <div className="card">
                            <div className="p-2">
                                <div className="d-flex justify-content-between">
                                    <h3 className="m-0">Add New Category</h3>
                                    <NavLink to={"/admin/all/category"} className="py-1 px-3 border rounded">
                                        Back
                                    </NavLink>
                                </div>
                            </div>
                        </div>

                        <div className="py-3">
                            <div className="card">
                                <div className="card-body">
                                    <AddNewCategory />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}

export default NewCategory;