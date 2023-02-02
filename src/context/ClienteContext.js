import { createContext, useState } from "react"

const ClienteContext = createContext();



const ClienteProvider = ({ children }) => {
    const [cliente, setCliente] = useState(null)
    const handleCliente = (object) => {
            setCliente(object)
    }
    const data = { cliente, handleCliente }
    return <ClienteContext.Provider value={data}>{children}</ClienteContext.Provider>
}

export { ClienteProvider }
export default ClienteContext;