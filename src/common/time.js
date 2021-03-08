// 不足两位补0
export function addZero(value) {
  if (value < 10) return '0' + value;
  else return value;
}

// t为时区参数  默认东八区北京时间
export function getTimezoneTime(t = 8) {
  const time = new Date();
  const len = time.getTime();
  const offset = time.getTimezoneOffset() * 60000; // 本地时间与GMT时间差值
  const utcTime = len + offset; // 格林尼治时间

  const date = new Date(utcTime + 3600000 * t); // 格林尼治时间和当前时区差值
  const y = date.getFullYear();
  const mon = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  // const m = date.getMinutes();
  const m = 0;
  // const s = date.getSeconds();
  const s = 0;

  const result =
    y +
    '-' +
    addZero(mon) +
    '-' +
    addZero(d) +
    ' ' +
    addZero(h) +
    ':' +
    addZero(m) +
    ':' +
    addZero(s);

  return {
    time: result,
    hour: h,
    minute: m,
    second: s,
  };
}
