import React, { useState, useMemo } from 'react'
import {
  orders as allOrders,
  order_items as allOrderItems,
  products as allProducts
} from '../../data/dummy'
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts'
import { AnimatePresence, motion } from "framer-motion";

// Local Select
const Select = ({ options = [], value, onChange }) => (
  <select
    value={value}
    onChange={onChange}
    className="border-1 border-gray-100 shadow-sm shadow-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none"
  >
    {options.map((opt) => (
      <option key={opt} value={opt}>{opt}</option>
    ))}
  </select>
)

const Admin_Dashboard = () => {
  const filterOptions = ['All time', 'Day', 'This Week', 'This Month']

  const [orderFilter, setOrderFilter] = useState('All time')
  const [revenueFilter, setRevenueFilter] = useState('All time')
  const [statusFilter, setStatusFilter] = useState('All time')
  const [productFilter, setProductFilter] = useState('All time')

  // Utility
  const parseDate = (d) => {
    const [day, month, year] = d.split('/').map(Number)
    return new Date(year, month - 1, day)
  }

  const isDateInFilter = (date, filter) => {
    const now = new Date();
    const target = parseDate(date);

    switch (filter) {
        case 'Day':
        return target.toDateString() === now.toDateString();
        case 'This Week': {
        const startOfWeek = new Date(now);
        const endOfWeek = new Date(now);
        // Convention: week starts on Monday -> Monday (1) -> Sunday (7)

        const day = now.getDay() || 7; // JS OR logic (0 is falsy, thus convert to 7)
        startOfWeek.setDate(now.getDate() - (day - 1));
        endOfWeek.setDate(now.getDate() + (7 - day));
        return target >= startOfWeek && target <= endOfWeek;
        }
        case 'This Month':
        // Compare both month and year
        return target.getMonth() === now.getMonth() && target.getFullYear() === now.getFullYear();
        default:
        return true;
    }
    };


  const filteredOrders = useMemo(() => {
    return allOrders.filter(o => isDateInFilter(o.order_date, orderFilter))
  }, [orderFilter]) // only re-compute when orderFilter changes

  const totalOrders = filteredOrders.length

  const totalRevenue = useMemo(() => {
    const filtered = allOrders.filter(o => isDateInFilter(o.order_date, revenueFilter))
    return filtered.reduce((sum, o) => sum + (o.total_amount - o.off_price), 0)
  }, [revenueFilter])

  // === ORDER STATUS CHART ===
  const orderStatusData = useMemo(() => {
    const filtered = allOrders.filter(o => isDateInFilter(o.order_date, statusFilter))
    const statusCount = {}

    filtered.forEach(order => {
      statusCount[order.status] = (statusCount[order.status] || 0) + 1
    })

    return Object.entries(statusCount).map(([status, count]) => ({
      name: status,
      value: count
    }))
  }, [statusFilter])

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00C49F', '#FF8042', '#d63939']

  // === TOP-SELLING PRODUCTS ===
    const topProducts = useMemo(() => {
      const productSales = {}

      allOrderItems.forEach(order => {
          const matchedOrder = allOrders.find(o => o.order_id === order.order_id)
          if (!isDateInFilter(matchedOrder.order_date, productFilter)) return

          order.products.forEach(item => {
            const productId = item.product_id
            const quantity = item.quantity
            const actualPrice = item.option ? item.option.price : item.price
            if (!productSales[productId]) {
                productSales[productId] = { quantity: 0, revenue: 0 }
          }
            productSales[productId].quantity += quantity
            productSales[productId].revenue += quantity * actualPrice
          })
      })

      const sorted = Object.entries(productSales)
          .map(([id, data]) => {
          const product = allProducts.find(p => p.product_id === id)
          return { name: product?.name || id, quantity: data.quantity, revenue: data.revenue }
          })

      return sorted
    }, [productFilter])

const topByQuantity = [...topProducts].sort((a, b) => b.quantity - a.quantity)[0]
const topByRevenue = [...topProducts].sort((a, b) => b.revenue - a.revenue)[0]

const today = new Date();
const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
  <AnimatePresence>
    <div className="p-6 space-y-6">
      <p className="text-3xl font-semibold">Report</p>
      <p className='text-3xl font-semibold text-gray-400'>{formattedDate}</p>

      {/* Top cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Orders */}
        <motion.div 
                    initial={{ opacity: 0, x: -40, y:-40 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: -40, y: -40 }}
                    transition={{ duration: 0.4 }}
                    className="border-1 border-gray-100 rounded-lg p-4 shadow-sm bg-white hover:shadow-lg transition-all">
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-medium text-gray-500 cursor-pointer">TOTAL ORDERS</p>
            <Select options={filterOptions} value={orderFilter} onChange={(e) => setOrderFilter(e.target.value)} />
          </div>
          <div className="text-4xl font-bold text-blue-600">{totalOrders}</div>
        </motion.div>

        {/* Total Revenue */}
        <motion.div 
                    initial={{ opacity: 0, x: 40, y: -40 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: 40, y: -40 }}
                    transition={{ duration: 0.4 }}
                    className="border-1 border-gray-100 rounded-lg p-4 shadow-sm bg-white hover:shadow-lg transition-all">
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-medium text-gray-500 cursor-pointer">TOTAL REVENUE</p>
            <Select options={filterOptions} value={revenueFilter} onChange={(e) => setRevenueFilter(e.target.value)} />
          </div>
          <div className="text-4xl font-bold text-green-600">${totalRevenue.toFixed(2)}</div>
        </motion.div>
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Status */}
        <motion.div 
                    initial={{ opacity: 0, x: -40, y: 40 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: -40, y: 40 }}
                    transition={{ duration: 0.4 }}
                    className="border-1 border-gray-100 rounded-lg p-4 shadow-sm bg-white hover:shadow-lg transition-all">
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-medium text-gray-500 cursor-pointer">ORDER STATUS</p>
            <Select options={filterOptions} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div 
                    initial={{ opacity: 0, x: 40, y: 40 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: 40, y: 40 }}
                    transition={{ duration: 0.4 }}
                    className="border-1 border-gray-100 rounded-lg p-4 shadow-sm bg-white hover:shadow-lg transition-all">
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-medium text-gray-500 cursor-pointer">BEST SELLING</p>
            <Select options={filterOptions} value={productFilter} onChange={(e) => setProductFilter(e.target.value)} />
          </div>
          <div className="space-y-3">
                <div className="text-sm text-gray-700 space-y-1">
                    <p className="font-medium">Top-Selling Products</p>
                    {topByQuantity && (
                        <p>
                            - By quantity sold – <span className="font-semibold">{topByQuantity.name}</span> – {topByQuantity.quantity} sold
                        </p>
                        )}
                    {topByRevenue && (
                     <p>
                        - By revenue – <span className="font-semibold">{topByRevenue.name}</span> – ${topByRevenue.revenue.toFixed(2)}
                      </p>
                    )}
                </div>
          </div>
        </motion.div>
      </div>
    </div>
  </AnimatePresence>
  )
}

export default Admin_Dashboard
