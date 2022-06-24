import { Table } from "antd";
import moment from "moment";
import "./eventHistory.less"

export const eventHistoryData = [
    {
        key: 0,
        date: "27 Dec 21  08.30 AM",
        provider: "Dr. Gerome Collar",
        treatmentAction: "Setup Consultation",
    },
    {
        key: 1,
        date: "27 Dec 21  08.30 AM",
        provider: "Dr. Josh Ryan",
        treatmentAction: "Notes: Patient needs medication and physicall activity",
    },
    {
        key: 2,
        date: "27 Dec 21  08.30 AM",
        provider: "Dr. Gerome Collar",
        treatmentAction: "Setup Consultation",
    },
    {
        key: 3,
        date: "27 Dec 21  08.30 AM",
        provider: "Dr. Gerome Collar",
        treatmentAction: "Notes: Patient needs medication and physicall activity",
    },
    {
        key: 4,
        date: "27 Dec 21  08.30 AM",
        provider: "Dr. Josh Ryan",
        treatmentAction: "Notes: Patient needs medication and physicall activity",
    },
    {
        key: 5,
        date: "27 Dec 21  08.30 AM",
        provider: "Dr. Gerome Collar",
        treatmentAction: "Setup Consultation",
    },
    {
        key: 6,
        date: "27 Dec 21  08.30 AM",
        provider: "Dr. Gerome Collar",
        treatmentAction: "Notes: Patient needs medication and physicall activity",
    },
    {
        key: 7,
        date: "27 Dec 21  08.30 AM",
        provider: "Dr. Josh Ryan",
        treatmentAction: "Notes: Patient needs medication and physicall activity",
    },
    {
        key: 8,
        date: "27 Dec 21  08.30 AM",
        provider: "Dr. Gerome Collar",
        treatmentAction: "Setup Consultation",
    },
    {
        key: 9,
        date: "27 Dec 21  08.30 AM",
        provider: "Dr. Gerome Collar",
        treatmentAction: "Notes: Patient needs medication and physicall activity",
    }
];
export const EventHistoryTable = (props: any) => {
    const { eventTable } = props;
    const columns = [
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "date",
            width: "25%",
            render: (date:any)=>moment(date).format("DD MMM YYYY HH:mm A")
        },
        {
            title: "Provider",
            dataIndex: "providerName",
            key: "provider",
            width: "25%",
        },
        {
            title: "Review Action ",
            className:"actionReview",
            dataIndex: "action",
            key: "treatmentAction",
            width: "50%",
            render: (action:any[], row:any)=>{
                return <div><p><b>Review Action &nbsp;: </b>{action?.join(", ")}</p><p><b> Diagnosis &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: </b>{row?.diagnosis}</p><p><b>Provider Notes &nbsp;: </b>{row?.patientReviewnote}</p></div>
            }
        }
        ]
  

    return (
        <Table scroll={{y:"350px"}}
            className="eventHistoryTable"
            dataSource={eventTable}
            columns={columns}
            pagination={false}
        />
    )
}