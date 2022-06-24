import { Card, Col, Divider, Row } from "antd"
import { useSelector } from "react-redux"
import { OrganizationStateSelector } from "../../../../../redux/reducers/organization/organizationReducer"
import { concatNames } from "../../../../../utility/appUtil"
import { contactNoFormat } from "../../../../../utility/utils"
import { call, mail,mobileIcon} from "../../../../images"
import Button from "../../common/button"
import { CompWrapper } from "../../common/contentWrapper"
import ProfileIcon from "../../common/profileThumbnail"
import "./patientOrganization.less"

export const PatientOrganization = (props : any) => {
    const {patientOrgDetails, setSelectedTab} = props;
    const {selectedOrganization} = useSelector(OrganizationStateSelector)
    return (
        <CompWrapper observeOn="mainRow" name="patientOrgCard">

            <Card className="patientOrgCard hSOPatientDetails">
                <Row gutter={58}>
                    <Col md={6} lg={4} xl={4} xxl={4}>
                    <div className="patientsprofile" style={{textAlign:'center'}}>
                    <ProfileIcon className="orgIcon" name={selectedOrganization?.orgName} size="99" />
                    </div>
                    </Col>
                    <Col md={18} lg={20} xl={20}>
                    <Row>
                    <Col md={19} lg={21} xl={21}>
                        <p className="patientOrgName f-20">{selectedOrganization?.orgName}</p>
                        <p className="patientOrgAddres text" style={{textTransform: 'capitalize'}}>{selectedOrganization?.address1}, {selectedOrganization?.city}, {selectedOrganization?.state} {selectedOrganization?.zipcode}, {selectedOrganization?.country}</p>
                    </Col>
                  
                    <Col md={19} lg={21} xl={21}>
                        <Row className="detailPatientOrgform">
                            <Col md={24} lg={11} xl={11} xxl={10}>
                                <p className="patientOrg prime">Primary Contact Details </p>
                                {selectedOrganization?.primaryContact ?
                                <>
                                <p className="patientOrg info f-14">{concatNames(selectedOrganization?.primaryContact?.firstName, selectedOrganization?.primaryContact?.lastName, selectedOrganization?.primaryContact?.middleName)}</p>                   
                               <div style={{marginBottom:'10px'}} className="mobileSection"> 

                               {selectedOrganization?.primaryContact?.mobile ?
                                 <div className='primeOrgDetails'><img className='emailI' src={call} />{contactNoFormat(selectedOrganization?.primaryContact?.mobile)}</div>
                                 :null
                               }

                               {selectedOrganization?.primaryContact?.phoneNumber ?
                                <div className="primeOrgDetails"><img className="emailI " src={mobileIcon}/>{contactNoFormat(selectedOrganization?.primaryContact?.phoneNumber)}</div>
                                :null
                               }
                                
                                </div>
                                {selectedOrganization?.primaryContact?.email ?
                            <div className='primeOrgDetails'style={{marginTop:'5px'}}><img className='emailI' src={mail} />{selectedOrganization?.primaryContact?.email}</div>
                            : null  
                            }
                                
                                </>
                                : null}
                            </Col>
                            <Col className="dividerCol" md={0} lg={2} xl={1} xxl={4}>                            
                            <Divider className="divider" type="vertical"/>
                            </Col>
                            <Col md={24} lg={11} xl={12} xxl={10}>
                                <p className="patientOrg sectionSecondary prime">Support Contact Details </p>
                                {selectedOrganization?.secondaryContact ?
                                <>
                                <p className="patientOrg info f-14">{concatNames(selectedOrganization?.secondaryContact?.firstName, selectedOrganization?.secondaryContact?.lastName, selectedOrganization?.secondaryContact?.middleName)}</p>
                               <div style={{marginBottom:'10px'}} className="mobileSection">

                                   {selectedOrganization?.secondaryContact?.mobile ? 
                                   <div className='primeOrgDetails'><img className='emailI' src={call} />{contactNoFormat(selectedOrganization?.secondaryContact?.mobile)}</div>
                                   :null 
                                }
                               
                               {selectedOrganization?.secondaryContact?.phoneNumber ?
                               <div className="primeOrgDetails"><img className="emailI " src={mobileIcon}/>{contactNoFormat(selectedOrganization?.secondaryContact?.phoneNumber)}</div>
                               : null
                            }
                                
                                </div>
                                {selectedOrganization?.secondaryContact?.email ?
                                <div className='primeOrgDetails' style={{marginTop:'5px'}}><img className='emailI' src={mail} />{selectedOrganization?.secondaryContact?.email}</div>
                                :null
                                }
                               


                                </>
                                : null}
                            </Col>
                        </Row>
                    </Col>
      </Row>
        </Col>
                    
                </Row>
                {setSelectedTab ? 
            <Row className="btnpateintfooter" justify="end" gutter={20}>
                <Col span={4}>
                <Button type="primary" onClick={()=>setSelectedTab("6")}>Next</Button>
                </Col>
                <Col span={4}>
                <Button type="primary" onClick={()=>setSelectedTab("1")}>Cancel</Button>
                </Col>
            </Row>
            :
            null}
            </Card>
      
</CompWrapper>
    )
}