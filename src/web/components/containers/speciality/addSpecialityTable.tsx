import { Form } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteSpecialty } from "../../../../redux/actions/specialty/specialtyAction"
import { SpecialtyStateSelector } from "../../../../redux/reducers/specialty/specialtyReducer"
import { replaceAll } from "../../../../utility/appUtil"
import { ModalCallBackTypes, ModalPrimaryMessages, ModalSecondaryMessages, ModalType } from "../../../constants/enums"
import { deleteSmall, editSmall } from "../../../images"
import { Specialty } from "../../../models/provider/providerItems"
import InputBox from "../../stateless/common/inputBox"
import WarnModal from "../../stateless/common/warnModal"
export const SpecialityRenderer = (props: any) => {
    const dispatch = useDispatch()
    const { value, specialty, setEnable, enable, handleUpdate} = props
    const {isUpdated} = useSelector(SpecialtyStateSelector)
    const [initialValue, setValue] = useState(value)
    const [isEditEnable, setEditEnable] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const onModalClose = () => {
        setShowModal(false)
    }
    const onConfirmClick = () => {
        dispatch(deleteSpecialty({id : specialty?.id} as Specialty))
        setShowModal(false)
    }
    const onModal = ()=>{
        setShowModal(true)
    }
    useEffect(() => {
        if(isUpdated.isSuccess){
            setEditEnable(false)
           }
       },[isUpdated.isSuccess , isUpdated.isError])
    useEffect(() => {
        if (value == "") {
            setEditEnable(true)
        }
    }, [])
    return (
        <div className="centreRenderer addspeciality " >
            <div className="input-container">
                {isEditEnable ?
                    <Form id="specialtyUpdate" onFinish={()=>handleUpdate(specialty, initialValue)}>
                        <InputBox name="centreName" initialValue={value} value={value} rules={[{ required: true, message: "Please enter the Name!" }]} onChange={(e: any) => setValue(e.target.value)} />
                    </Form>
                    :
                    <p>{value}</p>}
            </div>
            <div className="icon-container">{specialty?.isCustom ?
                <img src={deleteSmall} onClick={onModal} /> : null}        
                {specialty?.isCustom ?<img src={editSmall} onClick={() => {setEnable(!enable);setEditEnable(!isEditEnable)}} />: null}
            </div>
            <WarnModal isModalVisible={showModal} 
            type={ModalType.WARN} 
            cancelCallback={onModalClose} 
            confirmCallback = {onConfirmClick}
            primaryText={ModalPrimaryMessages.DELETE_SPECIALTY} 
            secondaryText={replaceAll(/\{0\}/gi,ModalSecondaryMessages.DELETE_ORGANIZATION, value)} 
            cancelButton={ModalCallBackTypes.CANCEL} 
            confirmButton={ModalCallBackTypes.DELETE}/>
        </div>
    )
}