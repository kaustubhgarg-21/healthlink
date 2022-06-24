import { Card, Col, Row, Spin } from "antd";
import FormState from "../../../../../core/states/formState";
import Role from "../../../../models/roles/role";
import { AppRoutes } from "../../../../router/appRoutes";
import { Breadcrumbs } from "../../../stateless/common/breadCrumbs";
import { CompWrapper } from "../../../stateless/common/contentWrapper";
import RolePermisson from "../../../stateless/common/rolePermisson";
import "./orgAdminPermission.less";
interface RoleDetailsProps {
  role: Role;
  roleData: any
  formState : FormState
}
export const SystemRoleDetails = (props: RoleDetailsProps) => {
  const { roleData, formState } = props;
  const nextPage = [
    {
      text: "DASHBOARD",
      link: AppRoutes.LANDING,
    },
    {
      text: "ROLES",
      link: AppRoutes.ROLES,
    },
    {
      text: roleData?.name,
    },
  ];
  return (
    <Spin spinning={formState.loading}>
      <Row gutter={20} className="innerHeader">
        <Col md={14} lg={16} xl={18}>
          <Breadcrumbs breadcrumbs={nextPage} />
          <span className="addUserHeader f-20">{roleData?.name}</span>
        </Col>
      </Row>
      <Row className="subHeading f-16">
        <Col span={20}>
          <span>{roleData?.description}</span>
        </Col>
      </Row>
      <CompWrapper observeOn="subHeading">
        <Card>
          {roleData?.permission?.length && roleData?.permission?.map((data: any) => (
            <RolePermisson
              item={data}
              roleDetails={roleData}
              key={data.id}
            />
          ))}
        </Card>
      </CompWrapper>
    </Spin>
  );
};