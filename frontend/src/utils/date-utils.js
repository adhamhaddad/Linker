import React from 'react';
import { TimeDiff, DateDiff } from '../Validation/DateControllers';

const PostDate = ({timedate}) => {
  const postDate = (time) => {
    if (TimeDiff.inSeconds(time) <= 60) {
      return 'just now';
    }
    if (TimeDiff.inMinutes(time) <= 60) {
      return `${TimeDiff.inMinutes(time)}m`;
    }
    if (TimeDiff.inHours(time) <= 24) {
      return `${TimeDiff.inHours(time)}h`;
    }
    if (DateDiff.inDays(time) <= 7) {
      return `${DateDiff.inDays(time)}d`;
    }
    if (DateDiff.inWeeks(time) <= 4) {
      return `${DateDiff.inWeeks(time)}w`;
    }
    if (DateDiff.inMonths(time) <= 12) {
      const months = DateDiff.inMonths(time) > 1 ? 'months' : 'month';
      return `${DateDiff.inMonths(time)} ${months}`;
    } else {
      const years = DateDiff.inYears(time) > 1 ? 'years' : 'year';
      return `${DateDiff.inYears(time)} ${years}`;
    }
  };

  return postDate(timedate);
};

export default PostDate;
