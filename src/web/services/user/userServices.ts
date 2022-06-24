import BaseService from "../../../core/service/baseService";
import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apiEnvironment";
import User from "../../models/users/user";
import Role from "../../models/roles/role";
import { UserRoles } from "../../constants/enums";



export class UserService extends BaseService {
    constructor() {
        super(getAPIBaseUrl(PortalModule.USER))
    }

    async fetchUsers(params?: any): Promise<User[] | any> {

        let endpoint = `${PortalModule.USER}`
        var query:any = {}
        if (params?.organization) {
            query["organisation"] = params?.organization
        }
        if (params?.role != null || params?.role != undefined) {
            query["role"] = params?.role
        }
        if (params?.search) {
            query["search"] = params?.search
        }
        if (params?.isActive !== null) {
            query["status"] = params?.isActive
        }
        if (params?.page) {
            query["page"] = params?.page
        }
       
        
        const response = await this.get(endpoint, {params: query})
        if (response.data.statusCode === 1) {
            const { result } = response.data
            const users = await this.setUserListData(result.rows)
            return Promise.resolve({ count: result.count, userList: users })

        } else {
            return Promise.resolve(null)
        }
    }
    



    async createUser(usrDetails: any): Promise<User | any> {
        const response = await this.post(`${PortalModule.ADDUSER}`, usrDetails)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            return result;
        }   else if (response.data?.error) {
            const error = response.data?.error;
            if (
              error &&
              error.errType
            ) {
              const orgData = this.setUserError(

                this.getErrorMessage(error)
              );
              return orgData;
            }
          } 
    }

    async fetchSingleUser(userId: any): Promise<User | any> {
        const response = await this.get(`${PortalModule.USER}/${userId}`)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            var user = await this.setUpdateUser(result)
            return user[0];
        } else {
            return null
        }
    }

   

    async updateUser(userDetails: any): Promise<User | any> {
        var {id}= userDetails
        delete userDetails.username; //to be remove after demo
        const response = await this.put(`${PortalModule.USER}/${id}`,userDetails)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            var updatedUser = await this.setUpdateUser(result)
            console.log('Update user result ********* FINAL',updatedUser[0])            
            return updatedUser[0]
        } else if (response.data?.error) {
            const error = response.data?.error;
            if (
              error &&
              error.errType
            ) {
              const orgData = this.setUserError(

                this.getErrorMessage(error)
              );
              return orgData;
            }
          } 
    }

   
    async deleteUser(userDetails: any): Promise<User | any> {
        var {id}= userDetails
        let params: any = {}
         if(userDetails?.orgId){
             params["organisationId"] = userDetails?.orgId
         }
        const response = await this.delete(`${PortalModule.USER}/${id}`,{data: params} )
        if (response.data.statusCode == 1) {
            const { result } = response.data
            return true
        } else if (response.data?.error) {
            const error = response.data?.error;
            if (
              error &&
              error.errType
            ) {
              const orgData = this.setUserError(

                this.getErrorMessage(error)
              );
              return orgData;
            }
          } 
    }
    async uploadImage(body: any): Promise<string | any> {
        const response = await this.post(`${PortalModule.USER}/${PortalModule.IMAGE}`, body, {headers: {
            'Content-Type': 'multipart/form-data'
          }})
        if (response.data?.result?.profile_Picture_URL?.length) {
            const { profile_Picture_URL } = response.data.result
            return profile_Picture_URL
        } else {
            return null
        }
    }
    
    async importUsers(userData: any): Promise<any> {
        const {userType, body} = userData;
        try {
        const response = await this.post(`import/${userType}`, body, {headers: {
            'Content-Type': 'multipart/form-data'
          }})
        if(response.data?.msg=="File uploaded successfully!"){
            const success = response.data
            return success
        } else if (response?.data?.msg === "Limit exceeded"){
            return false
        } else if(response?.data){
            return false
        }
        else{
            return null
        }
        } catch (e) {
                return e
        }
    }

    async fetchUserDashboardData(params?: any): Promise<User[] | any> {

        let endpoint = `${PortalModule.REPORTS}`
        var query:any = {}
        if (params?.providerId) {
            query["providerId"] = params?.providerId
        }
        if (params?.organizationId) {
            query["organizationId"] = params?.organizationId
        }
        if (params?.roleName) {
            query["roleName"] = params?.roleName
        }
        if (params?.roleNamePa) {
            query["roleNamePA"] = params?.roleNamePa
        }
        const response = await this.get(endpoint, {params: query})
        if (response.data.statusCode === 1) {
            const { result } = response.data
            return result

        } else {
            return null
        }
    } 
   

    private async setUserListData(data: any[]) {
        let processedList: User[] = []
        const temp: any[] = data.map((user: any) => {
            const finalResult:any[] = []
            let updatedCenters:any[] = []
            this.getUniqueCenters(finalResult,user).then((result:any)=>{
                updatedCenters = result
            processedList.push(   {
                    id: user?.id,
                    username: user?.username,
                    title: user?.title,
                    firstName: user?.firstName,
                    middleName: user?.middleName,
                    email: user?.email,
                    contactNumber:user?.contactNumber,
                    mobileNumber:user?.mobileNumber,
                    status:user?.status,
                    lastName: user?.lastName,
                    imageUrl: user?.imageUrl,
                    address1: user?.addresses[0].address1,
                    address2: user?.addresses[0].address2,
                    city: user?.addresses[0].city,
                    state: user?.addresses[0].state,
                    country: user?.addresses[0].country,
                    zipCode: user?.addresses[0].zipCode,
                    roleName: user?.userRoles[0]?.roleName,
                    roleId: user?.userRoles[0].roleId,
                    organisations:{
                        orgId: user?.userRoles[0]?.orgId,
                        centers: updatedCenters//this.getUniqueCenters(finalResult,user)
                     },
                    isPrimary: user?.isPrimary,
                    userRoles:user?.userRoles,
                    createdBy: user?.createdBy,
                    createdAt: user?.createdAt,
                    updatedBy: user?.updatedBy,
                    updatedAt: user?.updatedAt,
                    deletedBy: user?.deletedBy,
                    deletedAt: user?.deletedAt,
                }
            )
            })
        })
        console.log('Proceesed list>>>>>>>>>>>>>>',processedList)
        return processedList
    }
    private setUserRoles(userRoles:any) {
        let result:any[] = [];
        const data = userRoles.length > 0 && userRoles.map((adminDepartment:any)=>{
            if(adminDepartment?.departmentId) {
               return{
                   departmentId:adminDepartment?.departmentId
                }
            }
            return null
        })
        if(data[0] !== null) {
            result = data
        }
        return result;
    }
    private async getUniqueCenters(finalResult:any, user:any) {
        const res = user?.userRoles[0]?.centerId ? user?.userRoles.map((centers:any)=>{
            let index = finalResult.findIndex((element: any) => element?.centerId === centers?.centerId)
            if(index>=0) {
                // const data = {'centerId':pId, 'departments':DptIdPId[index]?.departments.concat({'departmentId':dpt})}
                const tempDpt = finalResult[index]?.departments
                const tempDpt2 = tempDpt.concat({'departmentId': centers?.departmentId})

                const unique = [...new Map(tempDpt2.map((item:any) =>
                    [item['departmentId'], item])).values()];
                finalResult.splice(index, 1);
                finalResult.push({
                    'centerId': centers?.centerId,
                    'departments': unique
                })
            }else{
                finalResult.push({
                    centerId: centers?.centerId,
                    departments: [{'departmentId': centers?.departmentId}]
                })
            }
        }):[]
        return finalResult
    }

    private async setUpdateUser(user: any) {
        let finalUser:any=[]
        const finalResult:any[] = []
        this.getUniqueCenters(finalResult,user).then((result:any)=>{
           let str =  {
                id: user?.id,
                username: user?.username,
                title: user?.title,
                firstName: user?.firstName,
                middleName: user?.middleName,
                lastName: user?.lastName,
                imageUrl: user?.imageUrl,
                email: user?.email,
                mobileNumber: user?.mobileNumber,
                contactNumber: user?.contactNumber,
                preferredCommumnication: user?.preferredCommumnication,
                address1: user?.addresses[0]?.address1,
                address2: user?.addresses[0]?.address2,
                city: user?.addresses[0]?.city,
                state: user?.addresses[0]?.state,
                country: user?.addresses[0]?.country,
                zipCode: user?.addresses[0]?.zipCode,
                roleName: user?.userRoles[0]?.roleName,
                roleId: user?.userRoles[0].roleId,
                organisations:{
                    orgId: user?.userRoles[0]?.orgId,
                    centers: result//this.getUniqueCenters(finalResult,user)
                 },
                isPrimary: user?.isPrimary,
                userRoles:user?.userRoles,
                createdBy: user?.createdBy,
                createdAt: user?.createdAt,
                updatedBy: user?.updatedBy,
                updatedAt: user?.updatedAt,
                deletedBy: user?.deletedBy,
                deletedAt: user?.deletedAt,
    }
    finalUser.push(str)
}).catch((err:any)=>{
console.log('Update user result ********* ERROR',err)
})
        //console.log("326 >>>>>>>>>>> final user",finalUser);
        return Promise.resolve(finalUser)
    }

    private getErrorMessage = (err: any) => {
        let error = "";
        error= err.message
       return error;
      };

    private setUserError (error: any) {
        return (
            { error: error } as unknown as User
        )
    }
}