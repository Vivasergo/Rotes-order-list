import React, {useEffect, useState} from 'react'
import {api} from "../../Service/api";
import Style from './style.module.css'

const Orders = ({setError}) => {

    const [orders, setOrders] = useState([])
    console.log(orders)

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await api.getOrders()

            if (response.status.toString()[0] === '4') {
                setError((prevError) => ({...prevError, isError: true, errorMessage: response.data.detail}))
            } else if (response.status === 200) {
                setOrders(response.data)
            }
        }
        fetchOrders()
    }, [])

    return <div>
        <h3>{orders.length} - available orders at the moment:</h3>
        {orders.length === 0 ? '' :
            <div className='orders-list'>
                {orders.map((order) => {
                    return <section className={Style.orderItem}>
                        order.order_number
                    </section>
                })}
            </div>
        }
    </div>
}

export default Orders
