import BaseState from "../../../core/states/baseState";
import FormState from "../../../core/states/formState";
import Alert from "../../../web/models/alert/alert"
interface AlertState extends BaseState {
    alerts: Alert[] | [],
    formState: FormState,
   
}

export default AlertState