export const getFormattedDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
};

export const getNDaysAgoDateString = (anchorDate: Date, daysAgo: number) => {
  const date = new Date(
    anchorDate.getFullYear(),
    anchorDate.getMonth(),
    anchorDate.getDate() - daysAgo
  );
  return getFormattedDateString(date);
};

export const getLastWeekQueryString = (anchorDate: Date) => {
  const daysToLastSunday = anchorDate.getDay();
  const daysToLastMonday = daysToLastSunday + 6;

  const lastSunday = getNDaysAgoDateString(anchorDate, daysToLastSunday);
  const lastMonday = getNDaysAgoDateString(anchorDate, daysToLastMonday);

  return `${lastMonday}..${lastSunday}`;
};
