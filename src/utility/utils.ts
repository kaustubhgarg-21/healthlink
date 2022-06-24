import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { measurementTypes } from '../web/constants/constants';
import { Biometricname, UserRoles } from '../web/constants/enums';
import { AppUser } from '../web/models/app/appUser';

export const getFullName = (title:string | undefined, fName:string | undefined, mName:string | undefined, lName:string| undefined) =>{
    let fullName:string = '';
    if(title) {
      fullName = fullName+title
    }
    if(fName) {
      fullName = fullName+' '+fName
    }
    if(mName) {
      fullName = fullName+' '+mName
    }
    if(lName) {
      fullName = fullName+' '+lName
    }
    return fullName;
  }


export const convertCelciusToFarhenheit = async(tempInCel:number) => {
  return (tempInCel * 9/5) + 32;
}

export const convertKgToLbs = async(kg:number) => {
  console.log(2.2046226218 * kg, "24")
  return 2.2046226218 * kg;

}

export const convertLbsTokgs = async(kg:number) => {
  return kg * 0.45359237 ;
}

export const compareFormValues = (initialObject?:any, finalObject?:any) => {
  var someObject:any ={};
for (var key in initialObject) {
    if (initialObject.hasOwnProperty(key)) {
        if(initialObject[key] != finalObject[key]){
          someObject[key] = finalObject[key]
        }
        }
    }
    console.log(initialObject, finalObject)
    return someObject  
}

export const removeEmptyKeys = (obj:any) => {
  let filtered:any = {};
  Object.keys(obj).forEach(function (key) {
    if (obj[key] !== "" && obj[key] !== null && obj[key] !== undefined  ) {
      filtered[key] = obj[key];
    }
  });
  return filtered;
}

export const getBoundsForSingleReading = (bounds: any[], readingType: any) => {
  var bound: any = {}
  bound = bounds?.filter((bound: any)=>{
   return ( bound?.boundType == readingType)
  })[0]
   return bound
}
export const unique = (value:any, index:any, self:any) => {
  return self.indexOf(value) === index;
}

export const getExportCsvFile = async (csvData?:any,columns?:any,titleDate?:any,csvFileName?:any) => {
  const workbook = new Excel.Workbook();
  const data = [...csvData]
  const workSheetName = 'Worksheet-1';
  const workBookName = csvFileName;
  const myInputId = 'myInput';

  try {
    const myInput = document.getElementById(myInputId);
    //@ts-ignore
    const fileName = myInput?.value || workBookName;

    // creating one worksheet in workbook
    const worksheet = workbook.addWorksheet(workSheetName, {properties:{tabColor:{argb:'FF00FF00'}}});

    // add worksheet columns
    // each columns contains header and its mapping key from data
    worksheet.columns = columns;
    worksheet.duplicateRow(1, 2, true);
    worksheet.getRow(2).values = [] 
    worksheet.getRow(1).values = [] 
    //table styling

    /*TITLE*/
    worksheet.mergeCells('C1', 'J1');
    worksheet.mergeCells('C2', 'J2');
    worksheet.getCell('C1').value = titleDate
    worksheet.getCell('C2').value = 'Applied Filters'
   
    // worksheet.getRow(2).values = ['Start Date', 'End Date', 'Search', 'Type Filters', 'Location Filters', 'Category Filters', 'Event Filters'];
//title color
    worksheet.autoFilter = 'A1:D1';
    [
    'C1',
    'D1',
    'E1',
    'F1',
    'G1',
    'H1',
    'I1'].map(key => {
      worksheet.getCell(key).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFF00' },
        bgColor: { argb: 'FFFF00' }
      };
});

//heading color
worksheet.autoFilter = 'A3:J3';
['A3',
// 'B3',
'C3',
'D3',
'E3',
'F3',
'G3',
'H3',
'I3',
'J3'
].map(key => {
  worksheet.getCell(key).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '96C8FB' },
    bgColor: { argb: '96C8FB' }
  };
});

    // updated the font for first row.z
    worksheet.getRow(3).font = { bold: true };
    worksheet.getRow(2).font = { bold: true };
    worksheet.getRow(1).font = { bold: true };

    // loop through all of the columns and set the alignment with width.
    worksheet.columns?.forEach((column : any )=> {
      column.width = column?.header?.length + 5;
      column.alignment = { horizontal: 'center' };
    });

    // loop through data and add each one to worksheet
    data.forEach(singleData => {
      worksheet.addRow(singleData);
    });

    // loop through all of the rows and set the outline style.
    worksheet.eachRow({ includeEmpty: false }, row => {
      //@ts-ignore
      // store each cell to currentCell
      const currentCell = row?._cells;

      // loop through currentCell to apply border only for the non-empty cell of excel
      currentCell.forEach((singleCell:any) => {
        // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
        const cellAddress = singleCell._address;

        // apply border
        worksheet.getCell(cellAddress).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });

    // write the content using writeBuffer
    const buf = await workbook.xlsx.writeBuffer();

    // download the processed file
    saveAs(new Blob([buf]), `${fileName}.xlsx`);
  } catch (error:any) {
    console.error('<<<ERRROR>>>', error);
    console.error('Something Went Wrong', error.message);
  } finally {
    // removing worksheet's instance to create new one
    workbook.removeWorksheet(workSheetName);
  }
  
}
export const contactNoFormat=(phone : string|undefined)=>{
  let str= phone?""+phone +"" : "";
  var  concode=str.substring(0,str.length-10)?(str.substring(0,str.length-10)+"-"):(str.substring(0,str.length-10)+"")
  var phoneno=str.substring(str.length-10)
  phoneno=phoneno.replace(/D[^\.]/g,"");
  phoneno=phoneno?phoneno.slice(0,3)+"-"+phoneno.slice(3,6)+"-"+phoneno.slice(6):"";
  // console.log("getphone",phoneno)
  let formatteValue=concode+phoneno;
  return formatteValue
  
}

export const getUniqueZones = (data:any[]) => {
  let formatted:any= [];
  data?.filter(function (item) {
    var i = formatted.findIndex(
      (x: any) =>
        x?.utcOffsetStr == item?.utcOffsetStr
    );
    if (i <= -1) {
      formatted.push(item);
    }
    return null;
  });
  return formatted
  }

  // ******* Biometric Dashboard Utilities *******  
  export const getFullChartDataWithEmptyData = (data:any, days:any) => {
    var x :any = []
    days?.map((d:any)=>{
      var item = data?.find((reading:any)=>reading?.day==d)
      if(item){
        x.push(item)
      }else{
        x.push({day: d})
      }
    })
    return x
  }
  export var enumerateDaysBetweenDates = function(startDate: any, endDate: any) {
    var dates = [];
    var currDate = startDate.clone().subtract(1,"day");
    var lastDate = endDate;
    while(currDate.add(1, 'day').diff(lastDate) <= 0) {
        dates.push(currDate.format("MMM DD"));
    }
    return dates;
  };
  export const getThresholdColumns= (biometric: Biometricname, thresholds: any) => {
    return (
    [
    {
      key: "1",
      title: "Measurement",
      dataIndex: "id",
      width:"20%",
      render: (id: any, row: any) => {
        return (measurementTypes[biometric][row?.boundType])
      }
      },
      {
        key: "2",
        title: `Low`,
        dataIndex: "",
        width:"20%",
        render: (id: any, row: any) => {
          return (getBoundsForSingleReading(
            thresholds?.patientThresholdBounds,
            row["boundType"]
          )?.minBound)
        }
      },
      {
        key: "2",
        title: `High`,
        dataIndex: "",
        width:"20%",
        render: (id: any, row: any) => {
          return (getBoundsForSingleReading(
            thresholds?.patientThresholdBounds,
            row["boundType"]
          )?.maxBound)
        }
      }
  ]
  )
  }
  
  export const getThresholdsAccToUser = (bound:any, user: AppUser | null) => {
    var actThres: any
    if(user?.roleName == UserRoles.PROVIDER){
      actThres = bound[user?.id]
    }else{
      actThres = bound[Object.keys(bound)[0]]
    }
    return actThres
  }