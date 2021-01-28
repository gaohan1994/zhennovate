import { useState, useEffect } from 'react';
import moment from 'moment';
import { api } from '@/common/request';
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

export function useFormatProgramData(data, params = {}) {
  // program持续的时间
  const [duration, setDuration] = useState(0);
  const [durationString, setDurationString] = useState('');
  // program持续的天数
  const [durationDays, setDurationDays] = useState(0);
  const [durationDaysString, setDurationDaysString] = useState('');

  const { daySuffix = 'days', hourSuffix = 'h', minuteSuffix = 'm' } = params;

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
      const hoursString = hours !== 0 ? `${hours} ${hourSuffix}` : '';

      const minutes = moment.duration(duration, 'minutes').minutes();
      const minutesString = `${minutes} ${minuteSuffix}`;

      setDurationString(`${hoursString} ${minutesString}`);
    }
  }, [duration]);

  useEffect(() => {
    if (durationDays !== 0) {
      setDurationDaysString(`${durationDays} ${daySuffix}`);
    }
  }, [durationDays]);
  return {
    duration,
    durationString,
    durationDays,
    durationDaysString,
  };
}

export const programEntry = (params) => {
  return api.get(`/program/entry/${params.userId}/${params.programId}`);
};

export const programWorkshop = (params) => {
  return api.get(`/program/workshops/${params.userId}/${params.programId}`);
};

export const programWorkshopEnd = (params, payload) => {
  return api.post(
    `/workshop/end/${params.userId}/${params.workshopId}`,
    payload,
  );
};

export const programWorkshopsHome = (params) => {
  return api.get(`/home/workshops/${params.userId}`);
};
