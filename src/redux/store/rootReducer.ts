import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer/authReducer";
import organizationReducer from "../reducers/organization/organizationReducer";
import patientReducer from "../reducers/patient/patientReducer";
import payerReducer from "../reducers/payer/payerReducer";
import providerReducer from "../reducers/provider/providerReducer";
import roleReducer from "../reducers/role/roleReducer";
import sideBarReducer from "../reducers/sideBarReducer";
import specialtyReducer from "../reducers/specialty/specialtyReducer";
import userReducer from "../reducers/user/userReducer";
import hrmReducer from "../reducers/hrm/hrmReducer";
import alertReducer from "../reducers/alertReducer/alertReducer";
import auditLogReducer from "../reducers/auditLog/auditLogReducer";
import notificationReducer from "../reducers/notification/notificationReducer";

const appReducer = combineReducers({
      App: sideBarReducer,
      Organization: organizationReducer,
      Auth: authReducer,
      User: userReducer,
      Role: roleReducer,
      Provider: providerReducer,
      HRMReducer: hrmReducer,
      Patients: patientReducer,
      Payer: payerReducer,
      Specialty: specialtyReducer,
      AuditLog: auditLogReducer,
      Notification: notificationReducer,
      Alert : alertReducer,
});

export type RootState = ReturnType<typeof appReducer>;
export default appReducer;