import { message } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearRoleDetail, clearState, RoleStateSelector } from "../../../../../redux/reducers/role/roleReducer";
import { AppRoutes } from "../../../../router/appRoutes";
import EditCustomRole from "../editCustomRole";
import { SystemRoleDetails } from "../systemRole";
export const RoleDetails = () => {
  const { selectedRole, roles, roleDetails , formState, isDeleted} = useSelector(RoleStateSelector);
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(()=>{
    return (()=>{
      dispatch(clearRoleDetail())
    })
  },[])
  useEffect(()=>{
    if(isDeleted.isSuccess){
      message.success("Deleted Succesfully")
      history.push(AppRoutes.ROLES)
      dispatch(clearState())
    }else if(isDeleted.isError){
      message.error({content:isDeleted?.errorStack ? isDeleted?.errorStack : "Something went wrong", key:"appNotification"})
      dispatch(clearState())
    }
  },[isDeleted.isError, isDeleted.isSuccess])  
  return selectedRole.isCustom ? (
    <EditCustomRole role={selectedRole} allRoles={roles} roleData={roleDetails} formState={formState}/>
  ) : (
    <SystemRoleDetails role={selectedRole} roleData={roleDetails} formState={formState} />
  );
};