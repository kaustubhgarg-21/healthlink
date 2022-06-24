import BaseState from "../../../core/states/baseState";
import FormState from "../../../core/states/formState";
import Provider from "../../../web/models/provider/provider";
import { ProviderType, Specialty } from "../../../web/models/provider/providerItems";

interface ProviderState extends BaseState {
    providers: Provider[] | []
    selectedProvider: Provider | null
    providerTypes: ProviderType[]
    specialities: Specialty[]
    formState : FormState
    isUpdated: FormState
    isCreated: FormState
    isAssigned: FormState
}

export default ProviderState