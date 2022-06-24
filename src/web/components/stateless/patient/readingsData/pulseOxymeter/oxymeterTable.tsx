import { Table } from "antd"
import moment from "moment"
import { useSelector } from "react-redux";
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer";
import { getBoundsForSingleReading, getThresholdsAccToUser } from "../../../../../../utility/utils"
import { ReadingRenderer } from "../readingRenderer";


 export const OxymeterTable = (props: any) => {
     const {data, showProvider,providerName} = props;
     const {appUser} = useSelector(AuthStateSelector)
     const columns = [
        {
            key: "1",
            title: `Date`,
            dataIndex: "date",
            width: "40%",
            className: "spiroHead",
            render: (date: any) =>{
                return moment.utc(date).local().format("MMMM DD YYYY HH:mm")
            }
        },
        {
            key: "2",
            title: `SpO2 (%)`,
            dataIndex: "spo2",
            className: "spiroHead",
            render : (spo2: any, row: any)=>{
                const Bounds = row?.Bounds?   row?.Bounds: {}
                return <ReadingRenderer value={ spo2?.value} threshold={getBoundsForSingleReading(getThresholdsAccToUser(Bounds, appUser), "spo2")}  type={"spo2"}/>
        }
        },
        {
            key: "3",
            title: `Pulse (bpm)`,
            dataIndex: "heartRate",
            className: "spiroHead",
            render : (heartRate: any, row: any)=>{
                const Bounds = row?.Bounds?   row?.Bounds: {}
                return<ReadingRenderer value={ heartRate?.value} threshold={getBoundsForSingleReading(getThresholdsAccToUser(Bounds, appUser), "heartRate")}  type={"heartRate"}/>
        }
        },
    ]
    if(showProvider){
        columns.splice(1,0,{
            key:"pro",
            title: "Provider",
            dataIndex: "",
            className: "spiroHead",
            width: "",
            render: (date: any) =>{
                return providerName
            }
            })
    }
     return (
        <Table scroll={{y: 290}}  className="readingsTable" tableLayout="fixed" columns={columns} dataSource={data} size={"small"} pagination={false} />
     )
 }