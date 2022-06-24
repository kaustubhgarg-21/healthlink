import { Table } from "antd"
import moment from "moment"
import { useSelector } from "react-redux";
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer";
import { getBoundsForSingleReading, getThresholdsAccToUser } from "../../../../../../utility/utils";
import { ReadingRenderer } from "../readingRenderer";

 export const TemperatureTable = (props: any) => {
     const {data, thresholds, showProvider, providerName} = props;
     const {appUser} = useSelector(AuthStateSelector)

     const columns = [
        {
            key: "1",
            title: `Date`,
            dataIndex: "date",
            width:"40%",
            className: "spiroHead",
            render: (date: any) =>{
                return moment.utc(date).local().format("MMMM DD YYYY HH:mm")
            }
        },
        {
            key: "2",
            title: `Temperature`,
            dataIndex: "temperature",
            className: "spiroHead",
            render: (temperature: any, row: any) => {
                const Bounds = row?.Bounds?   row?.Bounds: {}
               return <ReadingRenderer value={ temperature?.value} threshold={getBoundsForSingleReading(getThresholdsAccToUser(Bounds, appUser), "temperature")}  type={"temperature"}/>
            }
        },
    ]
    if(showProvider){
        columns.splice(1,0,{
            key:"pro",
            title: "Provider",
            dataIndex: "",
            width:"30%",
            className: "spiroHead",
            render: (date: any) =>{
                return providerName
            }
            })
    }
     return (
        <Table scroll={{y: 290 }} className="readingsTable" tableLayout="fixed" columns={columns} dataSource={data} size={"small"}   pagination={false}/>
     )
 }