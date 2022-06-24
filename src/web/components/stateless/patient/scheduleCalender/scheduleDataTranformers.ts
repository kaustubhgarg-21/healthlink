import moment from "moment";

function getHoursofDay() {
  const items: any = [];
  new Array(24).fill(24).forEach((acc, index) => {
    items.push(moment({ hour: index }).hours());
  });
  return items;
}
export function setMonthlyScheduleData(data: any) {
  var x: any = [];
  for (let key of Object.keys(data)) {
    x.push({ [key]: { readings: setReadingsData(data[key]) } });
  }
  return x;
}
export function setReadingsData(data: any) {
  var x: any = [];
  let key: any;
  for (key of Object.values(data)) {
    let i: any;
    for (i of Object.values(key)) {
      var ind = x.findIndex((sch: any)=>sch?.biometricName == i?.biometricName)
      if(ind<0){
        x.push(i);
      }
      
    }
  }
  return x;
}

export function setDailyScheduleData(data: any, day:string) {
    let final:any = [];
    const allKeys = Object.keys(data[day]? data[day]: {});
    allKeys.forEach((key) => {
      const startEnd = key.split("-");
      const index = final.findIndex(
        (x:any) => (
          (moment.utc(x.start, "HH:mm:ss").local().hours() <= moment.utc(startEnd[0], "HH:mm:ss").local().hours())
           && (moment.utc(startEnd[0], "HH:mm:ss").local().hours() <= moment.utc(x.end, "HH:mm:ss").local().hours())
           ) || 
           ((moment.utc(x.start, "HH:mm:ss").local().hours() <= moment.utc(startEnd[0], "HH:mm:ss").local().hours()) 
           && (moment.utc(startEnd[0], "HH:mm:ss").local().hours() <= moment.utc(x.end, "HH:mm:ss").local().hours()))
      );
      if (index < 0) {
        final.push({
          start: moment.utc(startEnd[0], "HH:mm:ss").local().hours(),
          end:  moment.utc(startEnd[1], "HH:mm:ss").local().hours(),
          readings: data[day][key]
        });
      } else {
        let obj = final[index];
        const temp = obj?.readings;
        final?.splice(index, 1);
        final?.push({
          start: obj?.start <= moment.utc(startEnd[0], "HH:mm:ss").local().hours() ? obj?.start : moment.utc(startEnd[0], "HH:mm:ss").local().hours(),
          end: obj?.end <  moment.utc(startEnd[1], "HH:mm:ss").local().hours() ? moment.utc(startEnd[1], "HH:mm:ss").local().hours() : obj?.end,
          readings: temp?.concat(data[day][key])
        });
      }
    });
    
  return getHoursofDay().map((x:any)=>{
    return (
      {
        time: x,
        data:final
      }
    )
  });
}
function weekSchData (data: any,day:any){
  let final:any = [];
    const allKeys = Object.keys(data[day]? data[day]: {});
    allKeys.forEach((key) => {
      const startEnd = key.split("-");
      const index = final.findIndex(
        (x:any) => (
          (moment.utc(x.start, "HH:mm:ss").local().hours() <= moment.utc(startEnd[0], "HH:mm:ss").local().hours())
           && (moment.utc(startEnd[0], "HH:mm:ss").hours() <= moment.utc(x.end, "HH:mm:ss").hours())
           ) || 
           ((moment.utc(x.start, "HH:mm:ss").local().hours() <= moment.utc(startEnd[0], "HH:mm:ss").local().hours()) 
           && (moment.utc(startEnd[0], "HH:mm:ss").local().hours() <= moment.utc(x.end, "HH:mm:ss").local().hours()))
      );
      if (index < 0) {
        final.push({
          start: moment.utc(startEnd[0], "HH:mm:ss").local().hours(),
          end:  moment.utc(startEnd[1], "HH:mm:ss").local().hours(),
          readings: data[day][key]
        });
      } else {
        let obj = final[index];
        const temp = obj?.readings;
        final?.splice(index, 1);
        final?.push({
          start: obj?.start <= moment.utc(startEnd[0], "HH:mm:ss").local().hours() ? obj?.start : moment.utc(startEnd[0], "HH:mm:ss").local().hours(),
          end: obj?.end <  moment.utc(startEnd[1], "HH:mm:ss").local().hours() ? moment.utc(startEnd[1], "HH:mm:ss").local().hours() : obj?.end,
          readings: temp?.concat(data[day][key])
        });
      }
    });
    return final
}
export function setWeeklyScheduleData(data: any) {
  var x: any = [];
  if(Object?.keys(data)?.length > 0){
    for (let key of Object.keys(data)) {
      getHoursofDay().forEach((d: any)=>{
        var ind = x.findIndex((sch:any)=>sch["time"] == d)
      if(ind<0){
        x.push({time: d, [moment(key).format("DD-MM-YYYY")]: weekSchData(data,key)});
      }else{
        x[ind] = {...x[ind],  [moment(key).format("DD-MM-YYYY")]: weekSchData(data,key)}
      }  
    })
    }
  }else{
    getHoursofDay().forEach((d: any)=>{
      x.push({time: d})
    })
  }
   return x;
}
