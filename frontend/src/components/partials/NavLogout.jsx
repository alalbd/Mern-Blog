import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UseAuth } from "../contexts/AuthProvider";

const NavLogout = () => {
    const { currentUser, setCurrentUser } = UseAuth();
    const navigate = useNavigate();

    const { name } = JSON.parse(currentUser?.loggedUser);
    const userInfo = localStorage.getItem('loggedUser');
    const { user_role } = JSON.parse(userInfo);

    const handleLogout = () => {
        setCurrentUser({
            ...currentUser,
            token: '',
            loggedUser: {}
        });
        localStorage.removeItem('token');
        localStorage.removeItem('loggedUser');

        toast.success("User successfully logout!")
        navigate('/');
    }

    const admin = () => {
        if (user_role == "admin") {
            return <li><NavLink className="dropdown-item f-14" to={"/admin/dashboard"}>Admin Dashboard</NavLink></li>
        } else {
            return <li><Link className="dropdown-item f-14" to={"/user/dashboard"}>User Dashboard</Link></li>
        }
    }

    return (
        <div className="p-0">
            <div className="pe-2">
                <nav className="navbar navbar-expand-lg">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link f-14" to={`/${user_role === "admin" ? "admin" : "user"}/add/new/post`}>Add New Post</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link f-14 dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {name}
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                                {admin()}
                                <li><NavLink className="dropdown-item f-14" to={`/${user_role === "admin" ? "admin" : "user"}/update/profile`}>Profile</NavLink></li>
                                <li><NavLink className="dropdown-item f-14" to={"/login"} onClick={handleLogout}>Logout</NavLink></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div >
        </div >
    )
}

export default NavLogout