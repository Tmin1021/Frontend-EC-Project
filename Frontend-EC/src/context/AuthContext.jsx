import { createContext, useContext, useEffect, useState } from "react";
import GlobalApi from "../../service/GlobalApi";
import {isDummy, users } from "../data/dummy";
import { toast } from "sonner";
import bcrypt from "bcryptjs";


const AuthContext = createContext()

export function AuthProvider({children}) {
    const [user, setUser] = useState(null)


    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'))
        if (savedUser) setUser(savedUser)
    }, [])

    const login = async (mail, password, navigate) => {
        if (isDummy) {
            let newUser = null
            if (password === 'admin') newUser = users[0]
            else newUser = users[1]
            setUser(newUser)
            localStorage.setItem('user', JSON.stringify(newUser))
            navigate(newUser.role === 'user' ? '/' : '/admin', { replace: true })
            return
        }

        try {
            const res = await GlobalApi.UserApi.getByMail(mail);
            const users = res.data.data;

            if (users.length === 0) {
                alert("Invalid mail");
                return;
            }

            /*
            const isMatch = await bcrypt.compare(password, users[0]?.password);

            if (!isMatch) {
                alert("Wrong password");
                return;
            }*/

            const user = {
                user_id: users[0]?.documentId,
                name: users[0]?.name,
                mail: users[0]?.mail,
                phone: users[0]?.phone,
                address: users[0]?.address,
                role: users[0]?.role
            };

            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            navigate(user.role === 'user' ? '/personal' : '/admin', { replace: true });

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