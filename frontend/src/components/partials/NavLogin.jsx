import { Link } from "react-router-dom";

const NavLogin = () => {
    const styles = {
        fontSize: "14px"
    }
    return (
        <div className="p-0">
            <div className="pe-2">
                <div className="d-flex justify-content-between gap-3">
                    <Link className="nav-link" style={styles} to={"/login"}>Login</Link>
                    <Link className="nav-link" style={styles} to={"/singup"}>Signup</Link>
                </div>
            </div>
        </div>
    )
}

export default NavLogin