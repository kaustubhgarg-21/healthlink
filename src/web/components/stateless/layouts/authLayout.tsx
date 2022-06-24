import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
import { useEffect, useRef } from 'react';
import { hlFull } from '../../../images';
import "./authLayout.less"
const { Header, Content, Footer } = Layout;
let offset: string = '0px'
let customStyle: any = {}
const AuthLayout = (props: any) => {
    const { children } = props;
    const ref = useRef(null)
    useEffect(() => {
        const windowOnLoad = (e: any) => {
          if (ref?.current) {
            let currentRef: any = ref.current
            offset = currentRef.clientHeight + 'px'
            customStyle.minHeight = `calc(100vh - ${offset})`
          }
        }
    
        const windowOnResize = (e: any) => {
          if (ref?.current) {
            let currentRef: any = ref.current
            offset = currentRef.clientHeight + 'px'
            customStyle.minHeight = `calc(100vh - ${offset})`
          }
        }
    
        window.addEventListener('load', windowOnLoad)
        window.addEventListener('resize', windowOnResize)
    
        return () => {
          window.removeEventListener('load', windowOnLoad)
          window.removeEventListener('resize', windowOnResize)
        }
      }, [])
    
    return (
        <div className="auth-layout"  ref={ref}>
            <Row className="auth-header">
                <Col span={24}>
                    <img className="logo" src={hlFull} />
                </Col>
            </Row>
            <Row className="auth-content">
                <Col span={24}>
                    {children}
                </Col>
            </Row> 
            <Row className="auth-footer f-12" justify="center">
                <Col span={8}>
                  ©2022 HLX Group, Inc. All Rights Reserved
                </Col>
            </Row>
        </div>

    )
}
export default AuthLayout

