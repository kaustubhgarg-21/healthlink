import { message } from "antd";
import BaseService from "../../../core/service/baseService";
import { getAPIBaseUrl } from "../../../environment/api";
import { PortalModule } from "../../../environment/apiEnvironment";
import { APIResponseError, Biometricname } from "../../constants/enums";
import { provider } from "../../images";
import Adherence from "../../models/adherence/adherence";
import Family from "../../models/patient/family";
import Patient from "../../models/patient/patient";
import PatientReview from "../../models/patient/patientReview";
import RelationShip from "../../models/patient/relationShip";
import Payer from "../../models/payer/payer";
import Provider from "../../models/provider/provider";
import User from "../../models/users/user";

export class PatientService extends BaseService {
  constructor() {
    super(getAPIBaseUrl(PortalModule.PATIENT));
  }
  async fetchPatients(params?: any): Promise<Patient[] | any> {
    let endpoint = `${PortalModule.PATIENT}`;
    if (params?.organization) {
      endpoint = `${endpoint}?organisation=${params.organization}`;
    }

    if (params?.limit) {
      endpoint = `${endpoint}&limit=${params.limit}`;
    }
    if (params?.page) {
      endpoint = `${endpoint}&page=${params.page}`;
    }

    const response = await this.get(endpoint);
    if (response.data.statusCode === 1) {
      const { result } = response.data;
      const patients = this.setPatientListData(result.rows);
      return { count: result.count, patientList: patients };
    } else {
      return null;
    }
  }

  async fetchProviderOfPatient(params: any): Promise<Patient[] | any> {
    const { id } = params;
    let endpoint = `${PortalModule.PATIENTPROVIDER}/${id}`;
    const response = await this.get(endpoint);
    if (response.data.statusCode === 1) {
      const { result } = response.data;
      const patients = this.setProviderList(result);
      return patients;
    } else {
      return null;
    }
  }

  async createPatient(patientDetails: any): Promise<Patient | any> {
    const response = await this.post(
      `${PortalModule.USER}/patient`,
      patientDetails
    );
    if (response.data.statusCode == 1) {
      const { result } = response.data;
      var patient = this.setUpdatePatient(result);
      return patient;
    } else if (response.data?.error) {
      const error = response.data?.error;
      if (error && error.errType) {
        const orgData = this.setPatientError(this.getErrorMessage(error));
        return orgData;
      }
    }
  }

  // async unAssignProviderOfPatient(patientDetails: any): Promise<Patient | any> {
  //  console.log(patientDetails,83)
  //   var {id}= patientDetails
  //   var x = {
  //     patientId : patientDetails?.patientId

  //   }
  //   console.log(patientDetails,87);
  // console.log(x,88);
  //   const response = await this.delete(`${PortalModule.UNASSIGN}/${PortalModule.PROVIDER}/${id}`, {data: x})
  //   if (response.data.statusCode == 1) {
  //       const { result } = response.data
  //       // var unAsssignProvider = this.setProviderList(result)
  //       return result
  //   } else if (response.data?.error) {
  //     // const error = response.data?.error;
  //         const errors = response.data;

  //     if (
  //       errors
  //     ) {
  //       const orgData = this.setPatientError(

  //         this.getPaitentErrorMessage(errors)
  //       );
  //       return orgData;
  //     }
  //   }
  // }

  async unAssignProviderOfPatient(patientDetails: any): Promise<Patient | any> {
    var { id } = patientDetails;
    console.log(patientDetails, 116);
    var x = {
      patientId: patientDetails?.patientId,
    };
    console.log(x, 120);
    const response = await this.delete(
      `${PortalModule.UNASSIGN}/${PortalModule.PROVIDER}/${id}`,
      { data: x }
    );
    if (response.data.statusCode == 1) {
      const { result } = response.data;
      // var unAsssignProvider = this.setProviderList(result)
      return result;
    } else if (response.data?.error) {
      const error = response.data?.error;
      //  const errors = response.data;

      if (error && error.errType) {
        const orgData = this.setPatientError(this.getErrorMessage(error));
        return orgData;
      }
    }
  }

  async unAssignPayerOfPatient(patientDetails: any): Promise<Patient | any> {
    var { id } = patientDetails;
    var y = {
      patientId: patientDetails?.patientId,
    };
    patientDetails = { patientId: patientDetails.id };
    const response = await this.delete(
      `${PortalModule.UNASSIGN}/${PortalModule.PAYER}/${id}`,
      { data: y }
    );
    if (response.data.statusCode == 1) {
      const { result } = response.data;
      // var unAsss(result)
      return result;
    } else if (response.data?.error) {
      const error = response.data?.error;
      //  const errors = response.data;

      if (error && error.errType) {
        const orgData = this.setPatientError(this.getErrorMessage(error));
        return orgData;
      }
    }
  }

  async unAssignFamilyOfPatient(patientDetails: any): Promise<Patient | any> {
    var { id } = patientDetails;
    var z = {
      organisationId: patientDetails?.organisationId,
    };
    patientDetails = { patientId: patientDetails.id };
    const response = await this.delete(
      `${PortalModule.UNASSIGN}/${PortalModule.FAMILY}/${id}`,
      { data: z }
    );
    if (response.data.statusCode == 1) {
      const { result } = response.data;
      // var unAsss(result)
      return true;
    } else if (response.data?.error) {
      const error = response.data?.error;
      if (error) {
        const orgData = this.setPatientError(this.getErrorMessage(error));
        return orgData;
      }
    }
  }

  async updatePatient(patientDetails: any): Promise<Patient | any> {
    const { id } = patientDetails;
    delete patientDetails.username; //to be remove after demo
    const response = await this.put(
      `${PortalModule.USER}/patient/${id}`,
      patientDetails
    );
    if (response.data.statusCode == 1) {
      const { result } = response.data;
      var patient = this.setUpdatePatient(result);
      return patient;
    } else if (response.data?.error) {
      const error = response.data?.error;
      if (error && error.errType) {
        const orgData = this.setPatientError(this.getErrorMessage(error));
        return orgData;
      }
    }
  }

  async createFamily(familyDetails: any): Promise<Patient | any> {
    const response = await this.post(
      `${PortalModule.USER}/${PortalModule.FAMILY}`,
      familyDetails
    );
    if (response.data.statusCode == 1) {
      const { result } = response.data;
      return result;
    } else if (response.data?.error) {
      const error = response.data?.error;
      if (error && error.errType) {
        const orgData = this.setPatientError(this.getErrorMessage(error));
        return orgData;
      }
    }
  }

  async assignFamily(familyAssignDetails: any): Promise<Patient | any> {
    const response = await this.post(
      `${PortalModule.ASSIGN}/${PortalModule.FAMILY}`,
      familyAssignDetails
    );
    if (response.data.statusCode == 1) {
      const { result } = response.data;
      return result;
    } else if (response.data?.error) {
      const error = response.data?.error;
      if (error) {
        const orgData = this.setPatientError(this.getErrorMessage(error));
        return orgData;
      }
    }
  }

  async createPatientReview(reviewDetails: any): Promise<PatientReview | any> {
    const response = await this.post(
      `${PortalModule.PATIENTREVIEWS}`,
      reviewDetails
    );
    if (response.data.statusCode == 1) {
      const { result } = response.data;
      return result;
    } else if (response.data?.error) {
      const error = response.data?.error;
      if (error && error.errType) {
        const orgData = this.setPatientError(this.getErrorMessage(error));
        return orgData;
      }
    }
  }

  async getPatientReview(patientDetails: any): Promise<PatientReview | any> {
    const { id } = patientDetails;
    var query: any = {};
    if (patientDetails?.patientId) {
      query["patientId"] = patientDetails?.patientId;
    }
    if (patientDetails?.providerId) {
      query["providerId"] = patientDetails?.providerId;
    }
    if (patientDetails?.startDate) {
      query["startDate"] = patientDetails?.startDate;
    }
    if (patientDetails?.endDate) {
      query["endDate"] = patientDetails?.endDate;
    }
    const response = await this.get(`${PortalModule.PATIENTREVIEWS}`, {
      params: query,
    });
    if (response.data.statusCode == 1) {
      const { result } = response.data;
      var reviewHistory = this.setReviewHistoryData(result?.rows);
      return reviewHistory;
    } else {
      return null;
    }
  }

  async updateFamily(userDetails: any): Promise<Patient | any> {
    var { id } = userDetails;
    delete userDetails.username; //to be remove after demo
    const response = await this.put(
      `${PortalModule.USER}/${PortalModule.FAMILY}/${id}`,
      userDetails
    );
    if (response.data.statusCode == 1) {
      const { result } = response.data;
      var updatedUser = this.setUpdateFamily(result);
      return updatedUser;
    }else if (response.data?.error) {
      const error = response.data?.error;
      if (error && error.errType) {
        const orgData = this.setPatientError(this.getErrorMessage(error));
        return orgData;
      }
    }
  }

  async fetchFamilyById(familyDetails: any): Promise<User | any> {
    const { id } = familyDetails;
    const response = await this.get(
      `${PortalModule.USER}/${PortalModule.FAMILY}/${id}`
    );
    if (response.data.statusCode == 1) {
      const { result } = response.data;
      console.log("XXXXXXXX >>>>>>>>", this.setUpdateFamily(result));
      var family = this.setUpdateFamily(result);
      return family;
    } else {
      return null;
    }
  }
  async fetchFamily(patient: any): Promise<Family[] | any> {
    const { id } = patient;
    const response = await this.get(`patientFamily?patientId=${id}`);
    if (response.data.statusCode == 1) {
      const { result } = response.data;
      var family = this.setFamilyData(result?.rows[0]?.families);
      return family;
    } else {
      return null;
    }
  }

  async assignProviderToPatients(patientDetails: any): Promise<Patient | any> {
    const response = await this.post(
      `${PortalModule.PATIENT}/assign/user`,
      patientDetails
    );
    if (response.data.statusCode == 1) {
      const { result } = response.data;
      return result;
    } else if (response.data?.error) {
      const error = response.data?.error;
      if (error && error.errType) {
        const orgData = this.setPatientError(this.getErrorMessage(error));
        return orgData;
      }
    }
  }

  async fetchSinglePatient(patientId: any): Promise<Patient | any> {
    const response = await this.get(
      `${PortalModule.USER}/patient/${patientId}`
    );
    if (response.data.statusCode == 1) {
      const { result } = response.data;
      var patient = this.setUpdatePatient(result);
      return patient;
    } else {
      return null;
    }
  }

  async assignPayerToPatients(patientDetails: any): Promise<Patient | any> {
    const response = await this.post(
      `${PortalModule.PATIENT}/assign/user`,
      patientDetails
    );
    if (response.data.statusCode == 1) {
      const { result } = response.data;
      return result.rows;
    } else if (response.data?.error) {
      const error = response.data?.error;
      if (error && error.errType) {
        const orgData = this.setPatientError(this.getErrorMessage(error));
        return orgData;
      }
    }
  }
  async assignHubToPatients(patientDetails: any): Promise<Patient | any> {
    const response = await this.post(`${PortalModule.HUB}`, patientDetails);
    if (response.data.statusCode == 1) {
      const { result } = response.data;
      return result;
    } else if (response.data?.error) {
      const error = response.data?.error;
      if (error && error.errType) {
        const orgData = this.setPatientError(this.getErrorMessage(error));
        return orgData;
      }
    }
  }
  async fetchHubPatients(params: any): Promise<Patient[] | any> {
    const { id } = params;
    let endpoint = `${PortalModule.HUB}?patientId=${id}`;

    const response = await this.get(endpoint);
    if (response.data.statusCode === 1) {
      const { result } = response.data;
      return result.rows;
    } else {
      return null;
    }
  }

  async fetchDevicePatients(params: any): Promise<Patient[] | any> {
    const { id } = params;
    let endpoint = `${PortalModule.DEVICE}?patientId=${id}`;

    const response = await this.get(endpoint);
    if (response.data.statusCode === 1) {
      const { result } = response.data;
      return result.rows;
    } else {
      return null;
    }
  }

  async fetchPatientPayers(params: any): Promise<Patient[] | any> {
    const { id } = params;
    let endpoint = `${PortalModule.PATIENT}Payer/${id}`;
    const response = await this.get(endpoint);
    if (response.data.statusCode === 1) {
      const { result } = response.data;
      const payers = this.setPatientPayer(result);
      return payers;
    } else {
      return null;
    }
  }
  private getUniqueCenters(finalResult: any, user: any) {
    const res = user?.userRoles[0]?.centerId
      ? user?.userRoles.map((centers: any) => {
          let index = finalResult.findIndex(
            (element: any) => element?.centerId === centers?.centerId
          );
          if (index >= 0) {
            // const data = {'centerId':pId, 'departments':DptIdPId[index]?.departments.concat({'departmentId':dpt})}
            const tempDpt = finalResult[index]?.departments;
            const tempDpt2 = tempDpt.concat({
              departmentId: centers?.departmentId,
            });

            const unique = [
              ...new Map(
                tempDpt2.map((item: any) => [item["departmentId"], item])
              ).values(),
            ];
            finalResult.splice(index, 1);
            finalResult.push({
              centerId: centers?.centerId,
              departments: unique,
            });
          } else {
            finalResult.push({
              centerId: centers?.centerId,
              departments: [{ departmentId: centers?.departmentId }],
            });
          }
        })
      : [];
    return finalResult;
  }

  async fetchProviderPatients(provider: any): Promise<Patient[] | any> {
    const { id } = provider;
    let params: any = {};
    if (provider?.search) {
      params["search"] = provider?.search;
    }
    if (provider?.isCritical) {
      params["isCritical"] = provider?.isCritical;
    }
    if (provider?.isPrimary) {
      params["ispcp"] = provider?.isPrimary;
    }
    if (provider?.isCompliant) {
      params["isCompliant"] = provider?.isCompliant;
    }
    if (provider?.organisation) {
      params["orgId"] = provider?.organisation;
    }
    if (provider?.currentDate.date) {
      params["date"] = provider?.currentDate.date;
    }

    let endpoint = `${PortalModule.PROVIDERPATIENT}/${id}`;
    const response = await this.get(endpoint, { params: params });
    if (response.data.statusCode === 1) {
      const { result } = response.data;
      const patients = this.setPatientListData(result);
      return { patientList: patients };
    } else {
      return null;
    }
  }
  async fetchRelationship(): Promise<any> {
    const response = await this.get(`${PortalModule.RELATIONSHIP}`);
    if (response.data.statusCode === 1) {
      const { result } = response.data;
      var rel = this.setRelationList(result.rows);
      return rel;
    } else {
      return null;
    }
  }

  private setReviewHistoryData(data: any) {
    const reviewlist: PatientReview[] = data.map((review: any) => {
      return {
        id: review?.id,
        patientId: review?.patientId,
        providerId: review?.providerId,
        action: review?.action,
        diagnosis: review?.diagnosis,
        cptCode: review?.cptCode,
        drgCode: review?.drgCode,
        patientReviewnote: review?.patientReviewnote,
        emailMessage: review?.emailMessage,
        email: review?.email,
        recordTime: review?.recordTime,
        providerName: review?.providerName,
        patientName: review?.patientName,
        createdAt: review?.createdAt,
        updatedAt: review?.updatedAt,
        deletedAt: review?.deletedAt,
      };
    });
    return reviewlist;
  }

  private setPatientListData(data: any[]) {
    const processedList: Patient[] = data.map((patient: any) => {
      return {
        // summary: patient?.patientAdherence[0]?.summary,
        patientAdherence: patient?.patientAdherence[1],
        id: patient?.specificData?.id,
        isCritical: patient?.specificData?.isCritical
          ? patient?.specificData?.isCritical
          : {},
        title: patient?.specificData?.title,
        firstName: patient?.specificData?.firstName,
        username: patient?.specificData?.username,
        middleName: patient?.specificData?.middleName,
        lastName: patient?.specificData?.lastName,
        imageUrl: patient?.specificData?.imageUrl,
        status: patient?.specificData?.status,
        contactNumber: patient?.specificData?.contactNumber,
        email: patient?.specificData?.email,
        timezone: patient?.specificData?.timezone,
        zipCode: patient?.specificData?.zipCode,
        notes: patient?.specificData?.notes,
        pcpId: patient?.specificData?.pcpId,
        gender: patient?.specificData?.gender,
        dob: patient?.specificData?.dob,
        age: patient?.specificData?.age,
        preferredCommumnication: patient?.specificData?.preferredCommumnication,
        mrn: patient?.specificData?.mrn,
        time: patient?.specificData?.time,
        createdBy: patient?.specificData?.createdBy,
        createdAt: patient?.specificData?.createdAt,
        updatedBy: patient?.specificData?.updatedBy,
        updatedAt: patient?.specificData?.updatedAt,
        deletedBy: patient?.specificData?.deletedBy,
        deletedAt: patient?.specificData?.deletedAt,
        devices: this.setPatientAdherenceData(
          patient?.patientAdherence?.devices
        ),
        summary: this.setPatientAdherenceData(
          patient?.patientAdherence?.summary
        ),
        payor: patient?.payer,
      };
    });
    return processedList;
  }

  private setPatientAdherenceData(data: any[]) {
    const processedList: any = {
      [Biometricname.BP]: data?.find(
        (data) => data?.biometricName == Biometricname.BP
      ),
      [Biometricname.WEIGHT]: data?.find(
        (data) => data?.biometricName == Biometricname.WEIGHT
      ),
      [Biometricname.GLUCO]: data?.find(
        (data) => data?.biometricName == Biometricname.GLUCO
      ),
      [Biometricname.PULSE]: data?.find(
        (data) => data?.biometricName == Biometricname.PULSE
      ),
      [Biometricname.SPIRO]: data?.find(
        (data) => data?.biometricName == Biometricname.SPIRO
      ),
      [Biometricname.TEMPRATURE]: data?.find(
        (data) => data?.biometricName == Biometricname.TEMPRATURE
      ),
      ["isCritical"]: data?.find(
        (data) => data?.biometricName == Biometricname.BP
      )?.isCritical,
    };
    return processedList;
  }

  private setUpdatePatient(patient: any) {
    var x = {
      id: patient?.id,
      title: patient?.title,
      firstName: patient?.firstName,
      username: patient?.username,
      middleName: patient?.middleName,
      lastName: patient?.lastName,
      imageUrl: patient?.imageUrl,
      status: patient?.status,
      contactNumber: patient?.contactNumber,
      mobileNumber: patient?.mobileNumber,
      email: patient?.email,
      timezone: patient?.timezone,
      notes: patient?.notes,
      pcpId: patient?.pcpId,
      gender: patient?.gender,
      address1: patient?.address1,
      roleId: patient?.roleId,
      address2: patient?.address2,
      city: patient?.city,
      state: patient?.state,
      country: patient?.country,
      zipCode: patient?.zipCode,
      dob: patient?.dob,
      age: patient?.age,
      password: patient?.password,
      preferredCommumnication: patient?.preferredCommumnication,
      mrn: patient?.mrn,
      time: patient?.time,
      createdBy: patient?.createdBy,
      createdAt: patient?.createdAt,
      updatedBy: patient?.updatedBy,
      updatedAt: patient?.updatedAt,
      deletedBy: patient?.deletedBy,
      deletedAt: patient?.deletedAt,
    };
    return x;
  }
  private setRelationList(data: any[]) {
    var items: RelationShip[] = data.map((x) => {
      return {
        id: x?.id,
        name: x?.name,
      };
    });
    return items;
  }

  private setUpdateFamily(user: any) {
    const finalResult: any[] = [];
    return {
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
      relationshipId: user?.relationshipId,
      address1: user?.address1,
      address2: user?.address2,
      city: user?.city,
      state: user?.state,
      country: user?.country,
      zipCode: user?.zipCode,
      patientId: user?.patientId,
      relationshipName: user?.relationshipName,
      roleName: user?.organisations?.roleName,
      orgId: user?.organisations?.orgId,
      orgName: user?.organisations?.orgName,
      providerTypeName: user?.organisations?.providerTypeName,
      roleId: user?.organisations?.roleId,
      userId: user?.organisations?.userId,
      // organisations:{
      //     orgId: user?.userRoles[0]?.orgId,
      //     centers: this.getUniqueCenters(finalResult,user)
      //  },
      isPrimary: user?.isPrimary,
      // userRoles:user?.userRoles,
      createdBy: user?.createdBy,
      createdAt: user?.createdAt,
      updatedBy: user?.updatedBy,
      updatedAt: user?.updatedAt,
      deletedBy: user?.deletedBy,
      deletedAt: user?.deletedAt,
    };
  }

  // address1: "fsfsafaf"
  // address2: "dwjff"
  // city: "safasfsa"
  // contactNumber: null
  // country: "AS"
  // email: "rahulsasasasingh@innobitsystems.com"
  // firstName: "jayant"
  // id: "71f2cda5-9e2b-4678-b12e-8646ba781d8f"
  // imageUrl: ""
  // info: null
  // lastName: "james"
  // middleName: "jayant"
  // mobileNumber: "8765435678"
  // organisations:
  // centerId: null
  // createdAt: "2022-06-16T06:13:31.404Z"
  // deletedAt: null
  // departmentId: null
  // id: "67945cbc-7344-43b2-b183-bcd8298dc4c7"
  // orgId: "4de4eb5f-cc2d-4b37-addb-86ac0c7eda79"
  // orgName: "city hospitalsss"
  // providerTypeName: null
  // roleId: "5b1d93e0-411d-4126-88c6-719a78c024dd"
  // roleName: "Family"
  // updatedAt: "2022-06-16 06:13:31.404 +00:00"
  // userId: "71f2cda5-9e2b-4678-b12e-8646ba781d8f"
  // [[Prototype]]: Object
  // patientId: "360b7224-b43b-4b53-8d8a-3cf3c3ad3848"
  // relationshipId: 4
  // relationshipName: "Daughter"
  // state: "safsafas"
  // title: ""
  // username: "rahulsasasasingh@innobitsystems.com"
  // zipCode: "21111"
  private setProviderList(data: any[]) {
    var providerlist: any[] = data?.map(
      ({ address, providerData, isPcp }: any) => {
        return {
          id: providerData?.id,
          firstName: providerData?.firstName,
          middleName: providerData?.middleName,
          lastName: providerData?.lastName,
          imageUrl: providerData?.imageUrl,
          status: providerData?.status,
          contactNumber: providerData?.contactNumber,
          email: providerData?.email,
          designation: providerData?.designation,
          npiName: providerData?.npiName,
          npi: providerData?.npi,
          address1: address?.address1,
          address2: address?.address2,
          city: address?.city,
          state: address?.state,
          country: address?.country,
          zipCode: address?.zipCode,
          specialtyId: providerData?.specialtyId,
          mobileNumber: providerData?.mobileNumber,
          isPcp: isPcp,
          preferredCommunication: providerData?.preferredCommunication,
          unavailableFromDate: providerData?.unavailableFromDate,
          unavailableToDate: providerData?.unavailableToDate,
          providerTypeId: providerData?.providerTypeId,
          providerOrgs: providerData?.providerOrgs,
          providerTypeList: providerData?.providerTypeList,
          specialtyList: providerData?.specialtyList,
          username: providerData?.username,
          providerType: providerData?.providerTypeList?.name,
          specialtyType: providerData?.specialtyList?.name,
          group: providerData?.providerTypeList?.group,
        };
      }
    );

    return providerlist;
  }
  private setFamilyData(data: any[]) {
    //TO Change after Demo.
    const processedList: Family[] = data.map((familyMember: any) => {
      return {
        id: familyMember?.id,
        firstName: familyMember?.details?.firstName,
        lastName: familyMember?.details?.lastName,
        middleName: familyMember?.details?.middleName,
        address1: familyMember?.details?.addresses[0].address1,
        city: familyMember?.details?.addresses[0].city,
        country: familyMember?.details?.addresses[0].country,
        state: familyMember?.details?.addresses[0].state,
        relation: familyMember?.relationshipList?.name,
        username: familyMember?.details?.username,
        status: familyMember?.details?.status,
        contactNumber: familyMember?.details?.contactNumber,
        mobileNumber: familyMember?.details?.mobileNumber,
        email: familyMember?.details?.email,
      };
    });
    return processedList;
  }

  // this function will fetch adherence of a patient by patientId and assigneeId
  async fetchAdherenceByPatientByAssignee(data: any): Promise<any> {
    try {
      let params: any = {};

      if (data?.patientId) {
        params["patientId"] = data?.patientId;
      }

      if (data?.assigneeId) {
        params["assigneeId"] = data?.assigneeId;
      }

      if (data?.startDate) {
        params["startDate"] = data?.startDate;
      }

      if (data?.endDate) {
        params["endDate"] = data?.endDate;
      }
      const response = await this.get(`healthSummary`, { params: params });
      if (!response) return Promise.reject([]);
      return Promise.resolve(response?.data?.result);
    } catch (err: any) {
      return Promise.reject(null);
    }
  }

 


    async fetchComplianceByPatientByAssignee(data: any): Promise<any> {
      try {
        let params: any = {};
  
        if (data?.patientId) {
          params['patientId'] = data?.patientId
        }
  
        if (data?.assigneeId) {
          params['assigneeId'] = data?.assigneeId
        }
  
        if (data?.startDate) {
          params['startDate'] = data?.startDate
        }
  
        if (data?.endDate) {
          params['endDate'] = data?.endDate
        }
        const response = await this.get(`healthSummary/compliancePerc`, { params: params });
        if (!response) return Promise.reject([])
        return Promise.resolve(response?.data?.result);
  
      } catch (err: any) {
        return Promise.reject(null)
      }}

private setPatientPayer(data: any[]){ //TO Change after Demo. 
  const processedList: Payer[] = data.map(({specificData,isPrimary}: any) => {
    return {
      id: specificData?.id,
     companyName: specificData?.companyName,
     city: specificData?.city,
     state: specificData?.state,
     contactName: specificData?.contactName,
     contactNumber: specificData?.contactNumber,
     mobileNumber: specificData?.mobileNumber,
     email: specificData?.email,
     isPrimary: isPrimary
    };
  });
  return processedList;
  }

  private getErrorMessage = (err: any) => {
    let error = "";
    if (err.errType == APIResponseError.BAD_REQUEST) {
      if (
        err.message ==
        "This is Primary Payer of the Patient Please Provide ReplacementId "
      ) {
        error =
          "Can not unassign primary payor, please select another primary payor to unassign this payor.";
      } else if (
        err.message ==
        "Provider is the PCP of patient Please Provide ReplacementID"
      ) {
        error =
          "can not unassign PCP, Please select another PCP to unassign this provider";
      }
    } else {
      error = err.message;
    }
    return error;
  };

  private getPaitentErrorMessage = (err: any) => {
    let error = "";
    error = err;
    return error;
  };

  private setPatientError(error: any) {
    return { error: error } as unknown as Patient;
  }
}
