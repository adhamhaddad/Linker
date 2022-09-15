import React from 'react';
import { TimeDiff, DateDiff } from './DateControllers';
import './CommentDate.css';

function CommentDate(props) {
  const commentDate = (time) => {
    if (TimeDiff.inSeconds(time) <= 60) {
      return `${TimeDiff.inSeconds(time)} sec`;
    }
    if (TimeDiff.inMinutes(time) <= 60) {
      return `${TimeDiff.inMinutes(time)} min`;
    }
    if (TimeDiff.inHours(time) <= 24) {
      return `${TimeDiff.inHours(time)} hours`;
    }
    if (DateDiff.inDays(time) <= 30) {
      const days = DateDiff.inDays(time) > 1 ? 'days' : 'day';
      return `${DateDiff.inDays(time)} ${days}`;
    }
    if (DateDiff.inWeeks(time) <= 7) {
      return `${DateDiff.inWeeks(time)} weeks`;
    }
    if (DateDiff.inMonths(time) <= 12) {
      return `${DateDiff.inMonths(time)} month`;
    }
    if (DateDiff.inYears(time) <= 12) {
      return `${DateDiff.inYears(time)} years`;
    }
  };
  return <span className='comment-time'>{commentDate(props.time)}</span>;
}
export default CommentDate;
