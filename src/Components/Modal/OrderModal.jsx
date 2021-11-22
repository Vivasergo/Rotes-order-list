import React, {useEffect, useRef, useState} from 'react';
import {Modal, Button} from 'antd';
import style from './Style.module.css'
import endPinSrc from './Images/Location-512.png'
import L from 'leaflet'


export const OrderModal = ({isModalVisible, handleOk, handleCancel, routeData, startPointData, finalPointData}) => {



    // const mapRef = useRef(null);

    console.log('startPointData', startPointData);
    console.log('finalPointData', finalPointData);
    const [[startLon, startLat], [endLon, endLat]] = routeData.metadata.query.coordinates

    useEffect(()=>{

    },[])

    useEffect(() => {
        // if (!mapRef.current) return

        let myMap = L.map('map');
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
            {
                foo: 'bar',
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(myMap);

        let center = new L.LatLng(startLat, startLon);
        myMap.setView(center, 7.5);

        const endPinIcon = L.icon({
            iconUrl: endPinSrc,
            iconSize: [25, 40],
            iconAnchor: [12, 40],
        });

        L.marker([startLat, startLon], {title: "Start point"}).addTo(myMap);
        L.marker([endLat, endLon], {icon: endPinIcon, title: "Final destination"}).addTo(myMap);

        const featureLayer = L.geoJson(routeData, {});

        myMap.addLayer(featureLayer);
    }, []);

    return (
        <>
            <Modal bodyStyle={{height: '300px'}} title="Basic Modal" visible={isModalVisible} onOk={handleOk}
                   onCancel={handleCancel}>
                <div style={{height: '100%'}} id='map'></div>
            </Modal>
        </>
    );
};