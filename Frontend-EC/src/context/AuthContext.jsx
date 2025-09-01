import { createContext, useContext, useEffect, useState } from "react";
import BEApi from "../../service/BEApi";

const AuthContext = createContext()

export function AuthProvider({children}) {
    const [user, setUser] = useState(null)

    const handleGetFresh = () => {
        window.location.reload();
    }

    useEffect(() => {
    async function fetchUser(id) {
        try {
            const res = await BEApi.UserApi.getById(id);
            const data = res.data;
            return { ...data, id: data._id };
            } catch (err) {
            localStorage.removeItem("user");
            setUser(null);
            console.error("Require new login", err);
            return null;
        }
    }

    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
        (async () => {
        const newUser = await fetchUser(savedUser.id);
        if (newUser) {
            localStorage.setItem("user", JSON.stringify(newUser));
            setUser(newUser);
        } else {
            localStorage.removeItem("user");
            setUser(null);
        }
        })();
    }
    }, []);


    const login = async (email, password, navigate, location) => {
        try {
            const res = await BEApi.UserApi.login(email, password)
            const user = res.data.user

            if (!user) {
                alert("Login failed")
                return
            }

            // Save user
            setUser(user)
            localStorage.setItem("user", JSON.stringify(user))

            // Decide where to go
            const redirectPath = location.state?.from
            ? location.state.from // go back to where user was
            : user.role === "user"
                ? "/personal"
                : "/admin"

            navigate(redirectPath, { replace: true })
        } catch (err) {
            console.error("Login error", err)
            alert("Invalid email or password")
        }
    }

    const signup = async (email, name, address, phone, password, navigate, location) => {
        try {
            const data = { email, name, address, phone, password, role: 'user' }

            const resp = await BEApi.UserApi.create(data)
            const newUser = {
                id: resp?.data.userId,
                _id: resp?.data.userId,
                email,
                name, 
                address,
                phone,
                role: 'user'
            }

            setUser(newUser)
            localStorage.setItem("user", JSON.stringify(newUser))

            const redirectPath = location.state?.from || "/"
            navigate(redirectPath, { replace: true })
            handleGetFresh()
        } catch (err) {
            alert(err.response?.data?.error || "Could not create account now. Try again later.")
        }
    }

    const logout = (navigate) => {
        setUser(null)
        localStorage.removeItem('user')
        navigate('/', { replace: true })
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user, handleGetFresh}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)