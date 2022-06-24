import ChangePassword from "../components/containers/auth/changePassword";
import CreatePassword from "../components/containers/auth/createPassword";

import Login from "../components/containers/auth/login";
import { Demo } from "../components/stateless/demo";
import ForgetPassword from "../components/containers/auth/forgetPassword";
import ResetPassword from "../components/containers/auth/resetPassword";
import OrganisationList from "../components/containers/organisation/organisationListing";
import AddOrganisation from "../components/containers/organisation/addOrganisation";
import { OrganisationDetails } from "../components/containers/organisation/organisationDetails";
import UserList from "../components/containers/user/list";
// import UserDetails from "../components/stateless/common/form";
import UserDetailsForm from "../components/containers/user/userDetails";
import { AddUser } from "../components/containers/user/addUser";
import AddProviderForm from "../components/containers/provider/addProvider";
import { Dashboard } from "../components/containers/user/dashboard";
import { AddPatient } from "../components/containers/patient/addPatient";
import RolesListing from "../components/containers/roles/rolesListing";
import ProviderDetailsForm from "../components/containers/provider/providerDetails";
import CreateCustomRole from "../components/containers/roles/createCustomRole.tsx";
import { SpecialityList} from "../components/containers/speciality";
import CreatePayer from "../components/containers/payer/createPayer";
import PatientListing from "../components/containers/patient/patientListing";
import { SearchProviders } from "../components/containers/provider/searchProvider";
import PatientThreshold from "../components/containers/patient/patientThreshold";
import { PatientReadings } from "../components/containers/patient/patientReadings";
import EditCustomRole from "../components/containers/roles/editCustomRole";
import { Schedules } from "../components/containers/patient/schedules";
import { AdherenceReview } from "../components/containers/patient/adherenceReview";
import { PatientDetails } from "../components/containers/patient/patientDetails";
import { AdherenceCalender } from "../components/containers/patient/adherenceView";
import { ProviderList } from "../components/containers/provider/providerList";
import { PayerList } from "../components/containers/payer/payerListing";
import { RoleDetails } from "../components/containers/roles/roleDetails";
import ComplianceReview from "../components/containers/patient/complianceReview";
import { AccountSetting } from "../components/containers/user/accountSetting";
import Notification from "../components/containers/notification/index"
import { PayerDetails } from "../components/containers/payer/payerDetail";
import AuditLog from "../components/containers/auditLog";
import ImportUser from "../components/containers/importUser";
import { AgreementPolicy } from "../components/containers/auth/agreementPolicy";

export enum AppRoutes {
  LOGIN = "/login",
  CHANGEPASSWORD = "/changepassword",
  CREATEPASSWORD="/createPassword",
  FORGETPASSWORD = "/forgetpassword",
  RESETPASSWORD = "/resetpassword",
  AGREEMENTPOLICY = "/policy",

  LANDING = "/user/landing",
  USERLIST = "/user/platformUsers",
  USERDETAILSFORM = "/user/details",
  ADDUSER = "/user/add",
  IMPORTUSER= "/user/import",

  ORGANIZATIONLIST = "/organization/list",
  ADDORGANIZATION = "/organization/add",
  AUDITLOG = "/organization/auditLogs",
  ORGANIZATIONDETAILS = "/organization/details",

  DEVICES = "/settings/devices",
  ROLES = "/settings/roles/list",
  ADDROLES = "/settings/roles/add",
  EDITROLE = "/settings/roles/edit",
  ROLEDETAILS = "/settings/roles/details",

  HIE = "/settings/hieManagement",
  SPECIALITY = "/settings/specialityManagement",

  ADDPROVIDER = "/provider/add",
  PROVIDERDETAILS = "/provider/details",
  SEARCHPROVIDER = "/provider/assign",
  PROVIDERLIST = "/user/list",
  ACCOUNTSETTINGS= "/user/accountSettings",

  PATIENTLIST = "/patient/list",
  PATIENTREPORTS = "/patient/reports",
  PATIENTTHRESHOLD ="/patient/threshold",
  ADDPATIENT = "/patient/add",
  PATIENTSCHEDULE="/patient/schedule",
  ADHERENCEREVIEW="/patient/adherencereview",
  COMPLIANCEREVIEW = "/patient/compliancereview",
  PATIENTDETAILS = "/patient/details",
  PATIENTADHERENCE = "/patient/scheduleCalendar", 

  CREATEPAYER="/settings/payer/add",
  
  PAYERLIST="/settings/payer/list",
  CONTACTSUPPORT="/contactSupport",

  NOTIFICATION="/user/notification",

  EDITPAYER="/settings/payer/editPayer"

}

export const PublicRoutes = [
  {
    path: AppRoutes.LOGIN,
    component: Login,
  },
  {
    path: AppRoutes.CHANGEPASSWORD,
    component: ChangePassword,
  },
   {
    path: AppRoutes.CREATEPASSWORD,
    component: CreatePassword,
  },
  {
    path: AppRoutes.FORGETPASSWORD,
    component: ForgetPassword,
  },  
   {
    path: AppRoutes.RESETPASSWORD,
    component: ResetPassword,
  },
  {
    path:AppRoutes.AGREEMENTPOLICY,
    component:AgreementPolicy
   }
];
export const PrivateRoutes = [
  {
    routePath: "/user/:path?",
    routes: [
      {
        path: AppRoutes.LANDING,
        component: Dashboard,
      },
      { path: AppRoutes.PROVIDERLIST,
        component: ProviderList
      },
      {
        path: AppRoutes.USERLIST,
        component: UserList,
      },
      {
        path: AppRoutes.USERDETAILSFORM,
        component: UserDetailsForm,

        },
        {
          path: AppRoutes.ADDUSER,
          component: AddUser
        },
        {
          path: AppRoutes.IMPORTUSER,
          component: ImportUser
        },
        {
          path: AppRoutes.ACCOUNTSETTINGS,
          component: AccountSetting
        },
        {
          path:AppRoutes.NOTIFICATION,
          component: Notification
         },
      ],
    },
    {
      routePath: "/organization/:path?",
      routes: [
        {
          path: AppRoutes.ORGANIZATIONLIST,
          component: OrganisationList,
        },
        {
          path: AppRoutes.AUDITLOG,
          component: AuditLog,
        },
        {
          path: AppRoutes.ORGANIZATIONDETAILS,
          component: OrganisationDetails,
        },
        {
          path: AppRoutes.ADDORGANIZATION,
          component: AddOrganisation,
        }
      ],
    },
    {
      routePath: "/provider/:path?",
      routes: [
        {
          path: AppRoutes.ADDPROVIDER,
          component: AddProviderForm,
        },
        {
          path: AppRoutes.PROVIDERDETAILS,
          component: ProviderDetailsForm,
        },
        {
          path: AppRoutes.SEARCHPROVIDER,
          component: SearchProviders
        },
         
      ]
    },
    {
      routePath: "/patient/:path?",
      routes: [
        {
          path: AppRoutes.PATIENTLIST,
          component: PatientListing,
        },
        {
          path: AppRoutes.PATIENTREPORTS,
          component: PatientReadings,
        },
        {
          path: AppRoutes.ADDPATIENT,
          component: AddPatient,
        },
        {
          path: AppRoutes.PATIENTSCHEDULE,
          component: Schedules,
        },
        {
          path: AppRoutes.ADHERENCEREVIEW,
          component: AdherenceReview
        },
        {
           path: AppRoutes.COMPLIANCEREVIEW,
           component: ComplianceReview
        },
        {
          path: AppRoutes.PATIENTTHRESHOLD,
          component: PatientThreshold,

        },
        {
          path: AppRoutes.PATIENTDETAILS,
          component: PatientDetails
        },
        {
          path: AppRoutes.PATIENTADHERENCE,
          component: AdherenceCalender
        },
        
      ],
    },
    {
      routePath: "/settings/:path?",
      routes: [
        {
          path: AppRoutes.DEVICES,
          component: Demo,
        },
        {
          path: AppRoutes.HIE,
          component: Demo,
        },
        {
          path: AppRoutes.ROLES,
          component: RolesListing,
        },

        {
          path:AppRoutes.ADDROLES,
          component: CreateCustomRole,
        },{
          path:AppRoutes.EDITROLE,
          component:EditCustomRole,
        },
        {
          path: AppRoutes.SPECIALITY,
          component: SpecialityList
        },
        {
          path: AppRoutes.ROLEDETAILS,
          component: RoleDetails
        },
        {
          path: AppRoutes.CREATEPAYER,
          component:CreatePayer,
        },
        {
          path:AppRoutes.PAYERLIST,
          component: PayerList
        },
        {
          path:AppRoutes.EDITPAYER,
          component: PayerDetails
        }
      ],
    },
    {
      routePath: "/contactSupport/:path?",
      routes: [
        {
         path:AppRoutes.CONTACTSUPPORT,
         component:Demo
        }
      ]
    }  
  ];
  
