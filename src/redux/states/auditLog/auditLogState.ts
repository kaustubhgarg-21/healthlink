import BaseState from "../../../core/states/baseState";
import FormState from "../../../core/states/formState";
import Auditlog from "../../../web/models/auditlog/auditlog";

interface AuditLogState extends BaseState{
auditLog: Auditlog[] | []
}
export default AuditLogState;