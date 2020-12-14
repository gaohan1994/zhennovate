import { useState, useEffect } from 'react';
import moment from 'moment';
// 解析数据
export function formatModuleData(
  module_id,
  programData,
  paperformKey = 'PFKey',
) {
  /**
   * indexs[0] session index
   * indexs[1] module index
   */
  let indexs = [];
  programData.Sessions?.forEach((s, sindex) => {
    const token = s.Modules?.findIndex((m) => {
      return m._id === module_id;
    });

    if (token > -1) {
      indexs = [sindex, token];
    }
  });
  const session = programData.Sessions[indexs[0]];
  const moduleItem = session.Modules[indexs[1]];

  return {
    program: programData,
    programId: programData._id,

    session: session,
    sessionId: session._id,
    sessionIndex: indexs[0],

    moduleData: moduleItem,
    moduleId: module_id,
    moduleIndex: indexs[1],

    paperformId: moduleItem[paperformKey],
  };
}

export function useFormatProgramData(data) {
  // program持续的时间
  const [duration, setDuration] = useState(0);
  const [durationString, setDurationString] = useState('');
  // program持续的天数
  const [durationDays, setDurationDays] = useState(0);
  const [durationDaysString, setDurationDaysString] = useState('');

  useEffect(() => {
    const totalDuration = data?.Sessions
      ? data?.Sessions.reduce(
          (prevValue, currentValue) => currentValue.totalDuration + prevValue,
          0,
        )
      : 0;
    setDuration(totalDuration);

    setDurationDays(data?.Sessions?.length);
  }, [data]);

  useEffect(() => {
    if (duration !== 0) {
      const hours = moment.duration(duration, 'minutes').hours();
      const hoursString = hours !== 0 ? `${hours} hours` : '';

      const minutes = moment.duration(duration, 'minutes').minutes();
      const minutesString = `${minutes} minutes`;

      setDurationString(`${hoursString}${minutesString}`);
    }
  }, [duration]);

  useEffect(() => {
    if (durationDays !== 0) {
      setDurationDaysString(`${durationDays} days`);
    }
  }, [durationDays]);
  return {
    duration,
    durationString,
    durationDays,
    durationDaysString,
  };
}
