import { Table } from "antd"
import moment from "moment"
import { useSelector } from "react-redux";
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer";
import { getBoundsForSingleReading, getThresholdsAccToUser } from "../../../../../../utility/utils";
import { ReadingRenderer } from "../readingRenderer";

 export const BPTable = (props: any) => {
     const {data, showProvider,providerName} = props;
     const {appUser} = useSelector(AuthStateSelector)

     const columns = [
        {
            key: "1",
            title: `Date`,
            dataIndex: "date",
            width:"20%",
            className: "spiroHead",
            render: (date: any) =>{
                return moment.utc(date).local().format("MMMM DD YYYY HH:mm")
            }
        },
        {
            key: "2",
            title: `Systolic
                     (mmHg)`,
            dataIndex: "systolic",
            width:"17%",
            className: "spiroHead",
            render: (systolic: any, row: any) =>{
                const Bounds = row?.Bounds?   row?.Bounds: {}
                return <ReadingRenderer value={ systolic?.value} threshold={getBoundsForSingleReading(getThresholdsAccToUser(Bounds, appUser), "systolic")}  type={"systolic"}/>
            }
        },
        {
            key: "3",
            title: `Diastolic
                     (mmHg)`,
            dataIndex: "diastolic",
            width:"17%",
            className: "spiroHead",
            render: (diastolic: any, row: any) =>{
                const Bounds = row?.Bounds?   row?.Bounds: {}
                return <ReadingRenderer value={ diastolic?.value} threshold={getBoundsForSingleReading(getThresholdsAccToUser(Bounds, appUser), "diastolic")} type={"diastolic"}/>
            }
    
        },
        {
            key: "4",
            title: `Pulse
                    (bpm)`,
            dataIndex: "heartRate",
            width:"17%",
            className: "spiroHead",
            render: (heartRate: any, row: any) =>{
                const Bounds = row?.Bounds?   row?.Bounds: {}
                return <ReadingRenderer value={ heartRate?.value} threshold={getBoundsForSingleReading(getThresholdsAccToUser(Bounds, appUser), "heartRate")} type={"heartRate"}/>
            }
        }
    ]
    if(showProvider){
        columns.splice(1,0,{
            key:"pro",
            title: "Provider",
            dataIndex: "",
            width: "",
            className: "spiroHead",
            render: (date: any) =>{
                return providerName
            }
            })
    }

     return (
      
        <Table className="bldprsrTable readingsTable" scroll={{y:290 }} tableLayout="fixed" columns={columns} dataSource={data} size={"small"} pagination={false}/>
     )
 }