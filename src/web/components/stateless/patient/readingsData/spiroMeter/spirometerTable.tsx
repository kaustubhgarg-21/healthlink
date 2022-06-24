import { Table } from "antd"
import moment from "moment"
import { useSelector } from "react-redux";
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer";
import { getBoundsForSingleReading, getThresholdsAccToUser } from "../../../../../../utility/utils";
import { ReadingRenderer } from "../readingRenderer";


 export const SpirometerTable = (props: any) => {
     const {data, thresholds, showProvider, providerName} = props;
     const {appUser} = useSelector(AuthStateSelector)
     const columns = [
        {
            key: "1",
            title: `Date`,
            dataIndex: "date",
            width: "27%",
            className:"spiroHead",
            render: (date: any) =>{
                return moment.utc(date).local().format("MMMM DD YYYY HH:mm")
            }
        },
        {
            key: "2",
            title: `FVC           (L)`,
            dataIndex: "fvc",
            width:"14%",
            className:"spiroHead",
            render: (fvc: any)=>{
                return <ReadingRenderer value={ fvc?.value}  type={"fvc"}/>
            }
        },
        {
            key: "3",
            title: `FEV1           (L)`,
            dataIndex: "fev1",
            width: "14%",
            className:"spiroHead",
            render: (fev1: any, row: any)=>{
                const Bounds = row?.Bounds?   row?.Bounds: {}
                return <ReadingRenderer value={ fev1?.value} threshold={getBoundsForSingleReading(getThresholdsAccToUser(Bounds, appUser), "fev1")}  type={"fev1"}/>
            }
        },
        {
            key: "4",
            title: `PEF           (L/min)`,
            dataIndex: "pef",
            width: "14%",
            className:"spiroHead",
            render: (pef: any, row:any)=>{
                const Bounds = row?.Bounds?   row?.Bounds: {}
                return <ReadingRenderer value={ pef?.value} threshold={getBoundsForSingleReading(getThresholdsAccToUser(Bounds, appUser), "pef")}  type={"pef"}/>
            }
        },
        {
            key: "5",
            title: `FVC6           (L)`,
            dataIndex: "fev6",
            width: "14%",
            className:"spiroHead",
            render: (fev6: any,row:any)=>{
                const Bounds = row?.Bounds?   row?.Bounds: {}
                return <ReadingRenderer value={ fev6?.value} threshold={getBoundsForSingleReading(getThresholdsAccToUser(Bounds, appUser), "fev6")}  type={"fev6"}/>
            }
        },
        {
            key: "6",
            title: `FEV1FEV6`,
            dataIndex: "fev1fev6",
            width: "15%",
            className:"spiroHead",
            render: (fev1fev6: any, row:any)=>{
                const Bounds = row?.Bounds?   row?.Bounds: {}
                return <ReadingRenderer value={ fev1fev6?.value} threshold={getBoundsForSingleReading(getThresholdsAccToUser(Bounds, appUser), "fev1fev6")}  type={"fev1fev6"}/>
            }
        },
    ]
    if(showProvider){
        columns.splice(1,0,{
            key:"pro",
            title: "Provider",
            dataIndex: "",
            className: "spiroHead",
            width: "20%",
            render: (date: any) =>{
                return providerName
            }
            })
    }
     return (
        <Table scroll={{y: 280 }}  className=" spirometerTable readingsTable" tableLayout="fixed" columns={columns} dataSource={data} size={"small"} pagination={false}/>
     )
 }