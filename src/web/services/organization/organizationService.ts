import BaseService from "../../../core/service/baseService";
import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apiEnvironment";
import { APIResponseError, UserRoles } from "../../constants/enums";
import { Messages } from "../../constants/messages";
import { family } from "../../images";
import Organization from "../../models/organization/organizaton";

export class OrganizationService extends BaseService {
    constructor() {
        super(getAPIBaseUrl(PortalModule.ORGANIZATION))
    }

    async fetchOrganizations(params?: any): Promise<Organization[] | any> {

        let endpoint = `${PortalModule.ORGANIZATION}`
        if (params?.levelCode) {
            endpoint = `${endpoint}?levelCode=${params.levelCode}`
        }
        if (params?.isActive != null || params?.isActive != undefined) {
            endpoint = `${endpoint}&isActive=${params.isActive}`
        }
        if (params?.parentId) {
            endpoint = `${endpoint}&parentId=${params.parentId}`
        }
        if (params?.country) {
            endpoint = `${endpoint}&country=${params.country}`
        }
        if (params?.search) {
            endpoint = `${endpoint}&search=${params.search}`
        }
        if (params?.limit) {
            endpoint = `${endpoint}&limit=${params.limit}`
        }
        if (params?.page) {
            endpoint = `${endpoint}&page=${params.page}`
        }
        if (params?.sortOrder) {
            endpoint = `${endpoint}&sortOrder=${params.sortOrder}`
        }
        if (params?.sortBy) {
            endpoint = `${endpoint}&sortBy=${params.sortBy}`
        }

        const response = await this.get(endpoint)
        if (response.data.statusCode === 1) {
            const { result } = response.data
            const organizations = this.setOrganizationListData(result.rows)
            return { count: result.count, organizationList: organizations }
        } else {
            return null
        }
    }   
    async fetchSingleOrganization(orgId: any): Promise<Organization | any> {
        const response = await this.get(`${PortalModule.ORGANIZATION}/${orgId}`)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            var organization = this.setUpdateOrganization(result)
            return organization;
        } else {
            return null
        }
    }
    async createOrganization(orgDetails: any): Promise<Organization | any> {
        const response = await this.post(`${PortalModule.ORGANIZATION}`, orgDetails)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            return result;
        } else if (response.data?.error) {
            const error = response.data?.error;
            if (
              error &&
              error.errType
            ) {
              const orgData = this.setOrganizationError(

                this.getErrorMessage(error)
              );
              return orgData;
            }
          } 
    }

    async createOrganizationCentre(orgDetails: any): Promise<Organization | any> {
        const response = await this.post(`center`, orgDetails)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            return result;
        } else if (response.data?.error) {
            const error = response.data?.error;
            if (
              error &&
              error.errType
            ) {
              const orgData = this.setOrganizationError(

                this.getErrorMessage(error)
              );
              return orgData;
            }
          } 
    }
    async createOrganizationDepartment(orgDetails: any): Promise<Organization | any> {
        const response = await this.post(`department`, orgDetails)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            return result;
        } else if (response.data?.error) {
            const error = response.data?.error;
            if (
              error &&
              error.errType
            ) {
              const orgData = this.setOrganizationError(

                this.getErrorMessage(error)
              );
              return orgData;
            }
          } 
    }

    async updateOrganization(orgDetails: any): Promise<Organization | any> {
        var {orgId}= orgDetails
        const response = await this.put(`${PortalModule.ORGANIZATION}/${orgId}`, orgDetails)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            var updatedOrg = this.setUpdateOrganization(result)
            return updatedOrg
        }  else if (response.data?.error) {
            const error = response.data?.error;
            if (
              error &&
              error.errType
            ) {
              const orgData = this.setOrganizationError(

                this.getErrorMessage(error)
              );
              return orgData;
            }
          } 
    }

    async deleteOrganization(organizationDetails: any): Promise<Organization | any> {
        var {id}= organizationDetails
        const response = await this.delete(`${PortalModule.ORGANIZATION}/${id}`)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            
            return true
        }  else if (response.data?.error) {
            const error = response.data?.error;
            if (
              error &&
              error.errType
            ) {
              const orgData = this.setOrganizationError(

                this.getErrorMessage(error)
              );
              return orgData;
            }
          } 
    }

    async deleteDepartment(departmentDetails: any): Promise<Organization | any> {
      var {id}= departmentDetails
      const response = await this.delete(`${PortalModule.DEPARTMENT}/${id}`)
      if (response.data.statusCode == 1) {
          const { result } = response.data
          
          return true
      }  else if (response.data?.error) {
          const error = response.data?.error;
          if (
            error &&
            error.errType
          ) {
            const orgData = this.setOrganizationError(

              this.getErrorMessage(error)
            );
            return orgData;
          }
        } 
  }

    async deleteCenter(centerDetails: any): Promise<Organization | any> {
      var {id}= centerDetails
      const response = await this.delete(`${PortalModule.CENTER}/${id}`)
      if (response.data.statusCode == 1) {
          const { result } = response.data
          
          return true
      }  else if (response.data?.error) {
          const error = response.data?.error;
          if (
            error &&
            error.errType
          ) {
            const orgData = this.setOrganizationError(

              this.getErrorMessage(error)
            );
            return orgData;
          }
        } 
  }

    async updateCentre(orgDetails: any): Promise<Organization | any> {
        var {orgId}= orgDetails
        const response = await this.put(`center/${orgId}`, orgDetails)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            var updatedOrg = this.setUpdateOrganization(result)
            return updatedOrg
        }  else if (response.data?.error) {
            const error = response.data?.error;
            if (
              error &&
              error.errType
            ) {
              const orgData = this.setOrganizationError(

                this.getErrorMessage(error)
              );
              return orgData;
            }
          } 
    }

    async updateDepartment(orgDetails: any): Promise<Organization | any> {
        var {orgId}= orgDetails
        const response = await this.put(`department/${orgId}`, orgDetails)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            var updatedOrg = this.setUpdateOrganization(result)
            return updatedOrg
        }  else if (response.data?.error) {
            const error = response.data?.error;
            if (
              error &&
              error.errType
            ) {
              const orgData = this.setOrganizationError(

                this.getErrorMessage(error)
              );
              return orgData;
            }
          } 
    }
    async organizationSummary(organisation: Organization): Promise<Organization | any> {
        var {id}= organisation
        var params = {organisation : id}
        const response = await this.get(`${PortalModule.ORGANIZATION}/${PortalModule.USER}/summary`,{params: params})
        if (response.data.statusCode == 1) {
            const { result } = response.data
            var updatedOrg = this.setOrganizationSummary(result)
            return updatedOrg
        } else {
            return null
        }
    }

    async uploadImage(body: any): Promise<string | any> {
        const response = await this.post(`${PortalModule.LEVEL}/${PortalModule.IMAGE}`, body, {headers: {
            'Content-Type': 'multipart/form-data'
          }})
        if (response.data?.logo_URL?.length) {
            const { logo_URL } = response.data
            return logo_URL
        } else {
            return null
        }
    }
    private getErrorMessage = (err: any) => {
        let error = "";
        switch (err.errType) {
          case APIResponseError.ALREADY_EXIST:
            error = err.message;
            break;
            default: {
            error= err.message            }
        }
       return error;
      };
    private setOrganizationListData(data: any[]) {
        const processedList: Organization[] = data.map((org: any) => {
            return (
                {
                    id: org?.id,
                    parentId: org?.parentId,
                    imageURL: org?.imageURL,
                    orgName: org?.orgName,
                    isActive: org?.isActive,
                    levelCode: org?.levelCode,
                    address1: org?.address1,
                    address2: org?.address2,
                    city: org?.city,
                    state: org?.state,
                    country: org?.country,
                    zipcode: org?.zipcode,
                    notes: org?.notes,
                    timezone: org?.timezone,
                    primaryContact: org?.orgContacts?.filter((contact: any) => { return contact.isPrimary == true })[0],
                    secondaryContact: org?.orgContacts?.filter((contact: any) => { return contact.isPrimary == false })[0],
                    orgContacts: org?.orgContacts?.filter((contact: any) => { return contact.isPrimary == false }),
                    orgCentres: org?.orgCentres,
                    orgDepartments: org?.orgDepartments,
                    createdBy: org?.createdBy,
                    createdAt: org?.createdAt,
                    updatedBy: org?.updatedBy,
                    updatedAt: org?.updatedAt,
                    deletedBy: org?.deletedBy,
                    deletedAt: org?.deletedAt,
                }
            )
        })
        return processedList
    }

    private setOrganizationSummary(org:any){
        const organisationCount: any = 
             { 
                familyCount: org?.filter((obj: any) => {return  obj?.roleName== UserRoles.FAMILY})[0]?.count,
                providerCount:org?.filter((obj: any) => {return  obj?.roleName== UserRoles.PROVIDER})[0]?.count,
                patientCount: org?.filter((obj: any) => {return  obj?.roleName== UserRoles.PATIENT})[0]?.count,
                adminCount: org?.filter((obj: any) => {return  obj?.roleName== UserRoles.ORG_ADMIN})[0]?.count,
            }
        
    
        return organisationCount
    }

    private setUpdateOrganization(org: any) {
        return {
            id: org?.id,
            parentId: org?.parentId,
            orgName: org?.orgName,
            isActive: org?.isActive,
            levelCode: org?.levelCode,
            address1: org?.address1,
            address2: org?.address2,
            imageURL: org?.imageURL,
            city: org?.city,
            state: org?.state,
            country: org?.country,
            zipcode: org?.zipcode,
            notes: org?.notes,
            timezone: org?.timezone,
            primaryContact: org?.orgContacts?.filter((contact: any) => { return contact.isPrimary == true })[0],
            secondaryContact: org?.orgContacts?.filter((contact: any) => { return contact.isPrimary == false })[0],
            orgContacts: org?.orgContacts?.filter((contact: any) => { return contact.isPrimary == false }),
            orgCentres: org?.children,
            orgDepartments: org?.deptCount,
            createdBy: org?.createdBy,
            createdAt: org?.createdAt,
            updatedBy: org?.updatedBy,
            updatedAt: org?.updatedAt,
            deletedBy: org?.deletedBy,
            deletedAt: org?.deletedAt,
        }
    }
    private setOrganizationError (error: any) {
        return (
            { error: error } as unknown as Organization
        )
    }
}