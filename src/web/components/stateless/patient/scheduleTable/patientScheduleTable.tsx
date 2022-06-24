import { Table } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer";
import { biometricNamesObject } from "../../../../constants/constants";
import { Biometricname } from "../../../../constants/enums";
import { AddEditRenderer } from "./addEditRenderer";

export const PatientScheduleTable = (props: any) => {
  const { tableData, preSaved, handleRemoveSchedule, onEditClick, deleteSchedule } = props;
  const {appUser} = useSelector(AuthStateSelector)
  const column = [
    {
      title: "Biometric Type",
      dataIndex: "biometricName",
      className: "instructionTable",
      key: "biometricType",
      width: "13%",
      render : (bioName:Biometricname)=>biometricNamesObject[bioName]
    },
    {
      title: "Provider Name",
      dataIndex: "providerName",
      className: "instructionTable",
      key: "providerName",
      width: "14%",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      className: "instructionTable",
      key: "startTime",
      width: "11%",
      render: (time:any)=>preSaved? moment(time, 'HH:mm').format("HH:mm a"): moment.utc(time, 'HH:mm').local().format("HH:mm a")
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      className: "instructionTable",
      key: "endTime",
      width: "11%",
      render: (time:any)=>preSaved? moment(time, 'HH:mm').format("HH:mm a"): moment.utc(time, 'HH:mm').local().format("HH:mm a")
    },
    {
      title: "Recurrence",
      dataIndex: "recurrence",
      className: "instructionTable",
      key: "recurrence",
      width: "13%",
      render: (rec: any)=> {return rec?.constructor  === Array ? rec.join(): rec }
    },
    {
      title: "Instructions",
      dataIndex: "instruction",
      className: "instructionTable",
      key: "instruction",
      width: "18%",
    },
    {
      title: "Start Date",
      dataIndex: "fromDate",
      className: "instructionTable",
      key: "startDate",
      width: "11%",
      render: (date:any, row:any)=>(preSaved==true)?moment(date, "DD/MM/YYYY").format("DD MMM YYYY"):moment.utc(date+" "+row?.startTime).local().format("DD MMM YYYY")
    },
    {
      title: "End Date",
      dataIndex: "toDate",
      className: "instructionTable",
      key: "endDate",
      width: "10%",
      render: (date:any,row:any)=>(preSaved==true)?moment(date, "DD/MM/YYYY").format("DD MMM YYYY"):moment.utc(date+" "+row?.endTime).local().format("DD MMM YYYY")
    },
    {
      title: "Action",
      dataIndex: "action",
      className: "deleteIcon",
      key: "delete",
      width: "10%",
      render: (schedule: any, row: any) => {
        return  <AddEditRenderer value={schedule} row={row} onEditClick={onEditClick} preSaved={preSaved} onDeleteClick={handleRemoveSchedule} deleteSchedule={deleteSchedule}/>;
      },
    },
  ];
  return (
    <Table
    scroll={{y:"450px",x:"1000px"}}
      className="centreTable PatientSheduleMbView"
      dataSource={tableData}
      columns={column}
      tableLayout="fixed"
      pagination={false}
    />
  );
};
