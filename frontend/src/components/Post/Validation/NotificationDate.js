import React from 'react';
import { TimeDiff, DateDiff } from './DateControllers';

function NotificationDate(props) {
  const notificationDate = (time) => {
    if (TimeDiff.inSeconds(time) <= 60) {
      return `${TimeDiff.inSeconds(time)} sec`;
    }
    if (TimeDiff.inMinutes(time) <= 60) {
      return `${TimeDiff.inMinutes(time)} min`;
    }
    if (TimeDiff.inHours(time) <= 24) {
      return `${TimeDiff.inHours(time)} h`;
    }
    if (DateDiff.inDays(time) <= 30) {
      //   const days = DateDiff.inDays(time) > 1 ? 'days' : 'day';
      return `${DateDiff.inDays(time)} d`;
    }
    if (DateDiff.inWeeks(time) <= 7) {
      return `${DateDiff.inWeeks(time)} w`;
    }
    if (DateDiff.inMonths(time) <= 12) {
      return `${DateDiff.inMonths(time)} m`;
    }
    if (DateDiff.inYears(time) <= 12) {
      return `${DateDiff.inYears(time)} y`;
    }
  };
  return (
    <span className='notification-time'>{notificationDate(props.time)}</span>
  );
}
export default NotificationDate;
