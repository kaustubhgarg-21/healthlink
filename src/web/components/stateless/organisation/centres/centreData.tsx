import { Table } from "antd";
import { DepartmentRenderer } from "./cellRenderer";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { CentreCellRenderer } from "./centreRowRenderer";

export const CentresTable = (props: any) => {
  const {
    tableData,
    buttonRef,
    selectedRow,
    onRowSelect,
    onCentreCreate,
    isUpdated,
    onCentreUpdate,
    setSelectedRow,
    setTableData,
    setDepartmentFormActive,
    disableSave,
    setDisableSave
  } = props;

  const columns = [
    {
      title: "Center",
      dataIndex: "centre",
      key: "centre",
      width: "30%",
      render: (centre: any, row: any) => {
        return (
          <CentreCellRenderer
            disableSave={disableSave}
            setDisableSave={setDisableSave}
            buttonRef={buttonRef}
            value={centre}
            setTableData={setTableData}
            centre={row}
            onCreate={onCentreCreate}
            onUpdate={onCentreUpdate}
            isUpdated={isUpdated}
            setSelected={setSelectedRow}
          />
        );
      },
    },
    {
      title: "Department",
      dataIndex: "departments",
      key: "department",
      render: (departments: any, row: any) => {
        return selectedRow?.key == row?.key ? (
          departments?.map((dep: any, index: number) => {
            return (
              <DepartmentRenderer
                disableSave={disableSave}
                setDisableSave={setDisableSave}
                value={dep?.orgName}
                setTableData={setTableData}
                key={index}
                centre={row}
                department={dep}
                isUpdated={isUpdated}
                setSelectedRow={setSelectedRow}
                setDepartmentFormActive={setDepartmentFormActive}
                tableData={tableData}
              />
            );
          })
        ) : (
          <div
            className="expandRender"
            onClick={() => onRowSelect(row)}
            style={{ height: "100%" }}
          />
        );
      },
      width: "30%",
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      render: (centre: any, row: any) => {
        return (
          <div
            className="expandRender"
            onClick={() => onRowSelect(row)}
            style={{ height: "100%" }}
          ></div>
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      render: (centre: any, row: any) => {
        return (
          <div
            className="expandRender"
            onClick={() => onRowSelect(row)}
            style={{ height: "100%" }}
          ></div>
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      render: (centre: any, row: any) => {
        return (
          <div
            className="expandRender"
            onClick={() => onRowSelect(row)}
            style={{ height: "100%" }}
          ></div>
        );
      },
    },

    {
      title: "",
      dataIndex: "",
      key: "",
      render: (row: any) => {
        return (
          <div
            className="expandRender"
            onClick={() => onRowSelect(row)}
            style={{ height: "100%" }}
          >
            {row?.children?.length ? (
              selectedRow?.key == row?.key && row?.departments?.length ? (
                <DownOutlined
                  style={{ marginLeft: "50%" }}
                  className="dropdownIcon"
                  onClick={() => onRowSelect(row, row.key)}
                />
              ) : (
                <RightOutlined
                  style={{ paddingLeft: "50%" }}
                  className="dropdownIcon"
                  onClick={() => onRowSelect(row, row.key)}
                />
              )
            ) : null}
          </div>
        );
      },
    },
  ];
  return (
    <Table
      className="centreTable orgcenterTable"
      dataSource={tableData}
      columns={columns}
      rowClassName={(record, index) => {
        return record?.key == selectedRow?.key ? "selected" : "";
      }}
      expandable={{ showExpandColumn: false }}
      pagination={false}
    />
  );
};
