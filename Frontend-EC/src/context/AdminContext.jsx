import { createContext, useContext, useEffect, useState } from "react";
import {demo_1, demo_3 } from "../data/dummy";
import BEApi from "../../service/BEApi";
import { getFormatDate, refreshImageURL } from "../components/functions/product_functions";

const AdminContext = createContext()

export function AdminProvider({children}) {
    const [initialUser, setInitialUser] = useState([])
    const [initialInventory, setInitialInventory] = useState([])
    const [initialOrder, setInitialOrder] = useState([])
    const [currentUser, setCurrentUser] = useState([])
    const [currentInventory, setCurrentInventory] = useState([])
    const [currentOrder, setCurrentOrder] = useState([])
    const [getFresh, setGetFresh] = useState(false) // flip getFresh to update

    const handleGetFresh = () => {
        setGetFresh(!getFresh)
    }

    useEffect(()=> {
        async function fetchUsers() {
            try {
                const res = await BEApi.UserApi.getAll()
                const data = res.data.map((item, i) => ({
                    ...item,
                    norm_id: i,
                }))

                setInitialUser(data)
                setCurrentUser(data)
            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        }

        async function fetchProducts() {
            try {
                const res = await BEApi.ProductApi.getAll()
                const data = res.data.products
                
                if (data && data.length>0) {
                    const newData = res.data.products.map((item, i) => ({
                        ...item,
                        norm_id: i,
                        image_url: refreshImageURL(item?.image_url),
                    }))

                    setInitialInventory(newData)
                    setCurrentInventory(newData)
                }
            
            } catch (err) {
                console.error("Failed to fetch products", err);
            }
        }

        async function fetchOrders() {
            try {
                const res = await BEApi.OrderApi.getAll()
                const data = res.data.map((item, i) => ({
                    ...item,
                    norm_id: i,
                    order_date: getFormatDate(item?.createdAt)
                }))

                setInitialOrder(data)
                setCurrentOrder(data)
            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        }

        fetchUsers()
        fetchProducts()
        fetchOrders()
    }, [getFresh])

    // for inventory
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

    // for order
    const updateStatusOrder = (order_id, newStatus) => {
        const updatedOrders = currentOrder.map(order =>
            order.order_id === order_id
            ? { ...order, status: newStatus } 
            : order                       
        )

        setCurrentOrder(updatedOrders)
    }

    const filterStatus = status => {
        if (status === 'All') setCurrentOrder(initialOrder)
        else setCurrentOrder(initialOrder.filter(order => order.status === status))
    }

    // for universal
    const sortUniversal = (from, by, isAscending) => {
        const mapping = {
            inventory: [currentInventory, setCurrentInventory],
            user: [currentUser, setCurrentUser],
            order: [currentOrder, setCurrentOrder],
        }
        const [dataList, setter] = mapping[from]

        const sorted = [...dataList].sort((a, b) => {
        const aVal = a[by]  
        const bVal = b[by]

        if (typeof aVal === 'string') {
            return isAscending
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal)} 
        else if (typeof aVal === 'number' || typeof aVal === 'boolean') return isAscending ? aVal - bVal : bVal - aVal
        else return 0 })

        setter(sorted)
    }

    const searchUniversal = (from, input) => {
        const mapping = {
            inventory: [initialInventory, setCurrentInventory, ["name", "product_id", "type"]],
            user: [initialUser, setCurrentUser, ["name", "user_id", "mail", "phone", "address"]],
            order: [initialOrder, setCurrentOrder, ["order_id", "user_id", "order_date", "shipping_address", "total_amount"]]
        }

        const [dataList, setter, fields] = mapping[from]
        const newInput = input.toLowerCase()

        const newDataList = dataList.filter(item => 
            fields.some(field => item[field]?.toString().toLowerCase().includes(newInput))
        )

        setter(newDataList)
    }
    
    return (
        <AdminContext.Provider value={{currentInventory, currentUser, currentOrder, updateStatusOrder, filterStatus, handleGetFresh, sortUniversal, updateInventory, removeInventory, searchUniversal}}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => useContext(AdminContext)