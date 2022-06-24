import { Card, Col, Row, Typography } from "antd";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchTransformedRoleById } from "../../../../../redux/actions/role/roleAction";
import { setSelectedRole } from "../../../../../redux/reducers/role/roleReducer";
import Role from "../../../../models/roles/role";
import { AppRoutes } from "../../../../router/appRoutes";
import "./rolesCard.less";
interface RoleCardProps {
  role:Role
}
const   RolesCard = (props:RoleCardProps) => {
    const {role} = props;
    const history = useHistory();
    const dispatch = useDispatch()
const onRowClick = ()=>{
    history.push(AppRoutes.ROLEDETAILS)
    dispatch(setSelectedRole(role))
    role?.id && dispatch(fetchTransformedRoleById(role?.id))
}
  return (
    <div className="cardContainer">
      <Card className="rolesCardContainer">
        <Row onClick={onRowClick}>
          <Col md={8} xl={4} lg={8} xxl={4}>
            <Typography className="rolesTxt f-14">{role.name}</Typography>
          </Col>
          <Col md={16} xl={20} lg={16} xxl={20}>
            <Typography className="rolesTxtPara f-12">
              {role.description}
            </Typography>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default RolesCard;