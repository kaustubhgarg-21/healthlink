import { Row, Col, Card, message, Spin } from "antd";
import Button from "../../common/button";
import { CentresTable } from "./centreData";
import "./organizatonCentres.less"
import { useEffect, useState } from "react";
import {useSelector } from "react-redux";

import { CompWrapper } from "../../common/contentWrapper";
import OrganizationCentre from "../../../../models/organization/organiztaionCentre";
import FormState from "../../../../../core/states/formState";
import { CommonIcons } from "../../../../constants/enums";
import { OrganizationStateSelector } from "../../../../../redux/reducers/organization/organizationReducer";
interface OrganizationCentreProps {
    onCentreCreate : any
    onCentreUpdate : any
    centres: OrganizationCentre[] | undefined,
    isUpdated?: FormState,
    buttonRef: any,
    setDisableSave: any,
        disableSave:any
}
export const OrganizaionCentres = (props: OrganizationCentreProps) => {
    const {onCentreCreate,onCentreUpdate, centres, isUpdated, buttonRef,setDisableSave,
        disableSave} = props
    const [ tableData, setTableData] = useState<any>([])
    const [selectedRow, setSelectedRow] = useState<any | null>(null)
    const [isDepartmentFormActive, setDepartmentFormActive] = useState(false)
    const {isDeleted} = useSelector(OrganizationStateSelector)
    useEffect(()=>{
        setTableData(centres?.map((centre)=>{
            return(
                {
                key: centre?.id,
                centre: centre.orgName,
                children: centre?.children
              }
            )
        }))
    },[props.centres])

    const handleAddCentre = () => { 
        var count = tableData?.length + 1;
        let index = -1
        index = tableData?.findIndex((data:any)=>data?.centre === "")
        if(index === -1) {
            const newData: any = {
                key: count,
                centre: "",
                children: [
                ]
            }
            setTableData((tableData: any) => [...tableData, newData])
        }
    };
    const handleAddDepartment = async() => {
        setDepartmentFormActive(true)
        var count = selectedRow?.children?.length + 1;
        const newData: any = {
            key: count,
            orgName: "",
            children: [
            ]
        }
        if (selectedRow == null || selectedRow?.centre?.length <= 0) {
            message.error({content:`please select a centre`, key:"appNotification"})
        } else {
            var i:any
            for await (i of tableData) {               
                if (i?.key == selectedRow?.key) {
                    setTableData((prevstate: any) => prevstate.map((centre: any) => { 
                        if (centre?.key == i?.key) {
                             return { ...centre, ["departments"]: [...centre.children, newData] } 
                            } else { 
                                return centre 
                            } }));
                }
            }
        }
    }
    
    const onRowSelect = (record: any, index: any) => {
       
        if (record?.key !== selectedRow?.key) {
            setSelectedRow(record)
            setTableData((prevstate: any) => prevstate.map((centre: any) => { if (centre.centre == record.centre) { return { ...centre, ["departments"]: centre.children } } else { return { ...centre, ["departments"]: [] } } }))
        } else {
            if(!isDepartmentFormActive){
                setSelectedRow(null)
                setTableData((prevstate: any) => prevstate.map((centre: any) => { if (centre.centre == record.centre) { return { ...centre, ["departments"]: [] } } else { return centre } }))
            }else {
                    setDepartmentFormActive(false)
            }
        }
    }
 
    return (
        <Spin spinning={isDeleted.loading}>
        <CompWrapper observeOn="innerHeader" name="centres-container">
            <Card className="centres-container" >
                <Row justify="end" gutter={14}>
                    <Col lg={7} xl={5}>
                        <Button type="primary" onClick={handleAddCentre}>
                        <span className="material-icons-outlined">{CommonIcons.add}{" "}</span>
                            Add Center</Button>
                    </Col>
                    <Col lg={7} xl={5}>
                        <Button type="primary" onClick={handleAddDepartment}>
                        <span className="material-icons-outlined">{CommonIcons.add}{" "}</span>
                            Add Department</Button>
                    </Col>
                </Row>
                <Row className="tableContainer">
                    <Col span={24}>
                            <CentresTable disableSave={disableSave}
                                setDisableSave={setDisableSave}
                                buttonRef={buttonRef}
                                tableData={tableData}
                                setTableData={setTableData}
                                selectedRow={selectedRow}
                                onRowSelect={onRowSelect}
                                onCentreCreate={onCentreCreate}
                                onCentreUpdate={onCentreUpdate}
                                onRowClick={onRowSelect}
                                isUpdated={isUpdated}
                                setSelectedRow={setSelectedRow}
                                setDepartmentFormActive={setDepartmentFormActive} />
                    </Col>
                </Row>
            </Card>
        </CompWrapper>
        </Spin>
    )
}