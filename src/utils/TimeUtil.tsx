import moment, { Moment } from "moment";

const formatTimeYMD = (
  dateString: number | string | Date | Moment | null | undefined
) => {
  if (dateString) {
    return moment(dateString).format("YYYY-MM-DD");
  } else {
    return "--";
  }
};

const formatTimeYMDHMS = (
  dateString: number | string | Date | Moment | null | undefined
) => {
  if (dateString) {
    return moment(dateString).format("YYYY-MM-DD HH:mm:ss");
  } else {
    return "--";
  }
};

const getDayStartDate = (dateString: number | string | Date) => {
  let date = new Date(dateString);
  let yeat = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return new Date(yeat, month, day, 0, 0, 0);
};

const getDayStartDateStr = (dateString: number | string | Date) => {
  let date = new Date(dateString);
  let yeat = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return formatTimeYMDHMS(new Date(yeat, month, day, 0, 0, 0));
};

const getDayEndDate = (dateString: number | string | Date) => {
  let date = new Date(dateString);
  let yeat = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return new Date(yeat, month, day, 23, 59, 59);
};

const getDayEndDateStr = (dateString: number | string | Date) => {
  let date = new Date(dateString);
  let yeat = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return formatTimeYMDHMS(new Date(yeat, month, day, 23, 59, 59));
};

export const getMonthStartDate = () => {
  let now = new Date();
  let nowYear = now.getFullYear();
  let nowMonth = now.getMonth();
  return new Date(nowYear, nowMonth, 1);
};

export const getMonthEndDate = () => {
  let now = new Date();
  let nowYear = now.getFullYear();
  let nowMonth = now.getMonth();
  return new Date(
    nowYear,
    nowMonth,
    getMonthDays(nowYear, nowMonth),
    23,
    59,
    59
  );
};

export const getYearStartDate = () => {
  let now = new Date();
  let nowYear = now.getFullYear();
  return new Date(nowYear, 0, 1);
};

export const getYearEndDate = () => {
  let now = new Date();
  let nowYear = now.getFullYear();
  return new Date(nowYear, 11, 31, 23, 59, 59);
};

export const getLastMonthStartDate = () => {
  let lastMonthDate = new Date();
  lastMonthDate.setDate(1);
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  let lastYear = lastMonthDate.getFullYear();
  let lastMonth = lastMonthDate.getMonth();
  return new Date(lastYear, lastMonth, 1);
};

export const getLastMonthEndDate = () => {
  let lastMonthDate = new Date();
  lastMonthDate.setDate(1);
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  let lastYear = lastMonthDate.getFullYear();
  let lastMonth = lastMonthDate.getMonth();
  return new Date(
    lastYear,
    lastMonth,
    getMonthDays(lastYear, lastMonth),
    23,
    59,
    59
  );
};

const getMonthDays = (nowYear: any, nowMonth: any) => {
  let monthStartDate: any = new Date(nowYear, nowMonth, 1);
  let monthEndDate: any = new Date(nowYear, nowMonth + 1, 1);
  return (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
};

export { getDayStartDate, getDayEndDate, formatTimeYMD, formatTimeYMDHMS };
