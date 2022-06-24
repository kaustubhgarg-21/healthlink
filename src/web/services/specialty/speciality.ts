import BaseService from "../../../core/service/baseService";
import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apiEnvironment";
import { APIResponseError } from "../../constants/enums";
import { Messages } from "../../constants/messages";
import Permission from "../../models/permission/permission";
import { Specialty } from "../../models/provider/providerItems";
import Role from "../../models/roles/role";

export class SpecialtyService extends BaseService {
    constructor() {
        super(getAPIBaseUrl(PortalModule.SPECIALITY))

    }

    async createSpeciality(params: any): Promise<Specialty[] | any> {
        let endpoint = `${PortalModule.SPECIALITY}`
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
              const specialtyData = this.setSpecialtyError(
                this.getErrorMessage(error)
              );
              return specialtyData;
            }
          } 
    }

    async updateSpecialty(specialty: any): Promise<Specialty | null> {
        var { id } = specialty
        const response = await this.put(`${PortalModule.SPECIALITY}/${id}`, specialty)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            var updatedRole = this.setUpdatedSpeciality(result)
            return updatedRole
        } else {
            return null
        }
    }

    async fetchSpecialities(): Promise<any> {
        const response = await this.get(`${PortalModule.SPECIALITY}`)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            var list = this.serProviderItems(result.rows)
            return list
        } else return null
    }

    async deleteSpecialty(specialtyManagement: any): Promise<Specialty | any> {
        var {id}= specialtyManagement
        const response = await this.delete(`${PortalModule.SPECIALITY}/${id}`)
        if (response.data.statusCode == 1) {
            const { result } = response.data
            return result
        } else {
            return null
        }
    }

    private setUpdatedSpeciality(speciality: any) {
        var updatedspeciality: Specialty = {
            id: speciality?.id,
            name: speciality?.name,
            isCustom: speciality?.isCustom,
        }
        return updatedspeciality
    }
    private getErrorMessage = (err: any) => {
        let error = "";
        switch (err.errType) {
          case APIResponseError.ALREADY_EXIST:
            error = Messages.SPECIALTY_EXIST;
            break;
        }
        return error;
      };
    
      private setSpecialtyError (err: any){
          var x:Specialty = {error: err} as Specialty
          return x
      }

    private serProviderItems(data: any[]) {
        var items: Specialty[] = data.map((x) => {
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
}

