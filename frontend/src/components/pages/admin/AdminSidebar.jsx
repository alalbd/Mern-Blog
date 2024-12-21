import { toast } from "react-toastify"
import { UseAuth } from "../../contexts/AuthProvider"
import DropdownMenu from "../../DropdownMenu"
import MenuItem from "../../MenuItem"
import UserMenu from "../user/template/UserMenu"
import { Navigate } from "react-router-dom"


const AdminSidebar = ({ name, email, role }) => {
    const { currentUser, setCurrentUser } = UseAuth();

    const handleLogout = () => {
        setCurrentUser({
            ...currentUser,
            token: '',
            loggedUser: {}
        });
        localStorage.removeItem('token');
        localStorage.removeItem('loggedUser');

        toast.success("User successfully logout!")
        Navigate('/')
    }


    return (
        <div className="col-3">
            <UserMenu userName={name} userEmail={email} role={role}>
                <MenuItem navLink={"/admin/dashboard"} navName={"Dashboard"} />
                <MenuItem navLink={"/admin/update/profile"} navName={"Profile"} />

                <DropdownMenu name={"Posts"} number={2}>
                    <MenuItem navLink={"/admin/all/post"} navName={"All Post List"} />
                    <MenuItem navLink={"/admin/add/new/post"} navName={"Add New Post"} />
                </DropdownMenu>

                <DropdownMenu name={"Category"} number={2}>
                    <MenuItem navLink={"/admin/all/category"} navName={"All Category"} />
                    <MenuItem navLink={"/admin/add/new/category"} navName={"Add New Category"} />
                </DropdownMenu>

                <MenuItem navName={"Logout"} onClick={handleLogout} />
            </UserMenu>
        </div>
    )
}

export default AdminSidebar