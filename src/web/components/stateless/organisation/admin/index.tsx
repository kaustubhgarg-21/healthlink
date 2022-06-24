import { useEffect } from 'react';
import UserRow from "../../../stateless/user/userRow"
import "./adminUserList.less"
import { CompWrapper } from '../../common/contentWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, UserStateSelector } from '../../../../../redux/reducers/user/userReducer';
import { message, Spin } from 'antd';
import { fetchUsers } from '../../../../../redux/actions/user/userAction';
import { UserRoles } from '../../../../constants/enums';
import { AuthStateSelector } from '../../../../../redux/reducers/authReducer/authReducer';
import NODataFound from '../../common/noDataFound';

const AdminUserList = (props: any) => {
    const {search, users , showAdminDetails, organization , roles,selectedFilter, orgRole} = props;
    const {formState , isUpdated, isDeleted} = useSelector(UserStateSelector)
    const {passwordGenerated} = useSelector(AuthStateSelector)
    const dispatch = useDispatch()
    useEffect(()=>{
    if(formState.isSuccess){
    dispatch(clearState())
    }else if(formState.isError){
    dispatch(clearState())
    }
    },[formState.isSuccess])

    useEffect(() => {
      dispatch(
        fetchUsers({
          organization: organization?.id,
          search: search,
          isActive: selectedFilter,
          role: orgRole,
        })
      );
    }, [search, selectedFilter]);
    useEffect(()=>{
        if(isUpdated.isSuccess){
            dispatch(clearState())
            dispatch(fetchUsers({
                organization:organization?.id,
                role: roles?.filter((role: any)=>{if(role.text == UserRoles.ORG_ADMIN){return role?.value}})[0]?.value
            }))
        } else if(isUpdated.isError || isDeleted?.isError){
            dispatch(clearState())
        }
    },[isUpdated.isSuccess , isUpdated.isError])

    useEffect(()=>{
        if(isDeleted?.isSuccess){
            dispatch(clearState())
            message.success({content:"User Deleted Successfully"})
            dispatch(fetchUsers({
                organization:organization?.id,
                role: roles?.filter((role: any)=>{if(role.text == UserRoles.ORG_ADMIN){return role?.value}})[0]?.value
            }))
        } else if(isDeleted?.isError){
            message.error({content:isDeleted?.errorStack ? isDeleted?.errorStack : "Something went wrong", key:"appNotification"})
            dispatch(clearState())
        }
    },[isDeleted.isSuccess, isDeleted.isError])

    return (
        <Spin spinning={formState.loading || passwordGenerated.loading}>
            <CompWrapper observeOn="innerHeader" name="admin-list">
                <div className="admin-list">
                {
                  users.length!=0?
                    users?.map((dum:any) => {
                        return (
                           
                            <UserRow key={dum?.id} user={dum}  showAdminDetails={showAdminDetails} />
                    
                    )
                    
                })
                :!formState?.loading &&<NODataFound/>
            }
                </div>
            </CompWrapper>
            </Spin>
    )

}

export default AdminUserList;