import dateFormat from "dateformat";


export const toMinutes = (timeInSeconds: number) => {
  return timeInSeconds / 60;
};

export const dateNow = (date = new Date()) => {
  return dateFormat(date, "mmmm dS, yyyy");
};

export const daysFromDay = (days: number, day = new Date()) => {
  const utcDay = day.getUTCDate();
  const utcMonth = day.getUTCMonth();
  const utcYear = day.getUTCFullYear();
  const daysFromNow = new Date(utcYear, utcMonth, utcDay + days);
  return daysFromNow;
};

export const isValidDate = (dateStr: Date| string) => String(new Date(dateStr)) != "Invalid Date";

type DateFilter = {startDate: Date | string, endDate: Date | string};
export const getDateFilter = ({ startDate, endDate }: Partial<DateFilter>, filter = {}) => {
  if (!startDate){
    const finDate = endDate && isValidDate(endDate) ? new Date(endDate) : new Date();  
    return { ...filter, createdAt: { $lte: finDate } };
  }
  const begDate = isValidDate(startDate) ? new Date(startDate) : new Date();
  const finDate = endDate && isValidDate(endDate) ? new Date(endDate) : new Date();  
  return { ...filter, createdAt: { $gte: begDate, $lte: finDate } };
};

export const secondsFromNow = (seconds: number, day = new Date()) => new Date(day.getTime() + (seconds * 1000));
export const minutesFromNow = (minutes: number, day = new Date()) => secondsFromNow(minutes * 60, day);

/**
 * YYYY-MM-DD
 */
export const dateToDashedString = (day = new Date(), useHumanTime?: boolean) => {
  const utcDay = day.getUTCDate();
  const utcMonth = day.getUTCMonth();
  const utcYear = day.getUTCFullYear();
  return `${utcYear}-${useHumanTime ? utcMonth + 1 : utcMonth}-${utcDay}`;
};


export const dashedStringToDate = (date: string) => {
  const year = parseInt(date.slice(0,4));
  const month = parseInt(date.slice(5,7));
  const day = parseInt(date.slice(8,10));

  return new Date(year, month, day);
};

export const getStartOfWeek = () => {
  type weekDay = typeof weekDays;
  const weekDays = { "Sun": 0, "Mon": -1, "Tue": -2, "Wed": -3, "Thu": -4, "Fri": -5, "Sat": -6 };
  const date = new Date();
  const day = date.toDateString().slice(0,3);
  const offset = weekDays[(day as keyof weekDay)];
  const sunday = daysFromDay(offset);
  return sunday;
};

export const getPrettyDate = (date: Date) => {
  let pretty = date.toDateString().slice(4);
  pretty = pretty.slice(0,6) + "," + pretty.slice(6);
  return pretty;
};

type dateType = {
  year: number,
  month: number,
  day: number,
};
export const getDate = ({ year, month, day }: dateType) => {
  return new Date(year, month - 1, day);
};

export const weekData = { 
  "Sun": { offset: 0 }, 
  "Mon": { offset: -1 }, 
  "Tue": { offset: -2 },
  "Wed": { offset: -3 }, 
  "Thu": { offset: -4 },
  "Fri": { offset: -5 }, 
  "Sat": { offset: -6 },
};

export const monthData: {
  [key: string]: {
    days: number;
};
} = {
  "jan": { days: 31 },
  "feb": { days: (() => { 
    const now = new Date();
    const lastDayofFebruary = new Date(now.getUTCFullYear(), 2, 0);
    return lastDayofFebruary.getDate();})() },
  "mar": { days: 31 },
  "apr": { days: 30 },
  "may": { days: 31 },
  "jun": { days: 30 },
  "jul": { days: 31 },
  "aug": { days: 31 },
  "sep": { days: 30 },
  "oct": { days: 31 },
  "nov": { days: 30 },
  "dec": { days: 31 },
};

export type period = {
  begMonth: string;
  begYear: number;
  endMonth: string;
  endYear: number;
};
export const getMonthsBegEndPair: (period: period) => [Date, Date][] = ({ begMonth, begYear, endMonth, endYear }: period) => {
  const monthsBegEndPair: [Date, Date][] = [];

  if (endYear < begYear){
    throw new Error("end year cannot be greater than begin year");
  }

  // fast retrieval
  const months = [ "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec" ];
  [begMonth, endMonth].forEach((month) => {
    if (!months.includes(month.toLowerCase())){
      throw new Error(`${month} is not a valid month`);
    }
  });

  if (begYear == endYear){
    const remainingMonths = months.slice(months.indexOf(begMonth));
    if (!remainingMonths.includes(endMonth)){
      throw new Error(`${endMonth} is earlier than ${begMonth}`);
    }
  }

  let startMonth = begMonth;
  let startYear = begYear;
  while(startYear <= endYear){
    let state = true;
    while(state){
      const startDate = getDate({ year: startYear, month: months.indexOf(startMonth) + 1, day: 1 });
      const endDate = daysFromDay(monthData[startMonth].days, startDate);
      const monthPair: [Date, Date] = [startDate, endDate];
    
      monthsBegEndPair.push(monthPair);

      if (startMonth == "dec"){
        state = false;
      }else {
        state = startYear == endYear ? startMonth !== endMonth : true;
      }
      startMonth = nextMonth(startMonth, months);
    }
    startYear++;
  }

  return monthsBegEndPair;
};

export const nextMonth = (month: string, monthArray: string[]) => {
  const monthPosition = monthArray.indexOf(month);
  const lastMonth = monthArray.length - 1;
  if (monthPosition == lastMonth){
    return monthArray[0];
  }
  return monthArray[monthPosition + 1];
};

// console.log(
//   getMonthsBegEndPair({
//     begMonth: 'jan',
//     begYear: 2021,
//     endMonth: 'mar',
//     endYear: 2022,
//   })
// );
// const monthsBegs: Date[] = (
//   () => {
//     let begs = []
//     for (let i = 1; i < 13; i ++){
//       begs.push(getDate({ year: 2021, month: i, day: 1 }));
//     }
//     return begs;
//   }
// )();

// export const mongBegEndPair = monthsBegs.map((day, index) => {
//   const end = daysFromDay(monthData[Object.keys(monthData)[index]].days, day);
//   return [ day.toDateString(), end.toDateString() ];
// });

export const timeDifferenceInSeconds = (beginDate: Date, endDate = new Date()) => {
  return Math.floor((endDate.getTime() - beginDate.getTime()) / 1000);
};





/**
 * SECTIN 1
 */
const toTwelveHrTime = (timeHr: number) => (timeHr % 12);
const toTwentyFourHrTime = (timeHr: number) => {
  if (timeHr < 12) return timeHr + 12;
  return 12;
};

export const timeBuilder = () => {
  const timeList = [];
  let timeArray = [1];
  let timeHr = 12;
  let count = 1;
  for (let __ of timeArray){
    const dateValue = createTimeString(
      (timeHr == 12 || timeHr == 24) ? 12 : toTwelveHrTime(timeHr), 
      (count % 2) == 1 ? 0 : 30,  count < 25 ? "am" : "pm"
    );
    timeList.push({ text: dateValue, value: dateValue });
    (count % 2) != 1 ? timeHr++ : timeHr;
    count++;
    if (timeArray.length < 48){
      timeArray.push((timeArray.at(-1))! + 1);
    }
  }
  return timeList;
};

const formatMinute = (minute: number) => {
  return `${minute == 0 ? "00" : minute}`;
};

const createTimeString = (timeHr: number, timeMinute: number, format: string) => {
  return `${timeHr}:${formatMinute(timeMinute)}${format}`;
};

// console.log(timeBuilder());

/**
 * SECTION 2
 */

export const createTimeFromTimeString = (timeString: string) => {
  if (timeString.length == 7){
    const timeHr = timeString.slice(0,2);
    const timeMinute = timeString.slice(3,5);
    const timeFormat = timeString.slice(5,7);
    return { timeHr, timeMinute, timeFormat };
  }else{
    const timeHr = timeString.slice(0,1);
    const timeMinute = timeString.slice(2,4);
    const timeFormat = timeString.slice(4,6);
    return { timeHr, timeMinute, timeFormat };
  }
};

// console.log(createTimeFromTimeString('12:00am'));
// console.log(createTimeFromTimeString('12:30am'));
// console.log(createTimeFromTimeString('7:30pm'));

/**
 * SECTION 3
 */

export const destructureDate = (dateStr: string | Date) => {
  const newDate = new Date(dateStr);
  const day = newDate.getUTCDate();
  const month = newDate.getUTCMonth();
  const year = newDate.getFullYear();
  return { day, month: month + 1, year };
};

export const beginningOfDay = (newDate = new Date()) => {
  const day = newDate.getUTCDate();
  const month = newDate.getUTCMonth();
  const year = newDate.getFullYear();
  return new Date(year, month, day);
};

export const today = beginningOfDay;

export const hoursFromDay = (hours: number, day = today()) => {
  const date = Math.max((new Date()).getUTCDate(), day.getUTCDate());
  const month = day.getUTCMonth();
  const year = day.getFullYear();
  const minutes = day.getUTCMinutes();
  const hh = new Date(year, month, date, hours, minutes);
  return hh;
};

export type DestructuredDate = {
  day: number;
  month: number;
  year: number;
};

export type DestructuredTime = {
  timeHr: string;
  timeMinute: string;
  timeFormat: string;
};

// console.log(destructureDate('Sat Oct 22 2022 00:00:00 GMT+0100 (GMT+01:00)'));
// console.log(destructureDate('Sat Oct 22 2022 00:00:00 GMT+0100 (GMT+01:00)'));
// console.log(destructureDate('Sat Oct 22 2022 00:00:00 GMT+0100 (GMT+01:00)'));


export const combineDateAndTime = (destructuredDate: DestructuredDate, destructuredTime: DestructuredTime) => {
  const { day, month, year } = destructuredDate;
  const { timeHr, timeMinute, timeFormat } = destructuredTime;
  return new Date(year, month - 1, day, timeFormat == "am" ? Number(timeHr) : toTwentyFourHrTime(Number(timeHr)), Number(timeMinute));
};

// console.log(toTwentyFourHrTime(11));
// console.log(toTwentyFourHrTime(1));
// console.log(toTwentyFourHrTime(2));
// console.log(toTwentyFourHrTime(12));


// console.log(
//   combineDateAndTime(destructureDate((new Date()).toString()), createTimeFromTimeString('12:00am')).toString()
// );

// console.log(
//   combineDateAndTime(destructureDate((new Date()).toString()), createTimeFromTimeString('11:00am')).toString()
// );

// console.log(
//   combineDateAndTime(
//     destructureDate((new Date()).toString()), 
//     createTimeFromTimeString('9:00pm')
//   ).toString()
// );

// console.log(
//   combineDateAndTime(destructureDate((new Date()).toString()), createTimeFromTimeString('5:30pm')).toString()
// );

/**
 * Final part involves converting the combinedDate to individual pieces. Would be needed when you fetch the data and may choose to display it
 */
//  @args combinedDateAndTime: Date
export const destructureCombinedDateAndTime = (combinedDateAndTime: string | Date) => {
  const date = new Date(combinedDateAndTime);
  const day = date.getUTCDate();
  const month = date.getUTCMonth();
  const year = date.getFullYear();
  const timeFormat = date.getHours() >= 12 ? "pm" : "am";
  const timeHr = toTwelveHrTime(date.getHours());
  const timeMinute = date.getMinutes();
  return {
    destructuredDate: { day, month: month + 1, year },
    destructuredTime: { timeHr: timeHr == 0 ? "12" : `${timeHr < 10 ? `0${timeHr}` : timeHr }`, timeMinute: `${timeMinute < 10 ? `0${timeMinute}` : timeMinute}`, timeFormat: timeFormat }
  };
};

export const createDateFromDestructuredDate = (destructuredDate: DestructuredDate) => {
  const { day, month, year } = destructuredDate;
  return new Date(year, month - 1, day);
};

export const createTimeFromDestructuredTime = (destructuredTime: DestructuredTime) => {
  const { timeHr, timeMinute, timeFormat } = destructuredTime;
  return `${timeHr}:${timeMinute}${timeFormat}`;
};

// console.log(destructureCombinedDateAndTime(new Date));
// console.log(destructureCombinedDateAndTime(new Date));
// console.log(destructureCombinedDateAndTime(new Date));
// console.log(destructureCombinedDateAndTime(new Date));
// console.log(destructureCombinedDateAndTime(new Date));

// Date => [setDate, setTime]
// [setDate, setTime] => Date

// activeUsers =-> Query
// filter -> a time period

// list of users
// // x, y
// {
//   timeSeriesDates : {
//     type: [
//       {x: String, y: String}
//     ]
//   }
// }

// [
//   {x: value, y: value},
//   [x2, y2]
// ]

export const getWeek = { 
  "Sun": { offset: 0 }, 
  "Mon": { offset: -1 }, 
  "Tue": { offset: -2 },
  "Wed": { offset: -3 }, 
  "Thu": { offset: -4 },
  "Fri": { offset: -5 }, 
  "Sat": { offset: -6 },
};

export const getMonth: {
  [key: string]: number
} = {
  "Jan": 0,
  "Feb": 1,
  "Mar": 2,
  "Apr": 3,
  "May": 4,
  "Jun": 5,
  "Jul": 6,
  "Aug": 7,
  "Sep": 8,
  "Oct": 9,
  "Nov": 10,
  "Dec": 11,
};

/**
 * @param trimmedDate 'Sat Jan 01 2022'
 * @returns Date
 */
export const getDateFromTrimmedDate = (trimmedDate: string) => {
  if (!trimmedDate) throw new Error("please input date");
  if (trimmedDate.length > 15 || trimmedDate.length < 15) throw new Error("invalid date: length should be 15");
  const month = getMonth[trimmedDate.slice(4,7)];
  const day = Number(trimmedDate.slice(8,10));
  const year = Number(trimmedDate.slice(11,15));
  return new Date(year, month, day, 1);
};
