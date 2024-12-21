import React, { useContext, useEffect, useState } from 'react';


// create contexts
const AuthContext = React.createContext();

// use auth
export const UseAuth = () => {
    return useContext(AuthContext);
};

// auth provider
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        token: '',
        loggedUser: {}
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const logged = localStorage.getItem('loggedUser');

        // have token
        if (token) {
            setCurrentUser({
                ...currentUser,
                token,
                loggedUser: logged
            });
        }

        //eslint-disable-next-line
    }, [])

    const user = {
        currentUser,
        setCurrentUser
    }

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}