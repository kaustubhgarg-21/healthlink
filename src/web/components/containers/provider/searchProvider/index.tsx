import { Row, Col, Table, Card,  Spin, Form } from "antd";
import Button from "../../../stateless/common/button";
import { useEffect, useState } from "react";
import { CompWrapper } from "../../../stateless/common/contentWrapper";
import SelectInput from "../../../stateless/common/selectInput";
import InputBox from "../../../stateless/common/inputBox";
import { Breadcrumbs } from "../../../stateless/common/breadCrumbs";
import { AppRoutes } from "../../../../router/appRoutes";
import { searchIcon } from "../../../../images";
import "./searchProvider.less"
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviderByID, fetchProviderList, getProviderTypes } from "../../../../../redux/actions/providerActions/providerAction";
import { clearState, ProviderStateSelector, clearProviders } from "../../../../../redux/reducers/provider/providerReducer";
import { concatNames } from "../../../../../utility/appUtil";
import WarnModal from "../../../stateless/common/warnModal";
import { ModalCallBackTypes, ModalPrimaryMessages, ModalType } from "../../../../constants/enums";

export const SearchProviders = (props: any) => {
    const history = useHistory()
    const dispatch= useDispatch()
    const [tableData, setTableData] = useState<any>([])
    const [selectedType, setSelectedType] = useState()
    const [selectedRow, setSelectedRow] = useState<any | null>()
    const [searchParams, setSearchParams] = useState<any>({})
    const [searchHit, setSearchHit] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false)
    const {providerTypes, providers, formState , selectedProvider} = useSelector(ProviderStateSelector)
    useEffect(()=>{
        dispatch(getProviderTypes())
        dispatch(clearProviders())
      },[])
useEffect(()=>{
if(formState.isSuccess){
    dispatch(clearState())
}
},[formState.isSuccess])

      useEffect(()=>{
          if(providers?.length>0){
        var temp = providers?.map((provider)=>{
            return (
                {
                    key: provider?.id,
                    name: concatNames(provider?.firstName, provider?.lastName, provider?.middleName),
                    providerType: provider?.providerType,
                    speciality: provider?.specialtyType,
                    npi: provider?.npi,
                    city: `${provider?.city}, ${provider?.state}`,
                    zipCode: provider?.zipCode,
                    email: provider?.email,
                    mobileNumber: provider?.mobileNumber
                    // contactNumber: provider?.contactNumber,
                }
            )

        })
        setTableData(temp)
    }else if(searchHit){
        setModalVisible(true)
    }
      },[providers])

      useEffect(()=>{
        if(selectedRow?.key){
            dispatch(fetchProviderByID(selectedRow?.key))
        }
      },[selectedRow])
      useEffect(()=>{
if(formState.isSuccess && selectedProvider && selectedRow){
    history.push(AppRoutes.ADDPROVIDER,{selected: selectedProvider})
}
      },[formState, selectedRow, selectedProvider])
      const getTypeOptions = () => {
        if(providerTypes){
        return providerTypes?.map((type)=>{
          return(
            {
              text: type.name,
              value: type.id
            }
          )
        })
      }else return []
    }

    const providerTypeSelect = (value: any) => {
        setSearchParams({
            ...searchParams,
            ["providerType"]: value
        })  
    }
    const onSearchHit = () => {
        dispatch(fetchProviderList(searchParams))
        setSearchHit(true)
        
    }

    useEffect(()=>{
        dispatch(clearProviders())
        return (()=>{
            dispatch(clearProviders())
        })
    },[])
    const handleChange = (e: any) => {
            setSearchParams({
                ...searchParams,
                [e.target.name]: e.target.value,
            })
    }
    const onProviderSelect = (row: any) => {
        setSelectedRow(row) 
       
    }

    const handleCancel = () => {
        setModalVisible(false)
    }
    console.log(tableData,121)

    const handleConfirm = () => {
        history.push(AppRoutes.ADDPROVIDER)
    }
    const breadCrumbs = [
        {
            text: "Dashboard",
            link: AppRoutes.LANDING
        },
        {
            text: "Users",
            link: AppRoutes.PROVIDERLIST
        },
        {
            text: "Assign Provider",
        },
    ];
    const columns = [
        {
            key: "name",
            title: "Provider Name",
            dataIndex: "name",
        },
        {
            key: "type",
            title: "Provider type",
            dataIndex: "providerType",
        },
        {
            key: "speciality",
            title: "Specialty",
            dataIndex: "speciality",
        },
        {
            key: "npi",
            title: "npi number",
            dataIndex: "npi",
        },
        {
            key: "citystate",
            title: "city, state",
            dataIndex: "city",
        },
        {
            key: "zip",
            title: "zip code",
            dataIndex: "zipCode",
        },
        {
            key: "contact",
            title: "Mobile number",
            dataIndex: "mobileNumber",
        },
        {
            key: "email",
            title: "email address",
            dataIndex: "email",
        }
    ]
    return (
        <>
            <Row className="innerHeader">
                <Col span={20}>
                    <Breadcrumbs breadcrumbs={breadCrumbs} />
                    <p className="brdUserName f-20">ADD USERS</p>
                </Col>
                <Col md={4} lg={4} xl={4}>
              <Button type="primary" onClick={() => history.goBack()}>
                Cancel
              </Button>
            </Col>
            </Row>
            <CompWrapper observeOn="innerHeader" name="providerSearchCard">
                <Spin spinning={formState.loading}>
                <Card className="providerSearchCard">
                    <Row className="platformProvider">
                        search provider on platform
                    </Row>
                    <Form id= "searchProvider" onFinish={onSearchHit}>
                    <Row gutter={[30, 30]}>
                        <Col span={6}>
                            <SelectInput
                                placeholder="Select Provider Type"
                                name="providerType"
                                value={selectedType}
                                className="card-dropdown with-search"
                                bordered={true}
                                optionValue={getTypeOptions()}
                                onChange={providerTypeSelect}
                            />
                        </Col>
                        <Col span={6}>
                        <Form.Item name="search" rules= {[{required: true, message: "Please enter a Provider name"}]}>
                            <InputBox
                                name="search"

                                onChange={handleChange}
                                value={searchParams?.search}
                                placeholder="Name"
                            />
                        </Form.Item>
                        </Col>
                        <Col span={2} md={3} xl={2} xxl={2} className="srchBtn">
                            <Button type="secondary" htmlType="submit" form="searchProvider"><img src={searchIcon} /></Button>
                        </Col>
                        <Col span={24}>
                            <span className="searchText">Search Results</span>
                        </Col>
                        <Col span={24}>
                            <Table
                                onRow={(record, rowIndex) => {
                                    return {
                                        onClick: event => { onProviderSelect(record)},
                                    }
                                }}
                                className="providerSearchTable"
                                columns={columns}
                                dataSource={tableData}
                                size="small"
                                pagination={false}
                            />
                        </Col>
                    </Row>
                    </Form>
                </Card>
                </Spin>
                <WarnModal
                    type={ModalType.WARN}
                    isModalVisible={isModalVisible}
                    primaryText={ModalPrimaryMessages.NOT_FOUND}
                    secondaryText={"Please add new provider."}
                    cancelButton={ModalCallBackTypes.CANCEL} confirmButton={ModalCallBackTypes.AddProvider}
                    cancelCallback={handleCancel}
                    confirmCallback={handleConfirm}
                />
            </CompWrapper>
        </>
    )
}