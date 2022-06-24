import {useEffect, useState} from 'react'
import RolesForm from '../../../stateless/roles/RolesForm'
import { AppRoutes } from '../../../../router/appRoutes'
import {Row,Col, Spin, message} from 'antd';
import {Breadcrumbs} from '../../../stateless/common/breadCrumbs'
import Button from '../../../stateless/common/button';
import './createCustomRole.less'
import {Card} from 'antd'
import RolePermisson from '../../../stateless/common/rolePermisson';
import { CompWrapper } from '../../../stateless/common/contentWrapper';
import { createRole, fetchPermission, fetchTransformedRoleById } from '../../../../../redux/actions/role/roleAction';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, RoleStateSelector } from "../../../../../redux/reducers/role/roleReducer";
import { useHistory } from 'react-router-dom';
import { ModalSecondaryMessages, ModalType, PermissionTypes, UserRoles } from '../../../../constants/enums';
import WarnModal from '../../../stateless/common/warnModal';
import { getPermissionIds, getUniquePermissionForEditing, getUniquePermissions } from '../../../../../utility/rolePermissionUtils';
import { AuthStateSelector } from '../../../../../redux/reducers/authReducer/authReducer';

function CreateCustomRole(props:any) {
  const history = useHistory()
  const [showModal, setShowModal] =useState(false)
  const {formState, permissions , roleDetails , isCreated,roles, selectedRole} = useSelector(RoleStateSelector)
  const {appUser} = useSelector(AuthStateSelector)
  useEffect(()=>{
    if(isCreated.isSuccess == true){
      setShowModal(true)
      dispatch(clearState())
    }else if(isCreated.isError){
      message.error({content:isCreated.errorStack ? isCreated.errorStack : "Something went wrong", key:"appNotification"})
      dispatch(clearState())
    }
  },[isCreated.isSuccess, isCreated.isError])

    useEffect(()=>{
      switch( appUser?.roleName){
          case UserRoles.SUPER_ADMIN:{
              return setSelectedOrg(null)
          }
          case UserRoles.PLATFORM_ADMIN:{
              return setSelectedOrg(null)
          }
          default:{
              return setSelectedOrg(appUser?.orgId)
          }
      }
  },[appUser])

  const onModalClose = () => {
    history.push(AppRoutes.ROLES)
  }
  const dispatch = useDispatch()
  const nextPage = [
    {
        text: "DASHBOARD",
        link: AppRoutes.LANDING
    },
    {
        text: "ROLES",
        link: AppRoutes.ROLES
    },
    {
        text: "CREATE CUSTOM ROLE"
    }
]
const handleSubmit = ()=>{
  dispatch(createRole(selectedOrg? {...roleForm, permissions: checkedPermission, organizationId: selectedOrg}: {...roleForm, permissions: checkedPermission}))
}
const [checkedPermission, setCheckedPermission] = useState<any[]>([]);
const [roleSelected, setRoleSelected] = useState('');
const[modifiedPermission,setModifiedPermission] = useState<any>([])
const [rolePermission, setRolePermission] = useState<any[]>([]);
const [selectedOrg, setSelectedOrg] = useState<any>()
const[roleForm,setRoleDetails] = useState({
  name:"",   
  description:"",
  isCustom:true,
  permissions:[]
})

useEffect(()=>{
  dispatch(fetchPermission({}))
},[])

useEffect(() => {
  if (modifiedPermission?.length <= 0) {
      permissions && getUniquePermissions(permissions).then((data) => {
          setModifiedPermission(data);
      }).catch(() => {
          console.log("Failed to get unique permissions");
      })
  }
},[permissions])
useEffect(() => {
  if (roleSelected !=='') {
    roleDetails?.permission && getUniquePermissionForEditing(modifiedPermission, roleDetails?.permission).then((data) => {
          setRolePermission(data);
      }).catch(() => {
          console.log("Failed to get unique permissions for selected role");
      })
       roleDetails?.permission && getPermissionIds( roleDetails?.permission,permissions).then((data) => {
          setCheckedPermission(data.map((id:any)=>{return ({id: id})}));
      }).catch(() => {
          console.log("Failed to get id's for permissions of selected role");
      })
  }
}, [formState.isSuccess, roleSelected, roleDetails]);
useEffect(()=>{     
},[rolePermission])
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
// removes ids from checked permission array
const removePermission = (idsToRemove: number[]) => {
  let temp = [...checkedPermission];
  const afterRemovalPerm = temp.filter((item) => {
      return !idsToRemove.includes(item.id)
  })
  setCheckedPermission(afterRemovalPerm);
}
const handleRoleSelect = (value: any) => {
  setCheckedPermission([]);
  setRoleSelected(value);
  if (value !== '') {
      dispatch(fetchTransformedRoleById(value));
  }
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
const getPermission = () => {
  if (roleSelected !==''){
      return rolePermission;}
  else{
  return modifiedPermission;
  };
}
const getRoleOptions = () => {
  if (roles) {
    var x = roles?.map((role) => {
      return {
        text: role.name,
        value: role.id,
      };
    });
    return x.concat({text: "None", value: ""});
  } else return [];
};
  return (
    <div>
        <Row gutter={[30,20]} className="innerHeader">
                <Col  md={18} lg={19} xl={20}>
                <Breadcrumbs breadcrumbs={nextPage}/>
                    <span className='addRoleHeader f-18'>ADD CUSTOM ROLE</span>
                </Col>
                <Col md={6} lg={5} xl={4}  className="addSave">

                    <Button type="primary" htmlType="submit" className="saveButton font" form="createRole">SAVE
                    </Button>
                </Col>
        </Row>
            <div className="editCard">
          <CompWrapper observeOn="innerHeader">
          <Spin spinning={formState.loading || isCreated.loading}>
           <Card className='card'>               
               <Row>
                   <Col span={24}>
                   <RolesForm roleOptions={getRoleOptions()} getFormInfo = {handleSubmit} formId="createRole" data = {roleForm}setData ={setRoleDetails} roleSelected={roleSelected} onRoleSelect={handleRoleSelect}></RolesForm> 
                   </Col>                
                   <Col span ={24}>
                     {getPermission()?.map((item:any)=>(
                       <RolePermisson item ={item}   setRoleDetails = {setRoleDetails}  roleDetails ={roleForm} onChange={handleCheckBoxOnChange}/>
                     ))}                     
                   </Col>
                </Row>                       
           </Card>  
           </Spin>
</CompWrapper>   
</div>       
<WarnModal cancelButton={null} confirmButton={null} isModalVisible={showModal} type={ModalType.SUCCESS} cancelCallback={onModalClose} primaryText={selectedRole? selectedRole?.name: ""} secondaryText={ModalSecondaryMessages.ENTITY_ADDED}/> 
    </div>
  )
}
export default CreateCustomRole;