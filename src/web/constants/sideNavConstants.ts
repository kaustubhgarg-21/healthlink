import { AppRoutes } from "../router/appRoutes";
export const SideNavItems = {
    providerItems: [
        {
            title: "Dashboard",
            url: AppRoutes.LANDING,
            icon: "dashboard_customize"


        },
        {
            title: "Patients",
            url: AppRoutes.PATIENTLIST,
            icon: "people_alt"

        },
        {
            title: "Contact Support",
            url: AppRoutes.CONTACTSUPPORT,
            icon: "contact_support"

        }
    ],
    platformAdminItems: [
        {
            title: "Dashboard",
            url: AppRoutes.LANDING,
            icon: "dashboard_customize"

        },
        {
            title: "Organizations",
            url: AppRoutes.ORGANIZATIONLIST,
            icon: "device_hub"

        },
        {
            title: "Platform Users",
            url: AppRoutes.USERLIST,
            icon: "supervisor_account"

        },
        {
            title: "Audit Logs",
            url: AppRoutes.AUDITLOG,
            icon: "assessment"

        },
        {
            title: "Devices",
            url: AppRoutes.DEVICES,
            icon: "devices_other"

        },
        {
            title: "Settings",
            icon: "settings",
            children: [
                {
                    title: "Roles and Permissions",
                    url: AppRoutes.ROLES,

                },
                {
                    title: "Manage Speciality List",
                    url: AppRoutes.SPECIALITY,

                },
                {
                    title: "Manage HIE List",
                    url: AppRoutes.HIE,

                },
                {
                    title: "Manage Payer List",
                    url: AppRoutes.PAYERLIST,

                },
            ],

        },
    ],
   organizationAdminItems: [
        {
            title: "Dashboard",
            url: AppRoutes.LANDING,
            icon: "dashboard_customize"

        },
        {
            title: "My Organization",
            url: AppRoutes.ORGANIZATIONDETAILS,
            icon: "device_hub"

        },
        {
            title: "Users",
            url: AppRoutes.PROVIDERLIST,
            icon: "supervisor_account"

        },
        {
            title: "Import Users",
            url: AppRoutes.IMPORTUSER,
            icon: "group_add"

        },
        {
            title: "Roles",
            url: AppRoutes.ROLES,
            icon: "manage_accounts"

        },
    ],
    patientItems:[
        {
            title: "Home",
            url: AppRoutes.PATIENTREPORTS,
            icon: "home"

        },
        {
            title: "Contact Support",
            url: AppRoutes.CONTACTSUPPORT,
            icon: "contact_support"

        }
    ]
}