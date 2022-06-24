import { Card, Col, Row } from "antd";
import React from "react";


const NODataFound=()=>{
    return(
        <>
        <Card className="organisationListCard" id="cardItem">
        <Row >
        <Col span={24}>
        <div style={{height:'65px'}}><p style={{padding:'20px',textAlign:'center'}}>No data Found</p></div>
        </Col>
        
        </Row>
      </Card>
        </>
    )
}
export default NODataFound