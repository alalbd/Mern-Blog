import { toast } from "react-toastify"
import { UseAuth } from "../../../contexts/AuthProvider"
import DropdownMenu from "../../../DropdownMenu"
import MenuItem from "../../../MenuItem"
import UserMenu from "./UserMenu"
import { Navigate } from "react-router-dom"


const Sidebar = ({ name, email }) => {
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
            <UserMenu userName={name} userEmail={email}>
                <MenuItem navLink={"/user/dashboard"} navName={"Dashboard"} />
                <MenuItem navLink={"/user/update/profile"} navName={"Profile"} />

                <DropdownMenu name={"Posts"} number={2}>
                    <MenuItem navLink={"/user/all/post"} navName={"All Post List"} />
                    <MenuItem navLink={"/user/add/new/post"} navName={"Add New Post"} />
                </DropdownMenu>

                <MenuItem onClick={handleLogout} navName={"Logout"} />
            </UserMenu>
        </div>
    )
}

export default Sidebar