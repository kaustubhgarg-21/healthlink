import BaseState from "../../../core/states/baseState";
import FormState from "../../../core/states/formState";
import Notification from "../../../web/models/notification/notification";


export interface NotificationState extends BaseState {
    formState: FormState
  readonly notifications:Notification[];
 
}