import { createContext, useContext, useState } from "react";
import {  inventory, orders, products, users } from "../data/dummy";

const AdminContext = createContext()

export function AdminProvider({children}) {
    // for inventory
    const [currentInventory, setCurrentInventory] = useState(products)
    const [inventoryAscendings, setInventoryAscendings] = useState({product_id: true, name: true, type: true, stock: true, available: true})

    const updateInventory = (old_product, new_product) => {
        const updatedInventory = currentInventory.map(product =>
            product.product_id === old_product.product_id
                ? new_product
                : product
        )

        setCurrentInventory(updatedInventory)
    }

    const removeInventory = (product_id) => {
        const newInventory = currentInventory.filter(product => product.product_id !== product_id)
        setCurrentInventory(newInventory)
    }

    // for user
    const [currentUser, setCurrentUser] = useState(users)
    const [userAscendings, setUserAscendings] = useState({user_id: true, name: true, phone: true, mail: true, address: true})

    // for order
    const [currentOrder, setCurrentOrder] = useState(orders)
    const [orderAscendings, setOrderAscendings] = useState({order_id: true, user_id: true, order_date: true, shipping_address: true, total_amount: true})

    const updateStatusOrder = (order_id, newStatus) => {
        const updatedOrders = currentOrder.map(order =>
            order.order_id === order_id
            ? { ...order, status: newStatus } 
            : order                       
        )

        setCurrentOrder(updatedOrders)
    }

    // for universal
    const sortUniversal = (from, by) => {
        const mapping = {
            inventory: [currentInventory, setCurrentInventory, inventoryAscendings, setInventoryAscendings],
            user: [currentUser, setCurrentUser, userAscendings, setUserAscendings],
            order: [currentOrder, setCurrentOrder, orderAscendings, setOrderAscendings],
        }
        const [dataList, setter, isAscending, setAscendings] = mapping[from]

        const sorted = [...dataList].sort((a, b) => {
        const aVal = a[by]  
        const bVal = b[by]

        if (typeof aVal === 'string') {
            return isAscending[by]
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal)} 
        else if (typeof aVal === 'number' || typeof aVal === 'boolean') return isAscending[by] ? aVal - bVal : bVal - aVal
        else return 0 })

        setter(sorted)
        const newAscendings = {...dataList}
        newAscendings[by] = !newAscendings[by]
        setAscendings(newAscendings)
    }

    const searchUniversal = (from, input) => {
        const mapping = {
            inventory: [products, setCurrentInventory, ["name", "product_id", "type"]],
            user: [users, setCurrentUser, ["name", "user_id", "mail", "phone", "address"]],
            order: [orders, setCurrentOrder, ["order_id", "user_id", "order_date", "shipping_address", "total_amount"]]
        }

        const [dataList, setter, fields] = mapping[from]
        const newInput = input.toLowerCase()

        const newDataList = dataList.filter(item => 
            fields.some(field => item[field]?.toString().toLowerCase().includes(newInput))
        )

        setter(newDataList)
    }
    
    return (
        <AdminContext.Provider value={{currentInventory, currentUser, currentOrder, updateStatusOrder, sortUniversal, updateInventory, removeInventory, searchUniversal}}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => useContext(AdminContext)