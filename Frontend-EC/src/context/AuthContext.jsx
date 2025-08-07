import { createContext, useContext, useEffect, useState } from "react";
import GlobalApi from "../../service/GlobalApi";

const AuthContext = createContext()

export function AuthProvider({children}) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'))
        if (savedUser) setUser(savedUser)
    }, [])

    const login = async (mail, password, navigate) => {
    try {
        const res = await GlobalApi.UserApi.getByMail(mail);
        const users = res.data.data;

        if (users.length === 0) {
            alert("Invalid mail");
            return;
        }

        const user = {
            user_id: users[0]?.id,
            name: users[0]?.name,
            mail: users[0]?.phone,
            phone: users[0]?.phone,
            address: users[0]?.address,
            role: users[0]?.role
        };

        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        navigate(user.role === 'user' ? '/' : '/admin', { replace: true });

    } catch (err) {
        console.error("Login error", err);
        alert("Login failed");
    }
    };


    const logout = (navigate) => {
        setUser(null)
        localStorage.removeItem('user')
        navigate('/', { replace: true })
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)