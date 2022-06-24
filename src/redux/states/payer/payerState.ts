import BaseState from "../../../core/states/baseState";
import FormState from "../../../core/states/formState";
import Payer from "../../../web/models/payer/payer"
interface PayerState extends BaseState {
    payers: Payer[] | [],
    payerCount: number,
    formState: FormState,
    isDeleted: FormState,
    selectedPayer: Payer | null,
    isUpdated: FormState,
   unAssigned: FormState
}

export default PayerState