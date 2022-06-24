import { message, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unAssignFamilyOfPatient } from "../../../../../redux/actions/patient/patientAction";
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer";
import { PatientStateSelector,clearState } from "../../../../../redux/reducers/patient/patientReducer";
import { replaceAll } from "../../../../../utility/appUtil";
import { ModalCallBackTypes, ModalPrimaryMessages, ModalSecondaryMessages, ModalType } from "../../../../constants/enums";
import { deleteIcon } from "../../../../images";
import WarnModal from "../../common/warnModal";
import CentreFamilyRendrer from "./familyRowRenderer";

export const memberData = [
    {
      key: 0,
      familyMemberName: "Name 1",
      relation: "Father",
      status: "Active",
      delete: "",
    },
    {
      key: 1,
      familyMemberName: "Name 2",
      relation: "Son",
      status: "Inactive",
      delete: "",     
    },
    {
      key: 2,
      familyMemberName: "Name 3",
      relation: "brother",
      status: "Active",
      delete: "",
    },
  ];
  export const FamilyTable =(props:any)=>{
      const {tableRow} = props;
      const [isModalVisible, setModalVisible] = useState(false);
      const { appUser } = useSelector(AuthStateSelector)
      const {  unAssigned, selectedPatient } =
    useSelector(PatientStateSelector);
      const [selectedRowFamily, setSelectedRowFamily] = useState<any>();
      const mam= memberData.filter((item)=>item.key!==1)
      const dispatch = useDispatch()
      const handleDelete=(key:any)=>{
        memberData.filter((data:any)=>data.key!==key)
      }

      const handleDeleteClick = (record:any)=>{
setSelectedRowFamily(record.key);
setModalVisible(true)
      }


      const handleCancel = () => {
        setModalVisible(false);
      };

      useEffect(() => {
        if (unAssigned.isSuccess) {
          dispatch(clearState());
          setModalVisible(false);
        } else if (unAssigned.isError) {
          message.error({content: unAssigned.errorStack ? unAssigned.errorStack : "Something went wrong", key: "appNotification"});
          dispatch(clearState());
        }
      }, [unAssigned.isSuccess, unAssigned.isError]);

      const handleUnAssign = ()=>{
dispatch(unAssignFamilyOfPatient({id:selectedRowFamily, organisationId: appUser?.orgId}));
setModalVisible(false);

      }

      useEffect(()=>{
        
      },memberData)
  const columns =[
    {
      title: "Family Member Name",
      dataIndex: "name",
      key: "familyMemberName",
      width: "45%",
      render: (familyMemberName: any) => {
          return <CentreFamilyRendrer value={familyMemberName} />
        }
    },
    {
      title: "Relation",
      dataIndex: "relation",
      key: "relation",
      width: "15%",
      render: (relation: any) => {
        return <CentreFamilyRendrer value={relation} />
      }
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (status: any) => {
        return <CentreFamilyRendrer value={status} />
      }
    },
  
    { 
     title: 'Action',
     dataIndex: 'delete', 
     key: 'delete',
     width: "10%",
     render: (_:any,record:any) => {
          return(
            <img src = {deleteIcon}style={{cursor:"pointer"}} onClick={()=>handleDeleteClick(record)}></img>

           )
            }
   },
    
  ];
  return(
    <>
    <Spin spinning={unAssigned.loading}>
    <Table
    className="centreTable"
    dataSource={tableRow}
    columns={columns}
    pagination={false}
  /> 
  </Spin>
  <WarnModal
  type={ModalType.WARN}
  isModalVisible={isModalVisible}
  primaryText={ModalPrimaryMessages.UNASSIGN_USERS}
  secondaryText={replaceAll(
    /\{0\}/gi,
    ModalSecondaryMessages.UNASSIGN,
    selectedRowFamily?.name
  )}
  cancelButton={ModalCallBackTypes.CANCEL}
  confirmButton={ModalCallBackTypes.UNASSIGN}
  cancelCallback={handleCancel}
  confirmCallback={handleUnAssign}
/>
</>
  )
}