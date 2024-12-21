import { Link } from "react-router-dom";

const MenuItem = ({ navLink, navName, ...rest }) => {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link py-1" to={navLink} {...rest}>{navName}</Link>
            </li>
        </>
    )
}

export default MenuItem