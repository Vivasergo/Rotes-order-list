import React, {useEffect, useRef, useState} from 'react'
import {api} from "../../Service/api";
import Style from './style.module.css'
import moment from "moment";
import {Button} from 'antd';
import {OrderModal} from "../Modal/OrderModal";
import _ from 'lodash'

const Orders = ({setError, setIsLoading}) => {

    const [orders, setOrders] = useState([])
    const [orderForModal, setOrderForModal] = useState({})
    const [route, setRoute] = useState({})
    const [startPointData, setStartPointData] = useState({});
    const [finalPointData, setFinalPointData] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true)
            const response = await api.getOrders()
            setIsLoading(false)
            if (response.status.toString()[0] === '4') {
                setError((prevError) => ({...prevError, isError: true, errorMessage: response.data.detail}))
            } else if (response.status === 200) {
                setOrders(response.data)
            }
        }
        fetchOrders()
    }, [])


    const showModal = async (order) => {

        if(!_.isEqual(order, orderForModal)){
            setIsLoading(true)
            setOrderForModal(prevState => ({...prevState, ...order}))
            await handleRoute(order.source, order.destination)
            setIsLoading(false)
        }

        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleRoute = async (source, destination) => {
        const responseRoute = await api.getRoute(source, destination)
        const responseStartPointData = await api.getRoutePoint(source)
        const responseFinalPointData = await api.getRoutePoint(destination)

        setStartPointData(prevState => ({...prevState, ...responseStartPointData.data}))
        setFinalPointData(prevState => ({...prevState, ...responseFinalPointData.data}))
        setRoute(prevState => ({...prevState, ...responseRoute.data}))

    }

    return <div>
        <h3>{orders.length} - available orders at the moment:</h3>
        {orders.length === 0 ? '' :
            <div className='orders-list'>
                {isModalVisible && <OrderModal routeData={route} isModalVisible={isModalVisible} handleOk={handleOk}
                                               handleCancel={handleCancel} startPointData={startPointData}
                                               finalPointData={finalPointData} orderData={orderForModal}/>}
                {orders.map((order) => {
                    return <section key={order.id} className={Style.orderItem}>
                        <div>{order.order_number} <span>{order.subject}</span>
                            <span>{moment(order.destination.time).format("HH:mm DD.MM.YYYY")}</span>
                            <Button type="primary" onClick={() => showModal(order)}>
                                Show order
                            </Button>
                        </div>
                    </section>
                })}
            </div>
        }
    </div>
}

export default Orders
