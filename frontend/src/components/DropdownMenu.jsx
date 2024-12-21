import { useState } from "react";
import styled from "../styles/Dropdown.module.css";


const DropdownMenu = ({ name, number, children }) => {
    const [isActive, setActive] = useState(false);

    const handleToggle = () => {
        return setActive(!isActive);
    }

    const height = number * 32;
    return (
        <li className={`nav-item ${isActive ? `${styled.active}` : `${styled.inactive}`}`}>
            <a className="nav-link dropdown-toggle" id={`${styled.navbarDropdown} `} role="button" onClick={handleToggle}>
                {name}
            </a>
            <ul className={`${styled.dropdownMenu} ${isActive ? styled.dropdownShow : styled.dropdownHide} `} style={{ height: `${height} px` }} >
                {children}
            </ul>
        </li>
    )
}

export default DropdownMenu