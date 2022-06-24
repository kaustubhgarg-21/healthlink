import BaseState from "../../../core/states/baseState";
import FormState from "../../../core/states/formState";
import { Specialty } from "../../../web/models/provider/providerItems";

interface SpecialtyState extends BaseState{
    specialities: Specialty[]
    formState: FormState
    isCreated: FormState
    isUpdated: FormState
    isDeleted: FormState
}

export default SpecialtyState