import { Row, Col } from 'antd';
import { Card } from 'antd';
import "./orgDetails.less"
import { active, inactive } from "../../../../images"
import { pencil } from "../../../../images"
import ProfileIcon from '../../common/profileThumbnail';
import { mail } from '../../../../images';
import { call } from "../../../../images"
import { location } from "../../../../images"
import { check } from "../../../../images"
import { family } from '../../../../images';
import { patientIcon } from '../../../../images';
import { provider } from "../../../../images"
import { patients } from "../../../../images"
import { show } from "../../../../images"
import CustomTooltip from '../../common/toolTip';
import { useState } from 'react';
import { CompWrapper } from '../../common/contentWrapper';
import organization from '../../../../models/organization/organizaton';
import { useSelector } from 'react-redux';
import { OrganizationStateSelector } from '../../../../../redux/reducers/organization/organizationReducer';
import { contactNoFormat } from '../../../../../utility/utils';

interface SummaryProps {
  organization : organization | null
  onClick: any
}
const OrgDetails = (props: SummaryProps) => {
  const {familyCount , adminCount, patientCount, providerCount} = useSelector(OrganizationStateSelector)
  const { organization , onClick } = props;
  return (
    <CompWrapper observeOn="innerHeader" name="summary-container">
      <Row gutter={32} className="summary-container">
        <Col md={11} lg={9} xl={9}>
          <Card className='summaryCard' bordered={false}>
            <Row>
              <Col md={23} lg={22} xl={22}><span className='summary f-14  Text'>
                SUBSCRIPTION STATUS
              </span>
              {organization?.isActive? 
                <p className='summary f-12 Status'> 
                  <img className='green-button' src={active} /> Active  
                </p>
                :
                <p className='summary Status'> 
                  <img className='green-button' src={inactive} /> Inactive  
                </p>
              }
              </Col>
              <Col md={1} lg={2} xl={2} className="edicn">
                <img className='pencil' onClick={() => onClick("2")} src={pencil} />
              </Col>
            </Row>
            <Row justify='center'>
              <Col >
                <ProfileIcon name={organization?.orgName} src={organization?.imageURL} size="200" />
              </Col>
            </Row>
            <Row justify='center'>
              <Col className="summary organName" md={24} lg={24} xl={24}>
                <p className='f-20'>{organization?.orgName}</p>
              </Col>
            </Row>
            <Row>
              <Col md={24} lg={24} xl={24}>
                <span className='summary f-14  primeContact'>Primary Contact Details</span>
              </Col>
            </Row>
            <Row>
              <Col md={24} lg={24} xl={24}>
                <span className='summary f-14 primeName'>{organization?.primaryContact?.firstName} {organization?.primaryContact?.lastName}</span>
              </Col>
            </Row>
            <Row>
              <Col md={24} lg={24} xl={24}>
              
             
               <div className='summary f-14 primeDetails emailPaientDetails'>
               <CustomTooltip title={organization?.primaryContact?.email} color="#FFFFFF" content="show" placement="right">
                 <p className='customPara slice'>  <img className='emailIcon' src={mail} />{organization?.primaryContact?.email} </p>
                 </CustomTooltip>
                 </div>
             
            
              </Col>
            </Row>
            <Row>
              <Col md={24} lg={24} xl={24} >
                <span className='summary f-14 primeDetails'><img className='emailIcon' src={call} />
                {
            contactNoFormat(organization?.primaryContact?.mobile)
                }
                </span>
              </Col>
            </Row>
            <hr className="primaryRowOrgSummary"/>
            {organization?.secondaryContact? 
            <>
            <Row>
              <Col md={24} lg={24} xl={24}>
               <span className='summary f-14  primeContact hrMargin'>Support Contact Details</span>
              </Col>
            </Row>
            <Row >
              <Col md={24} lg={24} xl={24}>
                <span className='summary f-14 primeName'>{organization?.secondaryContact?.firstName} {organization?.secondaryContact?.lastName}</span>
              </Col>
            </Row>
            <Row>
              <Col md={24} lg={24} xl={24}>
               <div className='summary f-14 primeDetails emailPaientDetails'>
               <CustomTooltip title={organization?.primaryContact?.email} color="#FFFFFF" content="show" placement="right">
                 <p className='customPara slice'>{organization?.secondaryContact?.email? 
                 <img className='emailIcon' src={mail} /> : null }{organization?.secondaryContact?.email}</p>
                        </CustomTooltip>
                 </div>
        
              </Col>
            </Row>
            <Row>
              <Col md={24} lg={24} xl={24}>
                <span className='summary f-14 primeDetails'>{organization?.secondaryContact?.mobile? <img className='emailIcon' src={call} /> : null}{contactNoFormat(organization?.secondaryContact?.mobile)}</span>
              </Col>
            </Row>
            </>
            : null}
          </Card>
        </Col>

        {/* right side card */}

        <Col md={13} lg={15} xl={15}>
          <Card className='summaryCard right'>
            <Row gutter={[30, 30]}>
              <Col md={24} lg={12} xl={12}>
                <Card className='detailCard'>
                  <Row>
                    <Col md={8} lg={8} xl={7}>
                      <div className='iconCircle'>
                        <img className='summary f-14 Icon locasummary' src={location} />
                      </div>
                    </Col>
                    <Col md={10} lg={12} xl={12} className='summary f-14 CardContent'>
                      <span className='summary CardDetails'>CENTERS</span>
                      <span className='summary Count'>{organization?.orgCentres?.length}</span>
                    </Col>
                    <Col md={6} lg={4} xl={5} className='showButton'>
                    <img className='showIcon' src={show} />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col md={24} lg={12} xl={12}>
                <Card className='detailCard'>
                  <Row>
                    <Col md={8} lg={8} xl={7}>
                      <div className='iconCircle'>
                        <img className='summary f-14 Icon fsummary' src={location} />
                      </div>
                    </Col>
                    <Col md={10} lg={12} xl={12} className='summary f-14  CardContent'>
                      <span className='summary f-14  CardDetails'>Departments</span>
                      <span className='summary f-14  Count'>{organization?.orgDepartments}</span>
                    </Col>
                    <Col md={6} lg={4} xl={5} className='showButton'>
                    <img className='showIcon'  src={show} />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col md={24} lg={12} xl={12}>
                <Card className='detailCard'>
                  <Row >
                    <Col md={8} lg={8} xl={7}>
                      <div className='iconCircle'>
                        <img className='summary f-14 Icon adminsummary' src={check} />
                      </div>
                    </Col>
                    <Col md={10} lg={12} xl={12} className='summary f-14  CardContent'>
                      <span className='summary f-14  CardDetails'>Admin users</span>
                      <span className='summary f-14  Count'>{adminCount}</span>
                    </Col>
                    <Col md={6} lg={4} xl={5} className='showButton'>
                    <img className='showIcon' src={show} />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col md={24} lg={12} xl={12}>
                <Card className='detailCard'>
                  <Row>
                    <Col md={8} lg={8} xl={7}>
                      <div className='iconCircle'>
                        <img className='summary f-14 Icon psummary' src={provider} />
                      </div>
                    </Col>
                    <Col md={10} lg={12} xl={12} className='summary f-14  CardContent'>
                      <span className='summary f-14  CardDetails'>Providers</span>
                      <span className='summary f-14  Count'>{providerCount}</span>
                    </Col>
                    <Col md={6} lg={4} xl={5} className='showButton'>
                    <img className='showIcon' src={show} />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col md={24} lg={12} xl={12}>
                <Card className='detailCard'>
                  <Row>
                    <Col md={8} lg={8} xl={7}>
                      <div className='iconCircle'>
                        <img className='summary f-14 Icon Patsummary' src={patientIcon} />
                      </div>
                    </Col>
                    <Col md={10} lg={12} xl={12} className='summary f-14  CardContent'>
                      <span className='summary f-14  CardDetails'>Patients</span>
                      <span className='summary f-14  Count'>{patientCount}</span>
                    </Col>
                    <Col md={6} lg={4} xl={5} className='showButton'>
                    <img className='showIcon' src={show} />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col md={24} lg={12} xl={12}>
                <Card className='detailCard'>
                  <Row>
                    <Col md={8} lg={8} xl={7}>
                      <div className='iconCircle providerIcon'>
                        <span className="material-icons-outlined ant-menu-item-icon">people_alt</span>
                      </div>
                    </Col>
                    <Col md={10} lg={12} xl={12} className='summary f-14  CardContent'>
                      <span className='summary f-14  CardDetails'>Family</span>
                      <span className='summary f-14  Count'>{familyCount}</span>
                    </Col>
                    <Col md={6} lg={4} xl={5} className='showButton'>
                    <img className='showIcon'  src={show} />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <hr className="primaryRowOrgSummary rightPrimaryRowOrgSummary"/>
            <Row className='NotesRow'>
              <Col span={24}>
                <span className='summary f-14  Notes'>Notes</span>
              </Col>
              <Col>
                <span>{organization?.notes}</span>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </CompWrapper>
  )



}

export default OrgDetails;