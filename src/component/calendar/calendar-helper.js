import calendar from './calendar';
import moment from 'moment';
import { formatSearch } from '@/common/request';
import { formatModuleData } from '@/pages/index/detail/constants';
import urlencode from 'urlencode';
import { CalendarType } from './index';
import { RenderPaperformKeyTypes } from '../paperform';

export const getCalendarHost = () => {
  const hostname = window.location.hostname;

  const hostString =
    hostname === 'localhost' ? 'http://demo-us.zhennovate.com' : hostname;
  return hostString.startsWith('http') ? hostString : `http://${hostString}`;
};

export const CalendarDataType = {
  Program: 'Program',
  Action: 'Action',
};

/**
 * @todo 创建calendar的辅助函数
 * @Author: centerm.gaohan
 * @Date: 2021-02-07 13:36:09
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-08 10:26:03
 */
class CalendarHelper {
  constructor() {
    this._type = 'normal';
    this._data = {};
  }

  /**
   * 格式化时间
   * @param {*} time
   * @return {*}
   * @memberof Calendar
   */
  formatTime(time) {
    return time.toISOString().replace(/-|:|\.\d+/g, '');
  }

  createCalendarData(...rest) {
    /**
     * @param data 创建日历的数据
     * @param calendarDataType 创建日历的数据类型
     */
    const cad = this.getCalendarDataType();
    if (cad === CalendarDataType.Program) {
      return this.createProgramCalendarData(...rest);
    }

    if (cad === CalendarDataType.Action) {
      return this.createActionCalendarData(...rest);
    }
  }

  /**
   * @todo 创建 Program 的calendar数据
   * 获取program的相关数据进行填充
   * 应该直接指向用户的下一个module/session
   *
   * @param {*} params
   * @memberof CalendarHelper
   */
  createProgramCalendarData(calendarWays) {
    const search = formatSearch(
      (window.location.href || '').split('?')[1] || '',
    );

    const program = this.getCalendarData();

    /**
     * @param nextModule 下一个module
     */
    let nextModule;

    /**
     * @param session 当前session
     * @param sessionIndex 当前seesion的index
     * @param moduleIndex 当前module在session中的index
     */
    const { session, sessionIndex, moduleIndex } = formatModuleData(
      search.module_id,
      program,
    );

    const hasNextModule = !!session.Modules[moduleIndex + 1];

    if (hasNextModule) {
      // 跳转到下一个module
      nextModule = session.Modules[moduleIndex + 1];
    } else {
      const hasNextSession = !!program.Sessions[sessionIndex + 1];
      if (hasNextSession) {
        // 跳转到下一个session
        const nextSession = program.Sessions[sessionIndex + 1];
        nextModule = nextSession.Modules[0];
      }
    }

    console.log('program', program);

    const totalDuration = program.Sessions
      ? program?.Sessions.reduce(
          (prevValue, currentValue) => currentValue.totalDuration + prevValue,
          0,
        )
      : 0;
    console.log('[totalDuration]', totalDuration);

    /**
     * @param {startTime} 开始时间
     * @param {endTime} 结束时间，program的持续时间
     */
    const startTime = this.formatTime(moment().add(1, 'd'));
    const endTime = this.formatTime(
      moment().add(1, 'd').add(totalDuration, 'minutes'),
    );

    const linkHref = urlencode(
      `${getCalendarHost()}/#/program/detail/${program._id}?module_id=${
        nextModule._id
      }`,
    );

    let detailContent = '';

    /**
     * @param {calendarWays === 'google'}
     * 如果是google日历则把链接放在详情中
     * 如果是outlook或者apple日历则把链接放进url
     */
    if (calendarWays === 'google') {
      detailContent += `<p>Continue where you left off at: </p>`;
      detailContent += `<a href="${linkHref}">${nextModule.Title}</a>`;
      detailContent += `<p>See program details: </p>`;
      detailContent += `<p>${program.Detail || ''}</p>`;
    } else {
      detailContent += `Continue where you left off at: \n`;
      detailContent += `See program details: \n`;
      detailContent += `\n ${program.Detail || ''}`;
    }

    /**
     * @param {description}
     * 如果是google日历则把详情放进html中包装一下
     * 如果是outlook或者apple则直接写进详情中
     */
    const calendarData = {
      start: startTime,
      end: endTime,
      title: program.Name,
      address: linkHref,
      description:
        calendarWays === 'google'
          ? '<!DOCTYPE html><html><body>' +
            `${detailContent}` +
            '</body></html>'
          : detailContent,
      ...(calendarWays !== 'google' ? { url: linkHref } : {}),
    };

    return calendar.calendarGenerators(calendarData, calendarWays);
  }

  /**
   * @todo 创建 action 的calendar 数据
   * @todo 第二天同一时间,链接指向complete action
   *
   * @param {*} calendarWays
   * @memberof CalendarHelper
   */
  createActionCalendarData(calendarWays) {
    /**
     * @param data 要添加calendar的action数据
     * @param type Action的type normal是普通 reflect是指向complete paperfrom
     *
     * @param startTime 开始时间 第二天的相同时间
     * @param endTime 结束时间 第三天的相同时间
     *  */
    const data = this.getCalendarData();
    const type = this.getCalendarType();

    const startTime = this.formatTime(moment().add(1, 'd'));
    const endTime = this.formatTime(moment().add(1, 'd').add(15, 'minutes'));

    const suffix =
      type === CalendarType.reflect
        ? `&paperformKey=${RenderPaperformKeyTypes.CompletePFKey}`
        : '';
    const linkHref = urlencode(
      `${getCalendarHost()}/#/program/detail/${data.program}?module_id=${
        data._id
      }${suffix}`,
    );

    let detailContent = '';

    /**
     * @param {calendarWays === 'google'}
     * 如果是google日历则把链接放在详情中
     * 如果是outlook或者apple日历则把链接放进url
     */
    if (calendarWays === 'google') {
      detailContent += `<p>Action Time - Practice what you’ve learned for mastery! </p>`;
      detailContent += `<p>For tips and instructions, or to reflect on the action taken, visit:</p>`;
      detailContent += `<a href="${linkHref}">${data.Title}</a>`;
    } else {
      detailContent += `Action Time - Practice what you’ve learned for mastery! \n`;
      detailContent += `\n For tips and instructions, or to reflect on the action taken, visit:`;
      // detailContent += `\n ${data.Desc || ''}`;
    }

    /**
     * @param {description}
     * 如果是google日历则把详情放进html中包装一下
     * 如果是outlook或者apple则直接写进详情中
     */
    const calendarData = {
      start: startTime,
      end: endTime,
      title: data.Title,
      address: linkHref,
      description:
        calendarWays === 'google'
          ? '<!DOCTYPE html><html><body>' +
            `${detailContent}` +
            '</body></html>'
          : detailContent,
      ...(calendarWays !== 'google' ? { url: linkHref } : {}),
    };
    return calendar.calendarGenerators(calendarData, calendarWays);
  }

  /**
   * @todo 判断当前数据的类型
   *
   * @memberof CalendarHelper
   */
  getCalendarDataType(calendarData) {
    const data = calendarData || this.getCalendarData();
    return data.Sessions !== undefined
      ? CalendarDataType.Program
      : CalendarDataType.Action;
  }

  /**
   * 设置calendar的type
   *
   * @param {*} type
   * @memberof Calendar
   */
  setCalendarType(type) {
    this._type = type;
    return this;
  }
  /**
   * 获取calendar的type
   *
   * @return {*}
   * @memberof Calendar
   */
  getCalendarType() {
    return this._type;
  }

  /**
   * 设置calendar的数据
   *
   * @param {*} data
   * @memberof Calendar
   */
  setCalendarData(data) {
    this._data = data;
    return this;
  }

  /**
   * 获取calendar的数据
   *
   * @return {*}
   * @memberof Calendar
   */
  getCalendarData() {
    return this._data;
  }
}

export default new CalendarHelper();
