import { Card, Col, Form, message, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpecialityList } from "../../../../redux/actions/providerActions/providerAction";
import { createSpeciality, updateSpecialty } from "../../../../redux/actions/specialty/specialtyAction";
import { clearState, SpecialtyStateSelector } from "../../../../redux/reducers/specialty/specialtyReducer";
import { RegExpressions } from "../../../constants/regexp";
import { AppRoutes } from "../../../router/appRoutes";
import { Breadcrumbs } from "../../stateless/common/breadCrumbs";
import Button from "../../stateless/common/button";
import { CompWrapper } from "../../stateless/common/contentWrapper";
import InputBox from "../../stateless/common/inputBox";
import "./specialityList.less"
import { ManageSpecialityTable, specialityTable } from "./table";
export const SpecialityList = () => {
    const dispatch = useDispatch()
    const {specialities, isCreated, isDeleted, formState, isUpdated} = useSelector(SpecialtyStateSelector)
    const [tableData, setTableData] = useState(specialityTable)
    const [isEditEnable, setEditEnable] = useState(false)
    const [updatedValue , setUpdatedValue] = useState()
    const [form] = Form.useForm()
    const [details, setDetails] = useState(
        {
            name: "",
            isCustom: true
        }
    )
    const breadCrumbs = [
        {
            text: "Dashboard",
            link: AppRoutes.LANDING,
        },
        {
            text: "Settings"
        },
    ];
    const handleUpdate = (specialty:any, value:any) => {
        dispatch(updateSpecialty({
            id: specialty?.id,
            name: value,
            isCustom: specialty?.isCustom
        }))
        setUpdatedValue(value)
    }
    const handleChange =(e: any) => {
        var { name, value } = e.target;
        setDetails({ ...details, [name]: value }); 
    }

    const handleSubmit = () => {
        dispatch(createSpeciality(details))        
    }
    useEffect(() => {
        if(isUpdated.isSuccess){
            message.success(`${updatedValue} updated successfully`)
            dispatch(getSpecialityList())
            dispatch(clearState())
            setEditEnable(false)
           }else if(isUpdated.isError){
               message.error({content:isUpdated?.errorStack ? isUpdated?.errorStack : "Something went wrong", key:"appNotification"})
               dispatch(clearState())
           }
       },[isUpdated.isSuccess , isUpdated.isError])
    useEffect(() => {
        if(isDeleted.isSuccess){
            message.success(`Deleted successfully`)
            dispatch(getSpecialityList())
            dispatch(clearState())
        }else if(isDeleted.isError){
            message.error({content:isDeleted?.errorStack ? isDeleted?.errorStack : "Something went wrong", key:"appNotification"})
            dispatch(clearState())
        }
    },[isDeleted.isSuccess , isDeleted.isError])  
    useEffect(() => {
     if(isCreated.isSuccess){
         message.success({content:`${details.name} created successfully`, key:"appNotification"})
         dispatch(getSpecialityList())
         dispatch(clearState())
        form.resetFields()
        }else if(isCreated.isError){
            message.error({content:isCreated.errorStack ? isCreated.errorStack : "Something went wrong" , key:"appNotification"})
            dispatch(clearState())
        }
    },[isCreated.isSuccess , isCreated.isError])

    useEffect(()=>{
        dispatch(getSpecialityList())
    },[])   
        return (
            <Spin spinning={formState.loading || isCreated.loading || isUpdated.loading || isDeleted.loading}>
            <div>
                    <Row gutter={[16, 8]} className="innerHeader">
                        <Col span={20}>
                            <Breadcrumbs breadcrumbs={breadCrumbs} />
                            <span className="brdOrg f-20">MANAGE SPECIALITY LIST</span>
                        </Col>
                        <Col span={4}>
                            <Button type="primary" className="saveOrgBtn" htmlType="submit" form={isEditEnable? "specialtyUpdate" : "specialtyCreate"}>
                                save
                            </Button>
                        </Col>
                    </Row>
                <CompWrapper observeOn="innerHeader">
                <Card className="specialityCard cardBmargin">
                    <Form id="specialtyCreate" layout="vertical" onFinish={handleSubmit} form={form}>
                    <Row gutter={[0, 5]}>
                        <Col span={7} md={9} lg={7} xl={7} >
                            <InputBox 
                                labelSubName="Speciality Name"
                                name="name"
                                value={details.name}
                                rules={[
                                    {
                                      required: true,
                                      message: "Please enter a specialty name",
                                    },
                                    {
                                        pattern: RegExpressions.SpecialityName,
                                        message: "Please enter valid specialty name"
                                      }
                                  ]}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                    </Form>
                    <Row className="tableSpecial">
                        <Col span={7} md={18} lg={7} xl={7}>
                        <ManageSpecialityTable tableData={specialities} isEnable={isEditEnable} setEnable={setEditEnable} handleUpdate={handleUpdate}/>
                        </Col>
                    </Row>
                </Card>
                </CompWrapper>
            </div>
            </Spin>
        )
    }