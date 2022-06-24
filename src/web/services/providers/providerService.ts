import BaseService from "../../../core/service/baseService";
import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apiEnvironment";

import Provider from "../../models/provider/provider";
import { ProviderType, Specialty } from "../../models/provider/providerItems";

export class ProviderService extends BaseService {
    constructor() {
        super(getAPIBaseUrl(PortalModule.PROVIDER));
    };

    async fetchProviders(params?: any): Promise<Provider[] | any> {
        var endpoint = `${PortalModule.PROVIDER}`
        var query: any = {}
        if (params?.organization) {
            // endpoint = `${endpoint}?organisation=${params.organization}`
            query["organisation"] = params?.organization
        }
        if (params?.centre) {
            // endpoint = `${endpoint}&center=${params.centre}`
            query["center"] = params?.centre
        }
        if (params?.speciality) {
            // endpoint = `${endpoint}&specialiyt=${params.speciality}`
            query["speciality"] = params?.speciality
        }
        if (params?.providerType) {
            // endpoint = `${endpoint}&providerType=${params.providerType}`
            query["providerType"] = params?.providerType
        }
        if (params?.search) {
            // endpoint = `${endpoint}&search=${params.search}`
            query["search"] = params?.search
        }
        if (params?.limit) {
            // endpoint = `${endpoint}&limit=${params.limit}`
            query["limit"] = params?.limit
        }
        if (params?.page) {
            // endpoint = `${endpoint}&page=${params.page}`
            query["page"] = params?.page
        }
        const response = await this.get(`${endpoint}`, { params: query })
        if (response.data.statusCode == 1) {
            const { result } = response.data
            const providers = this.setProviderList(result.rows)
            return providers
        } else return null
    }

    async updateProvider(updatedProvider: any): Promise<Provider | any> {
        const { id } = updatedProvider
        delete updatedProvider.username; //to be removed after demo
        var endpoint = `${PortalModule.USER}/provider/${id}`
        const response = await this.put(endpoint, updatedProvider)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            const provider = this.setUpdatedProvider(result)
            return provider
        }   else if (response.data?.error) {
            const error = response.data?.error;
            if (
              error &&
              error.errType
            ) {
              const orgData = this.setProviderError(
        
                this.getErrorMessage(error)
              );
              return orgData;
            }
          } 
    }
    async fetchProviderByID(id: any): Promise<Provider | any> {
        var endpoint = `${PortalModule.USER}/provider/${id}`
        const response = await this.get(endpoint)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            const provider = this.setUpdatedProvider(result)
            return provider
        } else if (response.data?.error) {
            const error = response.data?.error;
            if (
              error &&
              error.errType
            ) {
              const orgData = this.setProviderError(

                this.getErrorMessage(error)
              );
              return orgData;
            }
          } 
    }
    async createProvider(updatedProvider: any): Promise<Provider | any> {
        var endpoint = `${PortalModule.USER}/provider`
        const response = await this.post(endpoint, updatedProvider)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            const provider = this.setUpdatedProvider(result)
            return provider
        }   else if (response.data?.error) {
            const error = response.data?.error;
            if (
              error &&
              error.errType
            ) {
              const orgData = this.setProviderError(
        
                this.getErrorMessage(error)
              );
              return orgData;
            }
          }     }

    async fetchProviderTypes(): Promise<any> {
        const response = await this.get(`${PortalModule.PROVIDERTYPES}`)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            var types = this.serProviderItems(result.rows)
            return types
        } else return null
    }
    async fetchSpecialities(): Promise<any> {
        const response = await this.get(`${PortalModule.SPECIALITY}`)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            var list = this.serProviderItems(result.rows)
            return list
        } else return null
    }
    async assignProvider(assignedProvider: any): Promise<Provider | any> {
        var endpoint = `${PortalModule.ORGANIZATION}Assign`
        const response = await this.patch(endpoint, assignedProvider)
        if (response.data.statusCode == 1) {
            return true
        } else return null
    }
    private setProviderList(data: any[]) {
        var providerlist: Provider[] = data?.map((pro: any) => {
            return (
                {
                    id: pro?.id,
                    firstName: pro?.firstName,
                    // : pro?.addressProviders[0]?.address1,
                    middleName: pro?.middleName,
                    lastName: pro?.lastName,
                    imageUrl: pro?.imageUrl,
                    status: pro?.status,
                    contactNumber: pro?.contactNumber,
                    email: pro?.email,
                    mobileNumber: pro?.mobileNumber,
                    designation: pro?.designation,
                    npiName: pro?.npiName,
                    npi: pro?.npi,
                    address1: pro?.addressProviders[0]?.address1,
                    address2: pro?.addressProviders[0]?.address2,
                    city: pro?.addressProviders[0]?.city,
                    state: pro?.addressProviders[0]?.state,
                     country: pro?.addressProviders[0]?.country,
                    zipCode: pro?.addressProviders[0]?.zipCode,
                    specialtyId: pro?.specialtyId,
                    preferredCommunication: pro?.preferredCommunication,
                    unavailableFromDate: pro?.unavailableFromDate,
                    unavailableToDate: pro?.unavailableToDate,
                    providerTypeId: pro?.providerTypeId,
                    providerOrgs: pro?.providerOrgs,
                    providerTypeList: pro?.providerTypeList,
                    specialtyList: pro?.specialtyList,
                    username: pro?.username,
                    providerType: pro?.providerTypeList?.name,
                    specialtyType: pro?.specialtyList?.name
                }
            )
        })
        return providerlist
    }

    private setUpdatedProvider(data: any) {
        var provider: Provider = {
            id: data?.id,
            title: data?.title,
            firstName: data?.firstName,
            middleName: data?.middleName,
            lastName: data?.lastName,
            imageUrl: data?.imageUrl,
            status: data?.status,
            contactNumber: data?.contactNumber,
            mobileNumber: data?.mobileNumber,
            email: data?.email,
            designation: data?.designation,
            npiName: data?.npiName,
            npi: data?.npi,
            address1: data?.address1,
            address2: data?.address2,
            city: data?.city,
            state: data?.state,
            country: data?.country,
            zipCode: data?.zipCode,
            specialtyId: data?.specialtyId,
            password: data?.password,
            preferredCommunication: data?.preferredCommumnication,
            unavailableFromDate: data?.unavailableFromDate,
            unavailableToDate: data?.unavailableToDate,
            providerTypeId: data?.providerTypeId,
            providerOrgs: data?.providerOrgs,
            providerTypeList: data?.providerTypeList,
            specialtyList: data?.specialtyList,
            username: data?.username,
            organisations: data?.organisations,
            roleId: data?.organisations?.map((organisation: any) => { return organisation.roleId })[0]
        }
        return provider
    }

    private serProviderItems(data: any[]) {
        var items: Specialty[] | ProviderType[] = data.map((x) => {
            return (
                {
                    id: x?.id,
                    name: x?.name,
                    isCustom: x?.isCustom
                }
            )
        })
        return items
    }


    private getErrorMessage = (err: any) => {
        let error = "";
        error = err.message
        return error;
    };

    private setProviderError(error: any) {
        return (
            { error: error } as unknown as Provider
        )
    }

}