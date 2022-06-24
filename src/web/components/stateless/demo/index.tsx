import React from "react";
import { Row, Col, Card } from 'antd'

export const Demo = () => {
    return (
        <Row justify="center" style={{height:"100%",minHeight:"500px"}}>
            <Col span={8} style={{display:"flex", alignItems:"center",textAlign:"center",justifyContent:"center"}}>
            Feature not supported in this version
            </Col>
        </Row>
    )
}