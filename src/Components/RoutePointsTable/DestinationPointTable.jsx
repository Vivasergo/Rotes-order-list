import React from 'react'
import {PointDataTable} from "./PointDataTabel/PointDataTable";
import style from "./Style.module.css";

export const DestinationPointTable = ({pointData}) => {


    return <div className={style.pointTable}>
        <h3>Final destination:</h3>
        <PointDataTable pointData={pointData}/>
    </div>
}