import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Check if there's a saved username in localStorage
    const savedUsername = localStorage.getItem('username');
    const [username, setUsername] = useState(savedUsername || '');

    // Save username to localStorage whenever it changes
    useEffect(() => {
        if (username) {
            localStorage.setItem('username', username);
        } else {
            localStorage.removeItem('username');
        }
    }, [username]);

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};


export const useUser = () => useContext(UserContext);
