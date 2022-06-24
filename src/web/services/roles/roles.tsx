import axios from "axios";
import BaseService from "../../../core/service/baseService";
import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apiEnvironment";
import Permission from "../../models/permission/permission";
import Role from "../../models/roles/role";

export class RoleService extends BaseService {
    constructor() {
        super(getAPIBaseUrl(PortalModule.ROLE))
    }   
    async fetchRoles(params?: any): Promise<Role[] | any> {
        let endpoint = `${PortalModule.ROLE}`
        if (params?.organizationId) {
            endpoint = `${endpoint}?organizationId=${params.organizationId}`
        }
      
        if (params?.isCustom) {
            endpoint = `${endpoint}&isCustom=${params.isCustom}`
        }
       
        
        const response = await this.get(endpoint)
        if (response.data.statusCode === 1) {
            const { result } = response.data
            const role = this.setRoleData(result.rows)
            return { count: result.count, roleList: role}
        } else {
            return null
        }
    }
    async updateRole(role: any): Promise<Role| any>{
        var {id}= role
        const response = await this.put(`${PortalModule.ROLE}/${id}`, role)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            var updatedRole = this.setUpdatedRole(result)
            return updatedRole
            }else if (response.data?.error) {
                const error = response.data?.error;
                if (
                  error &&
                  error.errType
                ) {
                  const orgData = this.setRoleError(
            
                    this.getErrorMessage(error)
                  );
                  return orgData;
                }
              } 
        }

    async fetchPermissions(params?: any): Promise<Role[] | any> {
        let endpoint = `${PortalModule.PERMISSION}`
        const response = await this.get(endpoint)
        if (response.data.statusCode === 1) {
            const { result } = response.data
            const permission = this.setPermissionData(result.rows)
            return { count: result.count, permissionList: permission}
        } else {
            return null
        }
    }
    async createRole(params: any): Promise<Role[] | any> {
        let endpoint = `${PortalModule.ROLE}`
        const response = await this.post(endpoint, params)
        if (response.data.statusCode === 1) {
            const { result } = response.data
            return result 
        }else if (response.data?.error) {
            const error = response.data?.error;
            if (
              error &&
              error.errType
            ) {
              const orgData = this.setRoleError(
        
                this.getErrorMessage(error)
              );
              return orgData;
            }
          } 
    }
    async deleteRole(params: any): Promise<Role[] | any> {
        var {id} = params
        let endpoint = `${PortalModule.ROLE}/${id}`
        const response = await this.delete(endpoint, params)
        if (response.data.statusCode === 1) {
            const { result } = response.data
            return result 
        } else {
            return null
        }
    }


    private setRoleData(data: any[]) {
        const processedList: Role[] = data.map((role: any) => {
            return (
                {
                    id: role?.id,
                    name: role?.name,
                    description:role?.description,
                    permissions: role?.rolePermissions,
                    isCustom: role?.isCustom,
                }
            )
        })
        return processedList
    }
    private setUpdatedRole(data: any) {
        var updatedRole:Role = {
            id: data?.id,
            name: data?.name,
            description:data?.description,
            permissions: data?.rolePermissions,
            isCustom: data?.isCustom,
        }
        return updatedRole
    }
    

    private setPermissionData(data: any[]) {
        const processedList: Permission[] = data.map((permission: any) => {
            return (
                {
                    id: permission?.id,
                    name: permission?.name,
                    description:permission?.description,
                    action:permission?.action,
                    isCustom: permission?.isCustom,
                }
            )
        })
        return processedList
    }

    // fetch transformed roles details
    fetchTransformedRoleDetails = async(roleId:string):Promise<Role[] | any> => {
        try{
            const response:any = await this.get(`${PortalModule.ROLES}/details/${roleId}`);
            if(response && response?.data && response?.data?.result && response?.data?.result?.message) return Promise.resolve(response?.data?.result?.message)
            return Promise.resolve(null);
        }catch(err:any) {
            console.log('Failed to fetch tranformed role details',err)
            Promise.reject(err)
        }
    }

    private getErrorMessage = (err: any) => {
        let error = "";
        error= err.message
       return error;
      }

    private setRoleError (error: any) {
        return (
            { error: error } as unknown as Role
        )
      }
}