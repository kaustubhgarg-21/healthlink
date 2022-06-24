import BaseState from "../../../core/states/baseState";
import FormState from "../../../core/states/formState";
import { AppUser } from "../../../web/models/app/appUser";

interface AuthState extends BaseState {
   formState: FormState,
   passwordGenerated: FormState,
   newPasswordGenerated:any,
   isAuthenticated?: boolean
   appUser: AppUser| null
   accountSettingUpdate: FormState
}

export default AuthState