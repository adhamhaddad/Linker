import React from 'react';
import { TimeDiff, DateDiff } from './DateControllers';

function PostDate(props) {
  const postDate = (time) => {
    if (TimeDiff.inSeconds(time) <= 60) {
      return 'now';
    }
    if (TimeDiff.inMinutes(time) <= 60) {
      return `${TimeDiff.inMinutes(time)} min`;
    }
    if (TimeDiff.inHours(time) <= 24) {
      const hours = TimeDiff.inHours(time) > 1 ? 'hours': 'hour'
      return `${TimeDiff.inHours(time)} ${hours}`;
    }
    if (DateDiff.inDays(time) <= 7) {
      const days = DateDiff.inDays(time) > 1 ? 'days' : 'day';
      return `${DateDiff.inDays(time)} ${days}`;
    }
    if (DateDiff.inWeeks(time) <= 4) {
      const weeks = DateDiff.inWeeks(time) > 1 ? 'weeks' : 'week';
      return `${DateDiff.inWeeks(time)} ${weeks}`;
    }
    if (DateDiff.inMonths(time) <= 12) {
      const months = DateDiff.inMonths(time) > 1 ? 'months' : 'month';
      return `${DateDiff.inMonths(time)} ${months}`;
    } else {
      const years = DateDiff.inYears(time) > 1 ? 'years' : 'year';
      return `${DateDiff.inYears(time)} ${years}`;
    }
  };
  return <>{postDate(props.timedate)}</>;
}

export default PostDate;
