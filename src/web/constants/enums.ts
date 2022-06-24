export enum ModalPrimaryMessages {
DELETE_ORGANIZATION = "Delete Organization?",
DELETE_CENTER = "Delete Center?",
DELETE_USER = "Delete User",
UNASSIGN_USERS ="Unassign User?",
ASSIGN_HUB = "Assign new hub?",
RESET_PASSWORD = "Reset Password?",
DELETE_DEPARTMENT = "Delete Department",
UPDATE = "Import Error",
SETUP_CONSULTATION = "Setup Consultation?",
ENTITY_ADDED = "{0}",
UNASSIGN_USER = "Send request to unassign",
DELETE_SPECIALTY = "Delete Specialty",
DELETE_PAYER = "Delete Payer",
DELETE_SCHEDULE = "Delete Schedule",
DELETE_ROLE = "Delete Role?",
NO_USER_FOUND = "No user found for requested email",
UPLOAD_USERS = "Uploaded users",
NOT_FOUND = "User Not Found",
SCH_CONFLICT = "Schedule Conflict / Overlap"
}

export enum UnsavedChangesWarnModal {
    TITLE = "Are You Sure You Want To Exit This Page",
    CONTENT = "Changes Will Be Discarded",
    DISCARD_BTN_TEXT = "Cancel",
    CONFIRM_BTN_TEXT = "Confirm"
}

export enum ModalSecondaryMessages {
  DELETE_ORGANIZATION = "Are you sure you want to delete {0}?",
  UNASSIGN = "Are you sure you want to unassign the {0}?",
  DELETE_USER = "Delete User?",
  RESET_THE_PASSWORD = "Are you sure you want to reset the password {0}?",
  DELETE_CENTER = "Delete Center?",
  NEW_ASSIGN_HUB = "Previous hub will be deactivated on assigning new hub.",
  DELETE_DEPARTMENT = "Delete Department",
  ENTITY_ADDED = "Added Successfully",
  CONTACT_ADMIN = "Please contact your admin for changing the password",
  PASSWORDCHANGE = "Password Changed Successfully",
  ENTITY_UPDATED = "Updated Successfully",
  ENTITY_USER = "ENTITY_USER",
  UPDATE_ERROR = "Cannot import more than 100 users",
  ENTITY_INVITED = "Invited Successfully",
  DELETE_ROLE = "Are you sure you want to delete {0}?"
}

export enum ModalType {
    SUCCESS = "success",
    WARN = "warn"
}

export enum ModalCallBackTypes {
    CANCEL = "Cancel",
    DELETE = "Delete",
    OK= "ok",
    UNASSIGN = "Unassign",
    SAVE = "Save",
    CONTINUE = "Continue",
    Confirm = "Confirm",
    AddProvider = "Add Provider"
}

export enum OrganizationTypeCodes {
    organization = "ORG",
    centre = "CENTRE",
    department = "DEPT" 
}
export enum UserRoles {
    SUPER_ADMIN = "Platform Super Admin",
    PLATFORM_ADMIN = "Platform Admin",
    ORG_ADMIN = "Organization Admin",
    PROVIDER = "Provider",
    PATIENT = "Patient",
    FAMILY = "Family"
}
export enum CommonIcons {
    reset = "restart_alt",
    add = "add_circle_outline",
    login = "login",
    lock = "lock",
    resetPassword = "lock_open",
    delete="delete",
    search="search",
    upload = "upload_file",
    unlock ="lock_open",
    schedule= "schedule",
    calendar="event_available",
    perContactCalender = "perm_contact_calendar",
    report ="summarize",
    menu = "apps",
    group="group",
    calendarToday= "today",
    calendarMonth = "calendar_month",
    calendarWeek = "date_range",
    calendarCheck = "fact_check",
    settings = "settings",
    logout="logout",
    plus="add"
}

export enum Biometricname {
    BP = "bloodpressure",
    GLUCO = "glucose",
    SPIRO = "spirometry",
    WEIGHT = "weight",
    TEMPRATURE = "temperature",
    PULSE = "pulseox"
}
export enum PatientDetailIcons{
    BD="Biometric Dashboard",
    PR="Patient Review",
    PI="Patient Information",
    MngThresholds="Manage Thresholds",
    Mngscheduls="Manage Schedules",
    Reports="Reports"
}

export enum Months {
    Jan,
    Feb,
    Mar,
    Apr,
    May,
    Jun,
    Jul,
    Aug,
    Sep,
    Oct,
    Nov,
    Dec
}
export enum PermissionTypes {
    CREATE = 'create',
    EDIT = 'edit',
    DELETE = 'delete',
    VIEW = 'read',
  }

  export enum  APIResponseError {
      UNAUTHORIZED = "UnauthorizeError",
      NOT_FOUND = "NotFoundError",
      ALREADY_EXIST = "AlreadyExistsError",
      BAD_REQUEST = "BadRequestError"
  }

export enum PercentageTypes {
    singleDay = "intraPerc",
    twoDay = "twoDayPerc",
    fiveDay = "fiveDayPerc",
    fourteenDay = "fourteenDayPerc",
    thirtyDay = "thirtyDayPerc",
    adherence = "adherence", 
    compliance = "compliance"

}

export enum ProviderGroups {
    provider = "Provider",
    careTeam = "Care Team", 
    payer = "Payer/Other",
    others = "Other"
}
export enum eventDeliveryModeCode {
    EMAIL_DELIVERY = "email",
    SMS_DELIVERY = "sms",
    WEB_DELIVERY = "web",
  }

  export enum LocalStorageKeys {
    IP = "ipAddress",
    LAST_ACTIVE = "lastActivityTime",
    USER_ID = "userId",
    REF_TOKEN = "refresh-token",
    ACC_TOKEN = 'access-token',
    ID_TOKEN = 'id-token'
  }

  export enum ReviewActionTypes {
    RECALL = "recallPatient",
    ENGAGE = "engagePatient",
    EMFOLLOWUP = "emFollowUp",
    EMAILFOLLOWUP = "emailFollowUp"
  }
  export enum TermsAndConditionFileName {
      TERMSCONDITION = "termsConditions",
      PRIVACYPOLICY = "privacypolicy",
      AGREEMENTPOLICY = "agreementPolicy"
  }

  export enum CriticalityColorCodes {
      CRITICAL = "#DC143C",
      NON_CRITICAL = "#4CAF50",
      MISSED_READING = "#626262",
      FUTURE_READING = "#000099"
  
}
