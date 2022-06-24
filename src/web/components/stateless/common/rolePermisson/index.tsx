import React, { useState } from "react";
import { Row, Col, Form } from "antd";
import { Checkbox } from "antd";
import "./rolePermisson.less";
import { useSelector } from "react-redux";
import { RoleStateSelector } from "../../../../../redux/reducers/role/roleReducer";
const RolePermisson = (props: any) => {
  const { item, onChange, roleDetails, setDisableSave } = props;

  const [view, setView] = useState(item.isView)
  const [edit, setEdit] = useState(item.isEdit)

  const handleCheck = (e: any) => {
   if(roleDetails.isCustom){
     
   }
        
    
 }

 

 const detectChange=()=>{
  if(setDisableSave){
    setDisableSave(false)
  }
}

const handleCheckBox = (e:any)=>{
  onChange(e)
  detectChange()
  }
    return (

        <div className="permissonScreen">
                <Form layout="vertical" onValuesChange={detectChange}>
         
            <Row gutter={[60,20]}>
               <Col span={6} className="slice">
               <span className="permisson-header f-16">{item?.name}</span>
               </Col>
               <Col span={11}>
                 <span className="f-12 permission-description">{item?.description}</span>
                 
               </Col>  
               <Col span={7}>

               <Row justify="end">
               <Col span = {6} md={12} lg={8} xl={6}>
                      {/* <Radio  name="view"   onChange={handleRadio}>View</Radio>   */}
                      <Checkbox className="rolePermissionCheck" id={item?.name} defaultChecked={item?.isView} disabled={!roleDetails?.isCustom}  name = "view"  onChange={handleCheckBox}><span className="permicheck">View</span></Checkbox>    
                 </Col>
               <Col span={6} md={12} lg={8} xl={6}>
                      {/* <Radio name="edit"  onChange={handleRadio}>Edit </Radio> */}
                      <Checkbox  className="rolePermissionCheck" id={item?.name} defaultChecked={item?.isEdit}  name = "edit"  disabled={!roleDetails?.isCustom}  onChange={handleCheckBox}><span className="permicheck">Edit</span></Checkbox>
                 </Col>  
               </Row>
               </Col> 
                           
                 
           </Row>      
           </Form>   
</div>
)}
export default RolePermisson;
