import { Col, Modal, Row } from "antd"
import { useEffect, useState } from "react";
import { CompWrapper } from "../contentWrapper";
import "./termsOfServices.less"

export const TermsAndConditions = (props: any) => {
    const { cancelCallback, isModalVisible , title, content} = props
    const [loginContent ,setLoginContent] = useState("")
    const onCancelCallback = () => {
        if (cancelCallback) {
            cancelCallback();
        }
    };



  useEffect(()=>{
setLoginContent(content)
  },[content])
    // const terms = {
    //   statusCode: 1,
    //   result: {
    //     _id: "629a01fd9d1bf8c073a9cc68",
    //     status: true,
    //     fileName: "thetworr",
    //     fileCode:
    //       '<div class="outer_section">\n      <img\n        src= "https://dev.hlxexchange.com/api/v1/level/image/1a88db459109a301cdf33386eca72328"\n        <br \n        clear="all"\n      />\n      <h2>Invitation</h2>\n      <h3>Hi {{name}}</h3>\n      <p>\n        You are invited to join\n        <b>{{organization}}</b>\n        as\n        <b>{{role}}. </b> \n        Please click the link below to confirm this invitation. You will be\n        prompted to create a password for your Healthlink account.\n      </p>\n      <a href="{{link}}">\n        <button>Accept Invitation</button>\n      </a>\n      <p>If you don\'t recognize this, please ignore it.</p>\n    </div>\n  </body>',
    //     contentType: "text/html",
    //     category: "qar2iwww",
    //     createdAt: "2022-06-03T12:43:41.650Z",
    //     updatedAt: "2022-06-03T12:43:41.650Z",
    //     __v: 0,
    //   },
    //   time: 1654260465494,
    // };
    return (
        <Modal
            wrapClassName="termsModal"
            onCancel={onCancelCallback}
            centered
            footer={null}
            title={title}
            visible={isModalVisible}>
            <div className="termsAndConditions">
                {/* <Row gutter={[0, 10]}> */}
                    <div key= {loginContent} dangerouslySetInnerHTML={{__html: loginContent}}/>
                    {/* {terms.result.fileCode} */}
                   
                {/* </Row> */}
            </div>
        </Modal>
    )
}