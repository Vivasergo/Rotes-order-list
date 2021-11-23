import React from 'react'
import {Table, Tag, Space} from 'antd';
import style from '../Style.module.css'
import { v4 as uuidv4 } from 'uuid';

export const PointDataTable = ({pointData}) => {

    const ADDRESS_TYPES = {
        building: 'Budynek',
        house_number: 'Numer budybku',
        road: 'Ulica',
        suburb: 'Okolica',
        city_district: 'Dzielnica miasta',
        city: 'Miasto',
        state: 'Województwo',
        postcode: 'Kod pocztowy',
        country: 'Kraj',
        country_code: 'Kod kraju',
        amenity: 'Punkt orientacyjny',
        town: 'Miasteczko',
        county: 'Powiat',
        neighbourhood: 'Osiedle',
        hamlet: 'Mała wioska',
        village: 'Wieś',
        municipality: 'Gmina',
    }

    const data =[]

    for(let [addrType, addrValue] of Object.entries(pointData.address)){
        data.push({
            key: uuidv4(),
            addressType: ADDRESS_TYPES[addrType] || addrType,
            addressValue: addrValue.toUpperCase()
        })
    }

    const columns = [
        {
            title: 'Address type',
            dataIndex: 'addressType',
            key: 'addressType',
            className: style.addressType,
        },
        {
            title: 'Value',
            dataIndex: 'addressValue',
            key: 'addressValue',
        },

    ];

    return <Table pagination={false} columns={columns} dataSource={data}/>
}