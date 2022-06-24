import { Form, FormInstance } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCenter, deleteOrganization } from "../../../../../../redux/actions/organization/organizationActions";
import { replaceAll } from "../../../../../../utility/appUtil";
import { ModalCallBackTypes, ModalPrimaryMessages, ModalSecondaryMessages, ModalType } from "../../../../../constants/enums";
import { deleteSmall, editSmall } from "../../../../../images";
import Organization from "../../../../../models/organization/organizaton";
import InputBox from "../../../common/inputBox";
import WarnModal from "../../../common/warnModal";
import "./centreRenderer.less"

export const CentreCellRenderer = (props: any) => {
    const { value, onCreate, onUpdate, isUpdated, centre, setSelected,setTableData,buttonRef,disableSave,
        setDisableSave } = props
    const [initialValue, setValue] = useState(value)
    const dispatch = useDispatch()
    const [isEditEnable, setEditEnable] = useState(false)
    const [createCenter , setCreateCenter] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        if (value == "") {
            setCreateCenter(true)
        }
    }, [])
    const detectDptChange=()=>{
        if(setDisableSave){
          setDisableSave(false)
        }
      }

    useEffect(() => {
        if (isUpdated.isSuccess) {
            setEditEnable(false)
            setSelected(null)
        }
    }, [isUpdated])
    const handleCancel = () => {
        setIsModalVisible(false)
    }
    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleDelete = () => {
        dispatch(deleteCenter({ id: centre?.key } as Organization))
        setIsModalVisible(false);
    }
    const onClickOutside = () => {
        if(value==initialValue){
            setEditEnable(false)
    }
}
    const detectChange = () =>{
        setTableData((prevState:any)=>prevState.filter((c: any)=>c.key !== prevState.length))
    }
    const searchRef = useRef<any>();
    useEffect(() => {   
        let handler = (event: any) => {
            if (!value && !initialValue) {
                if (!searchRef?.current?.contains(event.target)) {
                  detectChange()
                }
            }
        }
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    })
    const editRef = useRef<any>();
    useEffect(()=>{
        let handler = (event: any) => {
                if ((!editRef?.current?.contains(event.target))&&(!buttonRef?.current?.contains(event.target))) {
                    setEditEnable(false)
                    setValue(value)
                }
            console.log(!buttonRef?.current?.contains(event.target),7676);
        }
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    })
     
    return (
        <div className="centreRenderer addDepCenterrender">
            <div className="input-container">
                {createCenter ?
                    <div  ref={searchRef}>
                        <Form id="centreForm" onFinish={() => onCreate(initialValue)} onValuesChange={detectDptChange}>
                            <InputBox name="centreName" initialValue={initialValue} value={initialValue} rules={[{ required: true, message: "Please enter the Name!" }]} onChange={(e: any) => setValue(e.target.value)} />
                        </Form>
                    </div>
                        : isEditEnable?

                        <div  ref={editRef}>
                        <Form onBlur={onClickOutside} id="centreForm" onValuesChange={detectDptChange} onFinish={() => onUpdate({ id: centre.key, centreName: initialValue })}>
                            <InputBox onBlur={onClickOutside} name="centreName" initialValue={initialValue} value={initialValue} rules={[{ required: true, message: "Please enter the Name!" }]} onChange={(e: any) => setValue(e.target.value)} />
                        </Form>
                        </div>
                    :
                    <span>{value}</span>}
            </div>
            <div className="icon-container">
                <img src={deleteSmall} onClick={showModal} />
                <img src={editSmall} onClick={() => setEditEnable(!isEditEnable)} />
            </div>
            <WarnModal
                type={ModalType.WARN}
                isModalVisible={isModalVisible}
                primaryText={ModalPrimaryMessages.DELETE_CENTER}
                secondaryText={replaceAll(/\{0\}/gi, ModalSecondaryMessages.DELETE_CENTER, centre ? centre?.orgName : "")}
                cancelButton={ModalCallBackTypes.CANCEL} confirmButton={ModalCallBackTypes.DELETE}
                cancelCallback={handleCancel}
                confirmCallback={handleDelete}
            />
        </div>
    )
}