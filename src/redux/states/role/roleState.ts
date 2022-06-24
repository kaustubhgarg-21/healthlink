import BaseState from "../../../core/states/baseState";
import FormState from "../../../core/states/formState";
import Permission from "../../../web/models/permission/permission";
import Role from "../../../web/models/roles/role";

interface RoleState extends BaseState {
   
    roleCount: number,
    formState: FormState,
    roles:Role[]|[],
    selectedRole: Role | any,
    permissionCount: number,
    permissions: Permission[] | [],
    isCreated:FormState,
    isDeleted: FormState,
    // selectedOrganization: Organization,
    isUpdated: FormState,
    roleDetails: Role | any
}

export default RoleState