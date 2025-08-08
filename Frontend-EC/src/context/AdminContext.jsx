import { createContext, useContext, useEffect, useState } from "react";
import {isDummy, orders, products, users } from "../data/dummy";
import GlobalApi from '../../service/GlobalApi';

const AdminContext = createContext()
const BASE_URL = 'http://localhost:1337';

export function AdminProvider({children}) {
    const [currentUser, setCurrentUser] = useState([])
    const [currentInventory, setCurrentInventory] = useState([])
    const [currentOrder, setCurrentOrder] = useState([])

    useEffect(()=> {
        async function fetchUsers() {
            try {
                const res = await GlobalApi.UserApi.getAll()
                const data = res.data.data.map(item => ({
                    user_id: item?.documentId,
                    name: item?.name,
                    mail: item?.mail,
                    phone: item?.phone,
                    address: item?.address,
                    role: item?.role
                }))

                const new_data = data.filter(item => item.role==='user')
                setCurrentUser(new_data)
            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        }

        async function fetchProducts() {
            try {
                const res = await GlobalApi.ProductApi.getAll()
                const data = res.data.data.map(item => ({
                    product_id: item?.documentId,
                    type: item?.type,
                    name: item?.name,
                    price: item?.price,
                    stock: item?.stock,
                    available: item?.available,
                    description: item?.description,
                    image_url: item.image_url.map(image => BASE_URL+image.url),
                    flower_details: item?.flower_details
            }))

            setCurrentInventory(data)

            } catch (err) {
                console.error("Failed to fetch products", err);
            }
        }

        async function fetchOrders() {
            try {
                const res = await GlobalApi.OrderApi.getAll()
                const data = res.data.data.map(item => ({
                    order_id: item?.documentId,
                    user_id: item?.user_id,
                    order_date: item?.order_date,
                    total_amount: item?.total_amount,
                    off_price: item?.off_price,
                    shipping_address: item?.shipping_address,
                    status: item?.order_status
                }))

                setCurrentOrder(data)
            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        }

        function fetchDummy() {
            setCurrentUser(users)
            setCurrentInventory(products)
            setCurrentOrder(orders)
        }

        if (isDummy) fetchDummy() 
        else {
        fetchUsers()
        fetchProducts()
        fetchOrders()}
    }, [])

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
        if (status === 'All') setCurrentOrder(orders)
        else setCurrentOrder(orders.filter(order => order.status === status))
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
        <AdminContext.Provider value={{currentInventory, currentUser, currentOrder, updateStatusOrder, filterStatus, sortUniversal, updateInventory, removeInventory, searchUniversal}}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => useContext(AdminContext)