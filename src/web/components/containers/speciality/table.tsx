import { Table } from "antd"
import { SpecialityRenderer } from "./addSpecialityTable"

export const specialityTable = [
    {
        key:"0",
        Speciality:"ENT"
    },
    {
        key:"1",
        Speciality:"Cardiologist"
    }
]

export const ManageSpecialityTable = (props:any) => {
    const { tableData, setEnable, isEnable, handleUpdate } = props;
  const column = [
      {
        title: "SPECIALITY",
        dataIndex: "name",
        key: "name",
        width: "10%",
        render: (speciality: any, row:any) => {
            return <SpecialityRenderer value={speciality} specialty={row} setEnable={setEnable} enable={isEnable} handleUpdate={handleUpdate}/>
          }
      }
  ]
  return (
    <Table className="centreTable"
      dataSource={tableData}
      columns={column}
      pagination={false} />
  )
}