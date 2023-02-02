import { createContext, useState } from "react"

const AuthContext = createContext();

const initialAuth = sessionStorage.getItem('authInnovasoft') || null;

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(JSON.parse(initialAuth))
    const handleAuth = (object) => {
        if (auth) {
            setAuth(null)
            sessionStorage.removeItem('authInnovasoft')
        } else {
            setAuth(object)
            sessionStorage.setItem('authInnovasoft', JSON.stringify(object))
        }
    }
    const data = { auth, handleAuth }
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

export { AuthProvider }
export default AuthContext;