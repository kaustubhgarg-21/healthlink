import BaseService from "../../../core/service/baseService";
import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apiEnvironment";
import { APIResponseError, TermsAndConditionFileName } from "../../constants/enums";
import { Messages } from "../../constants/messages";
import { AppUser } from "../../models/app/appUser";
import User from "../../models/users/user";

export class AuthService extends BaseService {
    constructor(){
        super(getAPIBaseUrl(PortalModule.LOGIN))
    }

    async login (params:any) : Promise<any> {
        const response = await this.post(`${PortalModule.LOGIN}`, params)
        if (response.data.statusCode === 1) { 
            const { result } = response.data
            var authUser = this.setAppUser(result)
            return authUser
        }else if (response.data?.error) {
            const error = response.data?.error;
            if (
              error &&
              error.errType
            ) {
              const userData = this.setAppUserError(
                this.getErrorMessage(error)
              );
              return userData;
            }
          } 
    }


    async fetchPrivacyPolicy(params: any): Promise<any> {
      const response = await this.get(`policy`)
      if (response.data.statusCode == 1) {
          const { result } = response.data
          const privacy = this.setPrivacyPolicy(result)
          return privacy;
      } else {
          return null
      }
  }

    async changePassword (params:any) : Promise<any> {
      const response = await this.post(`${PortalModule.CHANGEPASSWORD}`, params)
      if (response.data.statusCode === 1) { 
          const { result } = response.data
          // var authUser = this.setAppUser(result)
          // return authUser
          return result;
      }else if (response.data?.error) {
          const error = response.data?.error;
          if (
            error &&
            error.errType) {
            const userData = this.setAppUserError(
              this.getPasswordErrorMessage(error)
            );
            return userData;
          }
        } 
  }

    async resetPassword (params:any) : Promise<any> {
      const response = await this.post(`${PortalModule.RESETPASSWORD}`, params)
      if (response.data.statusCode === 1) { 
          const { result } = response.data
          var authUser = this.setAppUser(result)
          return authUser
      }else if (response.data?.error) {
          const error = response.data?.error;
          if (
            error &&
            error.errType
          ) {
            const userData = this.setAppUserError(
              this.getPasswordErrorMessage(error)
            );
            return userData;
          }
        } 
  }

  async requestChangePassword (params:any) : Promise<any> {
    const response = await this.post(`${PortalModule.REQUESTCHANGEPASSWORD}`, params)
    if (response.data.statusCode === 1) { 
        const { result } = response.data
        var authUser = this.setAppUser(result)
        return authUser
    }else if (response.data?.error) {
        const error = response.data?.error;
        if (
          error &&
          error.errType &&
          (error.errType === APIResponseError.UNAUTHORIZED
          )
        ) {
          const userData = this.setAppUserError(
            this.getErrorMessage(error)
          );
          return userData;
        }
      } 
}
async logout(): Promise<User | null> {
  const response: any = await this.post(`logout`);
  if (response && response.data) {
    if (response.data?.error) {
      console.log("Error occurred while logging out!!");
    }
    else {
      console.log("logged out successfully");
      window.localStorage.clear();
    }
  }    
  return await Promise.resolve(null);
}

async updatePolicyCheck(user:any): Promise<any> {
  const {id} = user
  const response: any = await this.put(`updatePolicycheck/${id}`);
  if (response && response.data) {
    if (response.data?.error) {
      console.log("Error occurred while updating agreement.!!");
    }
    else {
      return true
    }
  }    
  return await Promise.resolve(null);
}
    private getErrorMessage = (err: any) => {
        let error = "";
        switch (err.errType) {
          case APIResponseError.UNAUTHORIZED:
            error = Messages.AUTH_FAILED;
            break;
          case APIResponseError.NOT_FOUND:
            error = Messages.USER_NOT_FOUND
            break;
          case APIResponseError.BAD_REQUEST:
            error = Messages.USER_DEACTIVATED
    
        }
        return error;
      };

      private getPasswordErrorMessage = (err: any) => {
        let error = "";
        switch (err.errType) {
          case APIResponseError.UNAUTHORIZED:
            error = Messages.AUTH_FAILED;
            break;
          case APIResponseError.NOT_FOUND:
            error = Messages.TOKEN_EXPIRED
    
        }
        return error;
      }

      private setPrivacyPolicy(data: any[]) {
        const processedList ={
          privacypolicy:data?.find((x:any)=>x?.fileName==TermsAndConditionFileName.PRIVACYPOLICY),
          termsConditions:data?.find((x:any)=>x?.fileName==TermsAndConditionFileName.TERMSCONDITION),
          agreementPolicy: data?.find((x:any)=>x?.fileName==TermsAndConditionFileName.AGREEMENTPOLICY)
        }
        return processedList
    }


    private setAppUser(user: any) {
      const {updatedUser} = user;
        var appUser: AppUser = {
                id: updatedUser?.id,
                username: updatedUser?.username,
                title: updatedUser?.title,
                firstName: updatedUser?.firstName,
                middleName: updatedUser?.middleName,
                email: updatedUser?.email,
                contactNumber:updatedUser?.contactNumber,
                mobileNumber:updatedUser?.mobileNumber,
                status:updatedUser?.status,
                lastName: updatedUser?.lastName,
                imageUrl: updatedUser?.imageUrl,
                roleName: updatedUser?.userRoles[0]?.roleName,
                isPrimary: updatedUser?.isPrimary,
                userRoles:updatedUser?.userRoles,
                roleId: updatedUser?.userRoles[0]?.roleId,
                orgId: updatedUser?.userRoles[0]?.orgId,
                orgName: updatedUser?.userRoles[0]?.orgName,
                policyCheck: updatedUser?.policyCheck,
                idToken: user?.idToken,
                accessToken: user?.accessToken,
                refreshToken: user?.refreshToken
        }
        return appUser
    }

    private setAppUserError(error: any) {
        var appUser: AppUser = {
                id: "",
                username: "",
                title:"",
                firstName: "",
                middleName: "",
                email: "",
                contactNumber:"",
                mobileNumber:"",
                status:"",
                lastName: "",
                imageUrl: "",
                roleName: "",
                isPrimary: false,
                userRoles:[],
                roleId: "",
                orgId: "",
                orgName: "",
                idToken: "",
                accessToken: "",
                refreshToken: "",
                error: error,
        }
        return appUser
    }
}