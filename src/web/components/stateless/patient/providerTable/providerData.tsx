import { Radio, Table ,Spin} from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  unAssignProviderOfPatient,
} from "../../../../../redux/actions/patient/patientAction";
import {
  PatientStateSelector,
} from "../../../../../redux/reducers/patient/patientReducer";
import { ProviderStateSelector } from "../../../../../redux/reducers/provider/providerReducer";
import { replaceAll } from "../../../../../utility/appUtil";
import {
  ModalCallBackTypes,
  ModalPrimaryMessages,
  ModalSecondaryMessages,
  ModalType,
} from "../../../../constants/enums";
import { deleteSmall } from "../../../../images";
import WarnModal from "../../common/warnModal";
import "./providerData.less";

export const providerData = [
  {
    key: 0,
    Provider: "Name 1",
    PCP: true,
    ProviderType: "",
    Speciality: "Cardiology",
    Status: "Active",
  },
  {
    key: 1,
    Provider: "Name 2",
    PCP: false,
    ProviderType: "",
    Speciality: "",
    Status: "Inactive",
  },
  {
    key: 2,
    Provider: "Name 3",
    PCP: false,
    providerType: "",
    Speciality: "",
    Status: "Active",
  },
];

export const ProviderTable = (props: any) => {
    const { tableProviderRow, setTableProviderRow , onChange, searchTable,setSelectedRows} = props;
    const [isModalVisible, setModalVisible] = useState(false)
    const {patientProvider,unAssigned, selectedPatient} =useSelector(PatientStateSelector)
const [selectedRowProvider, setSelectedRowProvider] = useState<any>()
const {selectedProvider} = useSelector(ProviderStateSelector)
const dispatch = useDispatch();
    

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleDeleteClick = (record: any) => {
    setSelectedRowProvider(record);
    setModalVisible(true);
  };
  useEffect(() => {
    if (unAssigned.isSuccess) {
      setModalVisible(false);
    }
  }, [unAssigned.isSuccess, unAssigned.isError]);

      const handleTableData =(row: any, ev: any) =>{
        const {checked} = ev.target
        if(checked){
          setSelectedRows((prevState:any)=>prevState.concat(row))
        }
        else{
          
          setSelectedRows((prevState:any[]) =>prevState?.filter((x:any)=>x.key != row?.key))
        }
      }

      const handleUnAssign = () => {
        dispatch(unAssignProviderOfPatient({id:selectedRowProvider?.key , patientId:selectedPatient?.id }))
        setModalVisible(false)
     }
    const column = [
        {
            title: "Provider",
            dataIndex: "Provider",
            key: "Provider",
            width: "20%",
        },
        {
            title: "PCP",
            dataIndex: "PCP",
            className: "radioButtonPcp",
            key: "PCP",
            width: "10%",
            render: (value: any, row: any) => {
                return (
                    searchTable?? <Radio value="1" checked={value} onChange={() => onChange(row)}></Radio>

                )
            }
        },
        {
            title: "Provider Type",
            dataIndex: "ProviderType",
            key: "ProviderType",
            width: "25%",
        },
        {
            title: "Speciality",
            dataIndex: "Speciality",
            key: "Speciality",
            width: "25%",
        },
        {
            title: "STATUS",
            dataIndex: "Status",
            key: "Status",
            width: "15%",
        },
        {
          title: "NPI",
          dataIndex: "npi",
          key: "npi",
          width: "15%",
      },
        {
            title: 'Action',
            dataIndex: 'delete',
            className: "deleteIcon",
            key: 'delete',
            width: "15%",
            render: (_: any, record: any) => {
                return (
                    searchTable?<Checkbox onChange={(event)=>handleTableData(record , event)}/>:<img style={{cursor:"pointer"}}src={deleteSmall} onClick={() => handleDeleteClick(record)}></img>
                )
            }
        },
    ]
    
    return (    
        <>
        <Spin spinning= {unAssigned.loading}>
        <Table
            className="centreTable providerTable" scroll={{y:'450px'}}
            dataSource={tableProviderRow}
            columns={column}
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
          selectedRowProvider?.Provider
        )}
        cancelButton={ModalCallBackTypes.CANCEL}
        confirmButton={ModalCallBackTypes.UNASSIGN}
        cancelCallback={handleCancel}
        confirmCallback={handleUnAssign}
      />
    </>
  );
};
