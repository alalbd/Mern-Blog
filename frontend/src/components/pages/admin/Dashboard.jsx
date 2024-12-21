import Meta from "../../Meta";
import AdminSidebar from "./AdminSidebar";


const AdminDashboard = () => {
    const user = localStorage.getItem('loggedUser');
    const { name, email, user_role } = JSON.parse(user);

    return (
        <>
            <Meta title={"Admin Dashboard"} />
            <div className="container">
                <div className="row">
                    <AdminSidebar name={name} email={email} role={user_role} />
                    <div className="col-9">
                        <div className="p-0">
                            <div className="f-14">
                                <h4>Welcome to the Admin Dashboard</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}

export default AdminDashboard;