import { Form } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createdOrganizationDepartment, deleteDepartment, updateOrganizationDepartment } from "../../../../../../redux/actions/organization/organizationActions";
import { clearState } from "../../../../../../redux/reducers/organization/organizationReducer";
import { replaceAll } from "../../../../../../utility/appUtil";
import { ModalCallBackTypes, ModalPrimaryMessages, ModalSecondaryMessages, ModalType, OrganizationTypeCodes } from "../../../../../constants/enums";
import { deleteSmall, editSmall } from "../../../../../images";
import InputBox from "../../../common/inputBox";
import WarnModal from "../../../common/warnModal";
import "./cellRenderer.less"

export const DepartmentRenderer = (props: any) => {
    const { value, centre, department,isUpdated,setTableData,setDepartmentFormActive, tableData, disableSave,
        setDisableSave } = props
    const [initialValue, setValue] = useState(value)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [isEditEnable, setEditEnable] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if (value == "") {
            setEditEnable(true)
        }
    }, [])
    useEffect(()=>{
        if(isUpdated.isSuccess){
            setEditEnable(false)
            dispatch(clearState())
        }
    },[isUpdated])
    const onDepartmentAdd = () => {
        dispatch(createdOrganizationDepartment({
            orgName: initialValue,
            levelCode: OrganizationTypeCodes.department,
            parentId: centre?.key,
            isActive: true,
          }))
    }
    const detectDptChange=()=>{
        if(setDisableSave){
          setDisableSave(false)
        }
      }
    const handleCancel = () => {
        setIsModalVisible(false);
      };    
  const showModal = ()=>{
      setIsModalVisible(true)
  }
     const handleDelete = ()=>{
         dispatch(deleteDepartment(department))
         setIsModalVisible(false);

     } 
    const onDepartmentUpdate = () => {
        dispatch(updateOrganizationDepartment({
            orgId: department?.id,
            orgName: initialValue,
            levelCode: OrganizationTypeCodes.department,
            parentId: centre?.key,
          }))
    }
    const onClickOutside = () =>{
        if(value == initialValue || value == ""){
            setEditEnable(false)
        }
    }
   
    const searchRef = useRef<any>();
    useEffect(() => {   
        let handler = (event: any) => {
            if (!value && !initialValue) {
                if (!searchRef?.current?.contains(event.target)) {
                    setEditEnable(false)
                    console.log("edit close");
                    
                    const result:any = tableData.map((item:any, i:any)=>{
                        //index of department
                         const index:number = item?.departments?.findIndex((data:any)=>data?.orgName === "")
                         if(index >= 0) {
                            let tempTabledata = [...tableData]
                            let currentItemDpt = item?.departments
                            currentItemDpt?.splice(index,1);

                            item.departments = currentItemDpt
                            tempTabledata[i] = item
                            setTableData(tempTabledata)
                         }
                         return index
                    })
                }
            }
        }
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    })
    return (
        <div className="cellRenderer orgcellRender" >
            <div className="input-container">
                {isEditEnable ?
                value=="" ? 
                <div ref={searchRef}>
                    <Form id="centreForm" onFinish={onDepartmentAdd} 
                    onValuesChange={detectDptChange}
                    >
                        {console.log("ishikaaaaaaa>>>")}
                        <InputBox name="centreName" initialValue={initialValue} value={initialValue} rules={[{ required: true, message: "Please enter the Name!" }]} onChange={(e: any) => setValue(e.target.value)} />
                    </Form>
                </div>
                    :
                    <Form id="centreForm" onFinish={onDepartmentUpdate} 
                    onValuesChange={detectDptChange}
                    >
                    <InputBox onBlur={onClickOutside} name="centreName" initialValue={initialValue} value={initialValue} rules={[{ required: true, message: "Please enter the Name!" }]} onChange={(e: any) => setValue(e.target.value)} />
                    </Form>
                    :
                    <span>{value}</span>}
            </div>
            {value=="" ? null :
            <div className="icon-container">
                <img src={deleteSmall} onClick={showModal} style={{cursor:"pointer"}}/>
                <img src={editSmall} onClick={() => {setEditEnable(!isEditEnable)}} style={{cursor:"pointer"}}/>
            </div>}
            <WarnModal
        type={ModalType.WARN}
        isModalVisible={isModalVisible}
        primaryText={ModalPrimaryMessages.DELETE_DEPARTMENT}
        secondaryText={replaceAll(/\{0\}/gi, ModalSecondaryMessages.DELETE_DEPARTMENT, department? department?.orgName: "")}
        cancelButton={ModalCallBackTypes.CANCEL} confirmButton={ModalCallBackTypes.DELETE}
        cancelCallback={handleCancel}
        confirmCallback={handleDelete}
      />
        </div>
        
    )
}