import { useEffect, useState } from "react";
import RolesForm from "../../../stateless/roles/RolesForm";
import { AppRoutes } from "../../../../router/appRoutes";
import { Row, Col, Spin, message } from "antd";
import { Breadcrumbs } from "../../../stateless/common/breadCrumbs";
import Button from "../../../stateless/common/button";
import "./editCustomRole.less";
import { Card } from "antd";
import RolePermisson from "../../../stateless/common/rolePermisson";
import Role from "../../../../models/roles/role";
import { CompWrapper } from "../../../stateless/common/contentWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  RoleStateSelector,
} from "../../../../../redux/reducers/role/roleReducer";
import { deleteRole, fetchPermission, fetchTransformedRoleById, updateRole } from "../../../../../redux/actions/role/roleAction";
import { getPermissionIds, getUniquePermissionForEditing, getUniquePermissions } from "../../../../../utility/rolePermissionUtils";
import { ModalCallBackTypes, ModalPrimaryMessages, ModalSecondaryMessages, ModalType, PermissionTypes } from "../../../../constants/enums";
import FormState from "../../../../../core/states/formState";
import WarnModal from "../../../stateless/common/warnModal";
import { replaceAll } from "../../../../../utility/appUtil";
import { useHistory } from "react-router-dom";
interface RoleDetailsProps {
  role: Role
  roleData: any
  allRoles: Role[]
  formState: FormState
}
function EditCustomRole(props: RoleDetailsProps) {
  const { role, allRoles,roleData} = props;
  const [disableSave , setDisableSave] = useState(true)
  const [permisson, setPermission] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roleDetails, setRoleDetails] = useState({
    id: roleData?.id,
    name: roleData?.name,
    description: roleData?.description,
    permissions: roleData?.permission,
    isCustom: role?.isCustom,
  });
  const history = useHistory()
  const dispatch = useDispatch();
  const [checkedPermission, setCheckedPermission] = useState<any[]>([]);
  const [roleSelected, setRoleSelected] = useState('');
const[modifiedPermission,setModifiedPermission] = useState<any>([])
const [rolePermission, setRolePermission] = useState<any[]>([]);
  const { formState,permissions, isUpdated, isDeleted } = useSelector(RoleStateSelector);
  const deleteRoles = () => {
    dispatch(deleteRole(roleDetails))
  }
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
      text: "Edit CUSTOM ROLE",
    },
  ];
  useEffect(()=>{
    dispatch(fetchPermission({}))
  },[])
  useEffect(()=>{
    setRoleDetails({
      id: roleData?.id,
      name: roleData?.name,
      description: roleData?.description,
      permissions: roleData?.permission,
      isCustom: role?.isCustom,
    })
  },[roleData])
  useEffect(() => {
    // get unique permissions
    if (modifiedPermission?.length <= 0) {
        permissions && getUniquePermissions(permissions).then((data) => {
            setModifiedPermission(data);
        }).catch(() => {
            console.log("Failed to get unique permissions");
        })
    }
  },[permissions])
  const handleSubmit = () => {
    dispatch(updateRole({...roleDetails, permissions: checkedPermission}));
  };
  const getRoleOptions = () => {
    if (allRoles) {
      var x = allRoles?.map((role) => {
        return {
          text: role.name,
          value: role.id,
        };
      });
      return x;
    } else return [];
  };
  useEffect(() => {
    if (isUpdated.isSuccess) {
      message.success({ content: `${roleDetails.name} updated successfully.` });
      dispatch(fetchTransformedRoleById(roleData?.id));
      dispatch(clearState());
      setDisableSave(true)
    }else if(isUpdated.isError) {
      dispatch(clearState());
      message.error({content: isUpdated.errorStack ? isUpdated.errorStack : "Something went wrong", key:"appNotification" })
    }
  }, [isUpdated.isSuccess, isUpdated.isError]);
useEffect(() => {
    roleDetails?.permissions && getUniquePermissionForEditing(modifiedPermission, roleDetails?.permissions).then((data) => {
          setRolePermission(data);
      }).catch(() => {
          console.log("Failed to get unique permissions for selected role");
      })
       // get ids for permissions
       roleDetails?.permissions && getPermissionIds( roleDetails?.permissions,permissions).then((data) => {
          setCheckedPermission(data.map((id:any)=>{return ({id: id})}));
      }).catch(() => {
          console.log("Failed to get id's for permissions of selected role");
      })
}, [roleDetails, formState.isSuccess, roleSelected]);
const getPermissionByNameNType = (type: string, permissionName: string) => {
  return permissions.filter((element:any) => {
    // debugger
      if (type == 'view') {
          return (element?.name === permissionName && element?.action === PermissionTypes.VIEW);
      } else {
          return (element?.name === permissionName && (element?.action === PermissionTypes.CREATE || element.action === PermissionTypes.EDIT || element.action === PermissionTypes.DELETE));
      }
  })
}
const handleCancel = () => {
  setIsModalVisible(false);
};
// removes ids from checked permission array
const removePermission = (idsToRemove: number[]) => {
  let temp = [...checkedPermission];
  const afterRemovalPerm = temp.filter((item) => {
      return !idsToRemove.includes(item.id)
  })
  setCheckedPermission(afterRemovalPerm);
}
const handleCheckBoxOnChange = (e: any) => {
  var {name, checked, id} = e.target
  const perm = getPermissionByNameNType(name,id);
  if (checked) {
      let tempArr: any = [...checkedPermission];
      perm.forEach((item:any) => {
          tempArr.push({id: item.id});
      });
      setCheckedPermission(tempArr)
  } else {
      let idToRemove: number[] = [];
      perm.forEach((item:any) => {
          idToRemove.push(item.id);
      });
      removePermission(idToRemove);
  }
}
const handleRoleSelect = (value: any) => {
  setRoleSelected(value);
}
const getPermission = () => {
   return rolePermission;
} 
  return (
    <Spin spinning={isUpdated.loading || formState.loading || isDeleted.loading} key={roleDetails?.id}>
      <Row gutter={[30, 20]} className="innerHeader expand">
        <Col  md={24} lg={12} xl={15}>
          <Breadcrumbs breadcrumbs={nextPage} />
          <span className="addRoleHeader">EDIT CUSTOM ROLE</span>
        </Col>
        <Col md={6} lg={0} xl={0} xxl={0}></Col>
        <Col md={5} lg={0} xl={0} xxl={0}></Col>
        <Col md={7} lg={6} xl={4}>
          <Button type="primary" htmlType="submit" form="updateRole" disabled={disableSave}>
            SAVE CHANGES
          </Button>
        </Col>
        <Col md={6} lg={6} xl={5} className="btndelete">
        <Button type="primary" onClick={()=>setIsModalVisible(true)}>
            DELETE
          </Button>
        </Col>
      </Row>
      <div className="editCard">
      <CompWrapper observeOn="innerHeader" >
        <Card className="card ">
          <Row>
            <Col span={24}>
              <RolesForm
                getFormInfo={handleSubmit}
                formId="updateRole"
                data={roleDetails}
                setData={setRoleDetails}
                roleOptions={getRoleOptions()}
                roleSelected={roleSelected} 
                onRoleSelect={handleRoleSelect}
                disableSave={disableSave}
                setDisableSave={setDisableSave}
              ></RolesForm>
            </Col>
            <Col span={24}>
              {getPermission()?.map((item: any) => (
                <RolePermisson
                  item={item}
                  setRoleDetails={setRoleDetails}
                  roleDetails={roleDetails}
                  onChange={handleCheckBoxOnChange}
                  setDisableSave={setDisableSave}
                />
              ))}
            </Col>
          </Row>
        </Card>
      </CompWrapper>
      </div>
      <WarnModal
        type={ModalType.WARN}
        isModalVisible={isModalVisible}
        primaryText={ModalPrimaryMessages.DELETE_ROLE}
        secondaryText={replaceAll(/\{0\}/gi, ModalSecondaryMessages.DELETE_ROLE, roleDetails ? roleDetails?.name : "")}
        cancelButton={ModalCallBackTypes.CANCEL} confirmButton={ModalCallBackTypes.DELETE}
        cancelCallback={handleCancel}
        confirmCallback={deleteRoles}
      />
    </Spin>
  );
}
export default EditCustomRole;