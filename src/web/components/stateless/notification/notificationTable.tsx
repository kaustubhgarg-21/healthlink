import { Table } from "antd";
import moment from "moment";
// id: number;
// isAlert: boolean;
// isRead: boolean;
// severity: string;
// notificationMode: string;
// userId: string;
// content: {};
// createdAt: string;
// eventId:number;

const NotificationTable =(props:any)=>{
   const { tableData } = props;

    const column =[
        {
            title: "EVENT",
            dataIndex: "content",
            key: "patientName",
            width: "20%",
            render: (content: any)=>content?.name
        },
        {
            title: "DATE",
            dataIndex: "createdAt",
            key: "date",
            width: "15%",
            render: (date: any)=>{return date? moment.utc(date).format("DD MMM YYYY"): ""}
        },
        {
            title: "TYPE",
            dataIndex: "content",
            key: "type",
            width: "20%",
            render: (content: any)=>content?.name
        },
        {
            title: "MESSAGE",
            dataIndex: "content",
            key: "message",
            width: "45%",
            render: (content: any)=>content?.description
        },
    ];
return(
    <Table 
    className="centreTable"
    dataSource={tableData}
    scroll={{y:'calc(50vh - 51px)'}}
    columns={column}
    tableLayout="fixed"
    pagination={false}
  />
)
}
export default NotificationTable