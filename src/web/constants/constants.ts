import { Biometricname, ReviewActionTypes } from "./enums";

export const avatarColors = [
    "#AB84E1",
    "#7CDA7B",
    "#F68282",
    "#56CACC",
    "#FEB354",
    "#BDEAFF"
]

export const providerTypes = [
    {
        text:"All",
        value: null
    },
    {
        text:"Doctor",
        value: "Doctor"
    },
    {
        text:"Nurse",
        value: "nurse"
    },
]
export const statusOptions = [
    {
      text: "Active",
      value: true,
    },
    {
      text: "Inactive",
      value: false,
    },
  ];


  export const diagnosisOptions = [
    {
      text: "Diagnosis",
      value: "diagnosis",
    }
  ]

  export const drgCodeOptions= [
    {
      text: "Drgcode",
      value: "drgCode",
    }
  ]

  export const recipientEmailOptions = [
    {
      text: "demo@gmail.com",
      value: "demo@gmail.com",
    },
    {
      text: "user@gmail.com",
      value: "user@gmail.com",
    }
  ]



  export const cptCodeOptions = [
    {
      text: "Cptcode",
      value: "cptCode",
    }
  ]
  export const userStatusOptions = [
    {
      text: "Active",
      value: "active",
    },
    {
      text: "Inactive",
      value: "inactive",
    }
  ];
export const titleOptions = [
    {
        text: "Mr.",
        value: "Mr.",
      },
      {
        text: "Ms.",
        value: "Ms.",
      },
      {
        text: "Mrs.",
        value: "Mrs.",
      },
      {
        text: "Dr.",
        value: "Dr.",
      },
]

export const instructionOptions = [
  {
    text: "Before Breakfast",
    value: "Before Breakfast"
  },
  {
    text: "After Breakfast",
    value: "After Breakfast"
  },
  {
    text: "Before Lunch",
    value: "Before Lunch"
  },  
  {
    text: "After Lunch",
    value: "After Lunch"
  },
  {
    text: "Before Dinner",
    value: "Before Dinner"
  },
  {
    text: "After Dinner",
    value: "After Dinner"
  },
  {
    text: "Before Bed",
    value: "Before Bed"
  },
]

export const biometricTypeOptions = [
  {
    text: "Blood Pressure",
    value: Biometricname.BP
  },
  {
    text: "Glucometer",
    value: Biometricname.GLUCO
  },
  {
    text: "Pulse Ox",
    value: Biometricname.PULSE
  },
  {
    text: "Spirometry",
    value: Biometricname.SPIRO
  },
  {
    text: "Temperature",
    value: Biometricname.TEMPRATURE
  },
  {
    text: "Weight",
    value: Biometricname.WEIGHT
  },
]
const weekDays = [
  {
    label: "Mon",
    value: "Monday"
  },
  {
    label: "Tue",
    value: "Tuesday"
  },
  {
    label: "Wed",
    value: "Wednesday"
  },
  {
    label: "Thu",
    value: "Thursday"
  },
  {
    label: "Fri",
    value: "Friday"
  },
  {
    label: "Sat",
    value: "Saturday"
  },
  {
    label: "Sun",
    value: "Sunday"
  },
]
export const recurrenceOptions =[
  {
    label: "Daily",
    value: "daily"
  },
  {
    label: 'Weekly',
    value: "weekly",
    children: weekDays
      .map((_) => ({ label:_.label, value: _.value })),
  },
];


export const auditCSVheaders = [
  { header: "", key: "" },
  { header: "Date", key: "timestamp" },
  { header: "User", key: "userName" },
  { header: "Category", key: "category" },
  { header: "BeforeValue", key: "beforeData" },
  { header: "AfterValue", key: "afterData" },
  { header: "IpAddress", key: "ipAddress" },
  { header: "Description", key: "description" },
  ];

  export const biometricNamesObject:any = {
    [Biometricname.BP] : "Blood Pressure",
    [Biometricname.GLUCO] : "Glucose",
    [Biometricname.PULSE] : "Pulse Ox",
    [Biometricname.SPIRO] : "Spirometry",
    [Biometricname.TEMPRATURE] : "Temperature",
    [Biometricname.WEIGHT] : "Weight"
  }

  export const PatientReviewActions = {
    [ReviewActionTypes.RECALL] : "Recall Patient",
    [ReviewActionTypes.ENGAGE] : "Engage Patient",
    [ReviewActionTypes.EMAILFOLLOWUP] : "Email Follow Up",
    [ReviewActionTypes.EMFOLLOWUP] : "E/M Follow Up"
  }

  export const measurementTypes:any = {
    [Biometricname.BP] : {
      "systolic" : "Systolic",
      "diastolic" : "Diastolic",
      "heartRate" : "Pulse",
    },
    [Biometricname.GLUCO] : {
      "glucose" : "Glucose"
    },
    [Biometricname.PULSE] : {
      "spo2":"SpO2",
      "heartRate" : "Heart Rate"
    },
    [Biometricname.SPIRO] : {
      "fev1" : "FEV1"
    },
    [Biometricname.TEMPRATURE] : {
      "temperature" : "Temperature"
    },
    [Biometricname.WEIGHT] : {
      "weight": "Weight",
      "heartFailure": "Heart Failure",
      "obesity" : "Obesity"
    }

  }
  export const healthLinkId = "e273b695-6b70-4df2-8ee8-dfb7c132c4d2"
  export const roleId = "e7c8f5b8-f098-4dca-a59a-a80a7dce31f1"