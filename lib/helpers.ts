import { DateTime } from 'luxon';
import readingTime from 'reading-time';

export const getReadingTime = (text: string, locale: string) => {
  const minute = readingTime(text).minutes;
  // Floor to 1 decimal place
  const minutesRounded = Math.floor(minute * 10) / 10;
  if (locale === 'de') {
    if (minutesRounded === 1) {
      return `${minutesRounded} Minute`;
    } else {
      return `${minutesRounded} Minuten`;
    }
  } else if (locale === 'mn') {
    return `${minutesRounded} минут`;
  }else if (locale === 'fr'){
    if(minutesRounded === 1) {
      return `${minutesRounded} minute`;
    } else {
      return `${minutesRounded} minutes`;
    }
  } else {
    if(minutesRounded === 1) {
      return `${minutesRounded} minute`;
    } else {
        return `${minutesRounded} minutes`;
    }
  }
};

export const getRelativeDate = (date: string, locale: string) => {
  return DateTime.fromISO(date).setLocale(locale).toRelative();
};
