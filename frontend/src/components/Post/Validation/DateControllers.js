export const DateDiff = {
  inDays: function (d1) {
    const t1 = new Date(d1).getTime();
    const t2 = new Date().getTime();
    return Math.floor((t2 - t1) / (24 * 3600 * 1000));
  },
  inWeeks: function (d1) {
    const t1 = new Date(d1).getTime();
    const t2 = new Date().getTime();

    return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
  },
  inMonths: function (d1) {
    const d1Y = new Date(d1).getFullYear();
    const d2Y = new Date().getFullYear();
    const d1M = new Date(d1).getMonth();
    const d2M = new Date().getMonth();
    return d2M + 12 * d2Y - (d1M + 12 * d1Y);
  },
  inYears: function (d1) {
    return new Date().getFullYear() - new Date(d1).getFullYear();
  }
};

export const TimeDiff = {
  inSeconds: function (d1) {
    const t1 = new Date(d1).getTime();
    const t2 = new Date().getTime();
    return parseInt((t2 - t1) / 1000);
  },
  inMinutes: function (d1) {
    const t1 = new Date(d1).getTime();
    const t2 = new Date().getTime();
    return parseInt((t2 - t1) / 60000);
  },
  inHours: function (d1) {
    const t1 = new Date(d1).getTime();
    const t2 = new Date().getTime();
    return parseInt((t2 - t1) / 3600000);
  }
};

export const validateTime = (timedate) => {
  const getDateNow = new Date()
    .toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    .split(',')[1]
    .split(':', 2)
    .join(':');
  const time = new Date(timedate)
    .toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    .split(',')[1];
  return `${time.split(':', 2).join(':')} ${time.split(' ')[2]}`;
};
