import React, {useEffect, useState} from 'react'
import {api} from "../../Service/api";
import Style from './style.module.css'
import moment from "moment";
import {Button} from 'antd';
import {OrderModal} from "../Modal/OrderModal";

const Orders = ({setError}) => {

    const [orders, setOrders] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
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


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return <div>
        <h3>{orders.length} - available orders at the moment:</h3>
        {orders.length === 0 ? '' :
            <div className='orders-list'>
                {orders.map((order) => {
                    return <section key={order.id} className={Style.orderItem}>
                        <div>{order.order_number} <span>{order.subject}</span> <span>{moment(order.destination.time).format("HH:mm DD.MM.YYYY")}</span>
                            <Button type="primary" onClick={showModal}>
                                Show order
                            </Button>
                            <OrderModal isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel}/>
                        </div>
                    </section>
                })}
            </div>
        }
    </div>
}

export default Orders
