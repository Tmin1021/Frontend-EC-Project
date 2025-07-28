import { createContext, useContext, useState } from "react";
import {  orders, products, users } from "../data/dummy";

const AdminContext = createContext()

export function AdminProvider({children}) {
    // for inventory
    const [currentInventory, setCurrentInventory] = useState(products)
    const [inventoryAscendings, setInventoryAscendings] = useState({product_id: true, name: true, type: true, stock: true, available: true})

    // for user
    const [currentUser, setCurrentUser] = useState(users)
    const [userAscendings, setUserAscendings] = useState({user_id: true, name: true, phone: true, mail: true, address: true})

    // for order
    const [currentOrder, setCurrentOrder] = useState(orders)

    const updateStatusOrder = (order_id, newStatus) => {
        const updatedOrders = currentOrder.map(order =>
            order.order_id === order_id
            ? { ...order, status: newStatus } 
            : order                       
        )

        setCurrentOrder(updatedOrders)
    }

    const sortInfo = (from, by) => {
        const mapping = {
            inventory: [currentInventory, inventoryAscendings],
            users: [currentUser, userAscendings],
        }
        const isAscending = mapping[from][1][by]

        const sorted = [...mapping[from][0]].sort((a, b) => {
        const aVal = a[by]  
        const bVal = b[by]

        if (typeof aVal === 'string') {
            return isAscending
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal)} 
        else if (typeof aVal === 'number' || typeof aVal === 'boolean') return isAscending ? aVal - bVal : bVal - aVal
        else return 0 })

        
        if (from==="inventory") {
            setCurrentInventory(sorted)
            const newInventoryAscendings = {...inventoryAscendings}
            newInventoryAscendings[by] = !newInventoryAscendings[by]
            setInventoryAscendings(newInventoryAscendings)}
        else if (from==='users') {
            setCurrentUser(sorted)
            const newUserAscendings = {...userAscendings}
            newUserAscendings[by] = !newUserAscendings[by]
            setUserAscendings(newUserAscendings)
        }
  }
    
    return (
        <AdminContext.Provider value={{currentInventory, currentUser, currentOrder, updateStatusOrder, sortInfo}}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => useContext(AdminContext)