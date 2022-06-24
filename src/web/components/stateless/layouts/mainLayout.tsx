import React, { useState } from 'react'
import { Col, Layout, Row } from 'antd'
import { collapseIcon } from '../../../images'
import './mainLayoutStyles.less'
import { SideBar } from '../common/sideNav'
import { AppHeader } from '../common/mainHeader'
import { useDispatch, useSelector } from 'react-redux'
import { SideBarStateSelector, setCollapsed } from '../../../../redux/reducers/sideBarReducer'

const { Header, Sider, Content } = Layout
const MainLayout = (props: any) => {
  const { children , appUser} = props;
  // const [collapsed, setCollapsed] = useState(false)
  const {isCollapsed} = useSelector(SideBarStateSelector)
  const dispatch = useDispatch()
  const onCollapseClick = () =>{
    dispatch(setCollapsed(!isCollapsed))
  }
  return (
    <Layout className="mainLayout">
      <Sider
        className="mainSidebar"
        collapsible
        trigger={null}
        collapsed={isCollapsed}
        collapsedWidth={"5.62%"}
        width={"13.89%"}
      >
        <SideBar collapsed={isCollapsed} appUser={appUser}/>
      </Sider>
      <Layout>
        <Header className="mainHeader" >
          <Row className="flex-header">
            <Col span={1} style={{justifyContent:"center", display:"flex"}}>
              <img src={collapseIcon} className="collapseIcon" onClick={onCollapseClick}/>
            </Col>
          <Col span={23}>
            <AppHeader />
          </Col>
          </Row>
        </Header>
        <Content className="contentHolder">
        
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout