import BaseState from "../../../core/states/baseState";
import FormState from "../../../core/states/formState";
import Organization from "../../../web/models/organization/organizaton";
import User from "../../../web/models/users/user";
import Role from "../../../web/models/roles/role";

interface UserState extends BaseState {
    users: User[] | [],
    userCount: number,
    formState: FormState,
    isUpdated: FormState,
    isDeleted: FormState,
    isCreated: FormState,
    selectedUser: User| any,
    dashboardData: any,
    uploadedUsers: any,
    isUploaded: FormState,

}

export default UserState