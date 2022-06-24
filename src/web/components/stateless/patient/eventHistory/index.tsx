import { Card, Col, DatePicker, Dropdown, Menu,message, Row, Spin } from "antd";
import { filter, up } from "../../../../images";
import { EventHistoryTable } from "./eventHistoryTable";
import "./eventHistory.less"
import { useEffect, useState } from "react";
import { CompWrapper } from "../../common/contentWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  PatientStateSelector,
} from "../../../../../redux/reducers/patient/patientReducer";
import {
  fetchProviderOfPatient,
  patientReviewHistory,
} from "../../../../../redux/actions/patient/patientAction";
import { getFullName } from "../../../../../utility/utils";
import moment from "moment";
import { PatientReviewActions } from "../../../../constants/constants";
import { CommonIcons, ReviewActionTypes } from "../../../../constants/enums";
import { Messages } from "../../../../constants/messages";
import Button from "../../common/button";

export const EventHistory = () => {
  const [tableData, setTableData] = useState<any[] | []>([]);
  const [selectedPro, setSelectedPro] = useState<any>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<any>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<any>(null);
  const { patientReviews, selectedPatient, patientProvider, isReview } =
    useSelector(PatientStateSelector);
  const [edit, setEdit] = useState(true);
  const handleClick = () => {
    setEdit(!edit);
  };
  const [params, setParams] = useState<any>({
    startDate: moment(),
    endDate: moment(),
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      patientReviewHistory({
        patientId: selectedPatient?.id,
        providerId: selectedPro?.id,
        startDate: params?.startDate
          ? moment(params?.startDate, "DD-MM-YYYY").format("YYYY-MM-DD")
          : null,
        endDate: params?.endDate
          ? moment(params?.endDate, "DD-MM-YYYY").format("YYYY-MM-DD")
          : null,
      })
    );
  }, [selectedPatient, selectedPro, params]);
  useEffect(() => {
    dispatch(fetchProviderOfPatient(selectedPatient));
  }, [selectedPatient]);

  const handleSelectStartDate = (date: any, dateString: any) => {
    if (!date.isAfter(params.endDate)) {
      setParams({ ...params, startDate: date });
    } else {
      message.error(Messages.START_DATE_ERROR);
    }
  };

  const handleSelectedEndStartDate = (date: any, dateString: any) => {
    if (!date.isBefore(params.startDate)) {
      setParams({ ...params, endDate: date });
    } else {
      message.error(Messages.END_DATE_ERROR);
    }
  };

  const onReset = () => {
    setParams({});
  };

  useEffect(() => {
    var temp = patientReviews?.map((review) => {
      return {
        id: review?.id,
        patientId: review?.patientId,
        providerId: review?.providerId,
        action: review?.action?.map(
          (act: ReviewActionTypes) => PatientReviewActions[act]
        ),
        diagnosis: review?.diagnosis,
        cptCode: review?.cptCode,
        drgCode: review?.drgCode,
        patientReviewnote: review?.patientReviewnote,
        emailMessage: review?.emailMessage,
        email: review?.email,
        recordTime: review?.recordTime,
        providerName: review?.providerName,
        patientName: review?.patientName,
        createdAt: review?.createdAt,
        updatedAt: review?.updatedAt,
        deletedAt: review?.deletedAt,
      };
    });
    setTableData(temp);
  }, [patientReviews]);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);
  const menu = (
    <Menu className="actionMenu">
      {patientProvider?.map((pro: any) => {
        return (
          <>
            <Menu.Item onClick={() => setSelectedPro(pro)}>
              {getFullName(
                pro?.title,
                pro?.firstName,
                pro?.middleName,
                pro?.lastName
              )}
            </Menu.Item>
            <Menu.Divider />
          </>
        );
      })}
      <Menu.Item onClick={() => setSelectedPro(null)}>ALL</Menu.Item>
    </Menu>
  );
  return (
    <Spin spinning={isReview.loading}>
      <CompWrapper observeOn="mainRow" name="eventHistoryCard">
        <Card className="eventHistoryCard">
          <Row gutter={30} className="eventHistorButton">
            <Col md={8} lg={8} xl={8}>
              <p className="textFont f-16">Review History </p>
            </Col>

            <Col span={16}>
              <Row gutter={20} justify="end">
                <Col md={6} lg={6} xl={5}>
                  <Row gutter={[0, 5]}>
                    <Col span={24}>
                      <span
                        className=""
                        style={{ color: "#fff", visibility: "hidden" }}
                      >
                        provider
                      </span>
                    </Col>
                    <Col span={24}>
                      <Button
                        type="primary"
                        className="resetBtn iconColor"
                        onClick={onReset}
                      >
                        <span className="material-icons-outlined">
                          {CommonIcons.reset}
                        </span>
                        RESET
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col md={6} lg={6} xl={5}>
                  <Row gutter={[0, 5]}>
                    <Col span={24}>
                      <span
                        className=""
                        style={{ color: "#fff", visibility: "hidden" }}
                      >
                        provider
                      </span>
                    </Col>
                    <Col span={24}>
                      <Dropdown
                        overlayClassName="adversePatients"
                        overlay={menu}
                        trigger={["click"]}
                      >
                        <button className="buttonSchedule f-14 providerButton">
                          <img src={filter} className="provFilter" />
                          <span className="textFont f-14 buttonText slice">
                            {selectedPro
                              ? getFullName(
                                  selectedPro?.title,
                                  selectedPro?.firstName,
                                  selectedPro?.middleName,
                                  selectedPro?.lastName
                                )
                              : "PROVIDER"}
                          </span>
                          <img src={up} className="provImg" />
                        </button>
                      </Dropdown>
                    </Col>
                  </Row>
                </Col>
                <Col md={6} lg={6} xl={5}>
                  <Row gutter={[0, 5]}>
                    <Col span={24}>
                      <span className="dobText">Start Date</span>
                    </Col>
                    <Col span={24}>
                      <DatePicker
                        onChange={handleSelectStartDate}
                        allowClear={false}
                        className="dobPicker "
                        placeholder="MM/DD/YYYY"
                        format={"MM-DD-YYYY"}
                        value={
                          params?.startDate ? params?.startDate : undefined
                        }
                      />
                    </Col>
                  </Row>
                </Col>

                <Col md={6} lg={6} xl={5}>
                  <Row gutter={[0, 5]}>
                    <Col span={24}>
                      <span className="dobText">End Date</span>
                    </Col>
                    <Col span={24}>
                      <DatePicker
                        onChange={handleSelectedEndStartDate}
                        allowClear={false}
                        className="dobPicker"
                        placeholder="MM/DD/YYYY"
                        format={"MM-DD-YYYY"}
                        value={params?.endDate ? params?.endDate : undefined}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* <CompWrapper observeOn="eventHistorButton" name="tableContainer"> */}
          <Row className="tableContainer">
            <Col span={24}>
              <EventHistoryTable eventTable={tableData} />
            </Col>
          </Row>
          {/* </CompWrapper> */}
        </Card>
      </CompWrapper>
    </Spin>
  );
};
