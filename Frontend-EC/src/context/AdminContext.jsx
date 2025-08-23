import { createContext, useContext, useEffect, useState } from "react";
import {isDummy, orders, products, users } from "../data/dummy";
import GlobalApi from '../../service/GlobalApi';

const AdminContext = createContext()
const BASE_URL = 'http://localhost:1337';

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
                const res = await GlobalApi.UserApi.getAll()
                const data = res.data.data.map(item => ({
                    ...item,
                    user_id: item?.documentId,
                    norm_id: item?.id,

                }))

                const new_data = data.filter(item => item.role==='user')
                setInitialUser(new_data)
                setCurrentUser(new_data)
            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        }

        async function fetchProducts() {
            try {
                const res = await GlobalApi.ProductApi.getAll()
                const data = res.data.data.map(item => ({
                    ...item,
                    product_id: item?.documentId,
                    norm_id: item?.id,
                    image_url: item.image_url.map(image => BASE_URL+image.url),
            }))
            
            setInitialInventory(data)
            setCurrentInventory(data)

            } catch (err) {
                console.error("Failed to fetch products", err);
            }
        }

        async function fetchOrders() {
            try {
                const res = await GlobalApi.OrderApi.getAll()
                const data = res.data.data.map(item => ({
                    ...item,
                    order_id: item?.documentId,
                    norm_id: item?.id,
                    order_date: GlobalApi.formatDate(item?.order_date),
                    status: item?.order_status,
                }))

                setInitialOrder(data)
                setCurrentOrder(data)
            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        }

        function fetchDummy() {
            setInitialUser(users)
            setInitialInventory(products)
            setInitialOrder(orders)
            setCurrentUser(users)
            setCurrentInventory(products)
            setCurrentOrder(orders)
        }

        if (isDummy) fetchDummy() 
        else {
            fetchUsers()
            fetchProducts()
            fetchOrders()}
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