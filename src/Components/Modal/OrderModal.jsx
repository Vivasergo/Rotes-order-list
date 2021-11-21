import React, {useState} from 'react';
import {Modal, Button} from 'antd';

export const OrderModal = ({isModalVisible, handleOk, handleCancel}) => {



    return (
        <>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};