import {
  getFormattedDateString,
  getNDaysAgoDateString,
  getLastWeekQueryString,
} from './util';

describe('getFormattedDateString', () => {
  it('should return "YYYY-MM-DD" format when month and day values are single digit', () => {
    const year = 2002;
    const month = 2;
    const day = 4;

    const expected = '2002-03-04';

    const date = new Date(year, month, day);
    const result = getFormattedDateString(date);

    expect(result).toBe(expected);
  });

  it('should return "YYYY-MM-DD" format when month and day values are double digit', () => {
    const year = 2002;
    const month = 10;
    const day = 20;

    const date = new Date(year, month, day);
    const result = getFormattedDateString(date);

    const expected = '2002-11-20';

    expect(result).toBe(expected);
  });
});

describe('getNDaysAgoDateString', () => {
  it('should return a date n days ago, given the anchor date and n days ago value', () => {
    const year = 2002;
    const month = 10;
    const day = 20;

    const now = new Date(year, month, day);
    const daysAgo = 4;
    const result = getNDaysAgoDateString(now, daysAgo);

    const expected = '2002-11-16';

    expect(result).toBe(expected);
  });

  it('should return a date n days ago, when expected date and anchor date are not in the same month', () => {
    const year = 2002;
    const month = 10;
    const day = 2;

    const date = new Date(year, month, day);
    const daysAgo = 4;
    const result = getNDaysAgoDateString(date, daysAgo);

    const expected = '2002-10-29';

    expect(result).toBe(expected);
  });

  it('should return a date n days ago, when expected date and anchor date are not in the same year', () => {
    const year = 2002;
    const month = 0;
    const day = 1;

    const now = new Date(year, month, day);
    const daysAgo = 4;
    const result = getNDaysAgoDateString(now, daysAgo);

    const expected = '2001-12-28';

    expect(result).toBe(expected);
  });
});

describe('getLastWeekQueryString', () => {
  it('should return previous week in "YYYY-MM-DD..YYYY.MM-DD" format, given the anchor date', () => {
    const year = 2002;
    const month = 10;
    const day = 20;

    const date = new Date(year, month, day);

    const result = getLastWeekQueryString(date);

    const expected = '2002-11-11..2002-11-17';

    expect(result).toBe(expected);
  });

  it('should return previous week in "YYYY-MM-DD..YYYY.MM-DD" format, when anchor date is the beginning of a month', () => {
    const year = 2002;
    const month = 10;
    const day = 1;

    const date = new Date(year, month, day);

    const result = getLastWeekQueryString(date);

    const expected = '2002-10-21..2002-10-27';

    expect(result).toBe(expected);
  });

  it('should return previous week in "YYYY-MM-DD..YYYY.MM-DD" format, when anchor date is the beginning of a year', () => {
    const year = 2002;
    const month = 0;
    const day = 1;

    const date = new Date(year, month, day);

    const result = getLastWeekQueryString(date);

    const expected = '2001-12-24..2001-12-30';

    expect(result).toBe(expected);
  });
});
