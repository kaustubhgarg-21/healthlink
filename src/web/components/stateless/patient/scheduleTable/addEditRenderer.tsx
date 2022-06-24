import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { replaceAll } from "../../../../../utility/appUtil";
import { ModalCallBackTypes, ModalPrimaryMessages, ModalSecondaryMessages, ModalType } from "../../../../constants/enums";
import { deleteSmall, editSmall } from "../../../../images";
import { deletePatientSchedule } from "../../../../../redux/actions/hrm/hrmActions";
import WarnModal from "../../common/warnModal";
import { PatientStateSelector } from "../../../../../redux/reducers/patient/patientReducer";
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer";

export const AddEditRenderer = (props: any) => {
  const { row , preSaved, onDeleteClick, onEditClick} = props;
  const [isModalVisible, setModalVisible] = useState(false)
  const {selectedPatient} = useSelector(PatientStateSelector)
  const {appUser} = useSelector(AuthStateSelector)
  const dispatch = useDispatch()
  const handleCancel = () => {
    setModalVisible(false)
  }

  const onDeleteConfirm = () => {
    dispatch(deletePatientSchedule({id:row?.id, patientId: selectedPatient?.id}))
    setModalVisible(false)
  }
  const handleDeleteClick = () => {
    if(preSaved){
      onDeleteClick(row)
    }else{
      setModalVisible(true)
    }
  }

  const onEdit = () => {
   onEditClick(row)
  }
  return (
    <div className="centreRenderer">
      <div className="icon-container">
        {
          (preSaved || row?.assigneeId != appUser?.id || !row?.isCustom) ? null :  <img src={editSmall}  onClick={onEdit} style={{width:'15px',height:'15px'}}/>

        }
        {preSaved || row?.assigneeId == appUser?.id? <img src={deleteSmall} onClick={handleDeleteClick}/>: null}
      </div>
      <WarnModal
        type={ModalType.WARN}
        isModalVisible={isModalVisible}
        primaryText={ModalPrimaryMessages.DELETE_SCHEDULE}
        secondaryText={replaceAll(/\{0\}/gi, ModalSecondaryMessages.DELETE_ORGANIZATION,"this schedule")}
        cancelButton={ModalCallBackTypes.CANCEL} confirmButton={ModalCallBackTypes.DELETE}
        cancelCallback={handleCancel}
        confirmCallback={onDeleteConfirm}
      />
    </div>
  );
};
