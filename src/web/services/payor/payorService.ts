import BaseService from "../../../core/service/baseService";
import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apiEnvironment";
import { PayerDetails } from "../../components/containers/payer/payerDetail";
import Payer from "../../models/payer/payer";
import Permission from "../../models/permission/permission";
import Role from "../../models/roles/role";

export class PayerService extends BaseService {
    constructor() {
        super(getAPIBaseUrl(PortalModule.ROLE))
    }   
    async fetchPayers(params?: any): Promise<Role[] | any> {
        let endpoint = `${PortalModule.PAYER}`
        var query:any = {}
        if (params?.organizationId) {
            query["organisationId"] = params.organizationId
        }
        if (params?.search) {
            query["search"] = params.search
        }
        const response = await this.get(endpoint, {params: query})
        if (response.data.statusCode === 1) {
            const { result } = response.data
            const payers = this.setPayerData(result.rows)
            return { count: result.count, payers: payers}
        } else {
            return null
        }
    }

    async createPayer(params: any): Promise<Payer[] | any> {
        let endpoint = `${PortalModule.PAYER}`
        const response = await this.post(endpoint, params)
        if (response.data.statusCode === 1) {
            const { result } = response.data
            return result 
        } else if (response.data?.error) {
            const error = response.data?.error;
            if (
              error &&
              error.errType
            ) {
              const orgData = this.setPayerError(
        
                this.getErrorMessage(error)
              );
              return orgData;
            }
          } 
    }

    async deletePayer(params:any): Promise<Payer[] | any> {
        var {id}= params
        const response = await this.delete(`${PortalModule.PAYER}/${id}`)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            return result
        } else {
            return null
        }
    }

    async updatePayer(params:any): Promise<Payer[] | any> {
        var {id} = params
        const response = await this.put(`${PortalModule.PAYER}/${id}`,params)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            var updatedUser = this.setUpdatePayer(result)
            return updatedUser
        } else if (response.data?.error) {
            const error = response.data?.error;
            if (
              error &&
              error.errType
            ) {
              const orgData = this.setPayerError(
        
                this.getErrorMessage(error)
              );
              return orgData;
            }
          } 
    }

    private setPayerData(data: any[]) {
        const processedList: Payer[] = data.map((payer: any) => {
            return (
                {
                    id: payer?.id,
                    companyName:  payer?.companyName,
                    contactName:  payer?.contactName,
                    contactNumber:  payer?.contactNumber,
                    mobileNumber:  payer?.mobileNumber,
                    email: payer?.email,
                    address1:  payer?.address1,
                    address2:  payer?.address2,
                    city:  payer?.city,
                    state:  payer?.state,
                    country:  payer?.country,
                    zipCode:  payer?.zipCode,
                }
            )
        })
        return processedList
    }

    private setUpdatePayer(payer:any) {
        return {
            id: payer?.id,
            companyName:  payer?.companyName,
            contactName:  payer?.contactName,
            contactNumber:  payer?.contactNumber,
            mobileNumber:  payer?.mobileNumber,
            email: payer?.email,
            address1:  payer?.address1,
            address2:  payer?.address2,
            city:  payer?.city,
            state:  payer?.state,
            country:  payer?.country,
            zipCode:  payer?.zipCode,
        
        } 
            
    }

    private getErrorMessage = (err: any) => {
        let error = "";
        error= err.message
       return error;
      }

    private setPayerError (error: any) {
        return (
            { error: error } as unknown as Payer
        )
      }
}