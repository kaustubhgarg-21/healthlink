import BaseState from "../../../core/states/baseState";
import FormState from "../../../core/states/formState";
import Organization from "../../../web/models/organization/organizaton";

interface OrganizationState extends BaseState {
    organizations: Organization[] | [],
    organizatonsCount: number,
    selectedOrganization: Organization,
    isUpdated: FormState,
    isDeleted: FormState,
    isCreated: FormState,
    adminCount: number,
    familyCount: number,
    providerCount: number,
    patientCount: number,
    
}

export default OrganizationState