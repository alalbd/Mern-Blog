import { UseAuth } from "../contexts/AuthProvider";
import NavLogin from "./NavLogin";
import NavLogout from "./NavLogout";

const Action = () => {
    const { currentUser, setCurrentUser } = UseAuth();

    let validLoggedData;

    if (currentUser.token) {
        validLoggedData = <NavLogout />
    } else {
        validLoggedData = <NavLogin />
    }

    return validLoggedData;
}

export default Action