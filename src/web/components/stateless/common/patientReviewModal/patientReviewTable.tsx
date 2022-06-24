import { Table } from "antd"
import moment from "moment"

export const PatientReviewTable = (props:any) => {
    const {eventTable} = props
    const column = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            width: "30%",
            render: (date:any)=>moment(date).format("DD MMM YYYY HH:mm A")

        },
        {
            title: "Provider",
            dataIndex: "providerName",
            key: "name",
            width: "20%",
        },
        {
            title: "PATIENT REVIEW NOTES",
            dataIndex: "patientReviewnote",
            key: "notes",
            width: "50%",

        }
    ]
    return (
    <Table
    scroll={{y :"200px"}}
    className="centreTable"
    dataSource={eventTable}
    columns={column}
    pagination={false}
    size= "small"
     />
        )
}