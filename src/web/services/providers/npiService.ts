import BaseService from "../../../core/service/baseService";

export class NPIService extends BaseService{
    constructor() {
        super("");
      };
    
      async fetchProvider  (npiId: any):Promise<any> {
            const data = await this.get(`https://npiregistry.cms.hhs.gov/api/?number=${npiId}&version=2.0`)

            if(data){
                return data
            }
      }

}