import {Table} from "antd"
import moment from "moment";

const columns = [
    {
        key: "0",
        title: "Type",
        dataIndex: "biometricName",
        width:"16.66%",
        className: "typeBiometric"
    },
    {
        key: "1",
        title: "Device Make",
        dataIndex: "deviceMake",
        width: "14.66%",
    },
    {
        key: "2",
        title: "Device Model",
        dataIndex: "deviceModel",
        width: "17%",
    },
    {
        key: "3",
        title: "MAC",
        dataIndex: "MAC",
        width: "20.66%"
    },
    {
        key: "4",
        title: "Transmitting Hub Id",
        dataIndex: "transamittingHub",
        width: "14.66%",
    },
    {
        key: "5",
        title: "Last activity Date",
        dataIndex: "lastActivityDate",
        width: "16.66%",
        render : (date: any)=>{
            return date? (moment(date).format("DD MMM YYYY")) : ""
        }
    },
]
export const DevicesTable = (props:any) => {
    const {data} = props;
 return (
    <Table 
        className="centreTable"
        columns={columns}
        dataSource={data}
        pagination={false}
    />
 )
}