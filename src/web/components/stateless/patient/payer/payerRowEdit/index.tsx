import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  unAssignPayerOfPatient,
} from "../../../../../../redux/actions/patient/patientAction";
import { PatientStateSelector } from "../../../../../../redux/reducers/patient/patientReducer";
import {
  PayerStateSelector,
} from "../../../../../../redux/reducers/payer/payerReducer";
import { concatNames, replaceAll } from "../../../../../../utility/appUtil";
import {
  ModalCallBackTypes,
  ModalPrimaryMessages,
  ModalSecondaryMessages,
  ModalType,
} from "../../../../../constants/enums";
import { deleteSmall } from "../../../../../images";
import WarnModal from "../../../common/warnModal";

export const PayerRenderer = (props: any) => {
  const { value, record, patient } = props;
  const [payerRowProvider, setPayerRowProvider] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { selectedPayer,unAssigned } = useSelector(PayerStateSelector);
  const { patientProvider,  selectedPatient } =
    useSelector(PatientStateSelector);


 
  const handleDeleteClick = (record: any) => {
    setPayerRowProvider(record.key);

    setModalVisible(true);
  };

  

  const handleCancel = () => {
    setModalVisible(false);
  };
  const handleUnAssign = () => {
    dispatch(
      unAssignPayerOfPatient({
        id: payerRowProvider,
        patientId: selectedPatient?.id,
      })
    );
    setModalVisible(false);
  };
  return (
    <>
      <div className="cellRenderer">
        <div className="icon-container">
          <img style={{cursor:"pointer"}} src={deleteSmall} onClick={() => handleDeleteClick(record)} />
         
        </div>
      </div>
      <WarnModal
        type={ModalType.WARN}
        isModalVisible={isModalVisible}
        primaryText={ModalPrimaryMessages.UNASSIGN_USERS}
        secondaryText={replaceAll(
          /\{0\}/gi,
          ModalSecondaryMessages.UNASSIGN,
          concatNames(record?.PayerName)
        )}
        cancelButton={ModalCallBackTypes.CANCEL}
        confirmButton={ModalCallBackTypes.UNASSIGN}
        cancelCallback={handleCancel}
        confirmCallback={handleUnAssign}
      />
    </>
  );
};
