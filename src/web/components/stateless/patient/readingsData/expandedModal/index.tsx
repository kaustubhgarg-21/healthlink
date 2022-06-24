import { Modal, Spin } from "antd";

import { useSelector } from "react-redux";

import { patientStateSelector } from "../../../../../../redux/reducers/hrm/hrmReducer";


export const ExpandedModal = (props: any) => {
    const {expanded, children, setExpanded, onModalClose} = props;
    const {formState} = useSelector(patientStateSelector)
    const onCancel = () => {
    if(onModalClose){
        onModalClose()
    }
    else{
        setExpanded(false)
    }
    }
  
    return (
        <Modal visible={expanded} wrapClassName="readingsModal" centered footer={null} onCancel={onCancel}>
        <Spin spinning={formState.loading}>
            {children}
            </Spin>
        </Modal>
    )
}