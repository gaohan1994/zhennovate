/**
 * 分享日历
 * @Author: centerm.gaohan
 * @Date: 2020-10-23 10:06:03
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-12-08 14:30:13
 */
import moment from 'moment';

class Calendar {
  /**
   * 格式化时间
   * @param {*} time
   * @return {*}
   * @memberof Calendar
   */
  formatTime(time) {
    return time.toISOString().replace(/-|:|\.\d+/g, '');
  }

  /**
   * 日历生成器
   * @param {*} calendarData
   * @return {*}
   * @memberof Calendar
   */
  generateCalendars(calendarData) {
    return {
      google: this.calendarGenerators(calendarData, 'google'),
      outlook: this.calendarGenerators(calendarData, 'outlook'),
      apple: this.calendarGenerators(calendarData, 'apple'),
    };
  }

  /**
   * calendar 生成器
   * @param {*} calendarType
   * @memberof Calendar
   */
  calendarGenerators(calendarData, calendarType) {
    const { start, end, title, address, description } = calendarData;
    switch (calendarType) {
      case 'google': {
        const startTime = this.formatTime(moment(start));
        const endTime = this.formatTime(moment(end).add(7, 'd'));
        const href = encodeURI(
          [
            'https://www.google.com/calendar/render',
            '?action=TEMPLATE',
            '&text=' + (title || ''),
            '&dates=' + (startTime || ''),
            '/' + (endTime || ''),
            '&details=' + (description || ''),
            '&location=' + (address || ''),
            '&sprop=&sprop=name:',
          ].join(''),
        );
        return href;
      }

      case 'outlook':
      case 'apple': {
        const startTime = this.formatTime(moment(start));
        const endTime = this.formatTime(moment(end).add(7, 'd'));
        const href = encodeURI(
          'data:text/calendar;charset=utf8,',
          [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            'URL:' + document.URL,
            'DTSTART:' + (startTime || ''),
            'DTEND:' + (endTime || ''),
            'SUMMARY:' + (title || ''),
            'DESCRIPTION:' + (description || ''),
            'LOCATION:' + (address || ''),
            'END:VEVENT',
            'END:VCALENDAR',
          ].join('\n'),
        );
        return href;
      }
    }
  }
}

export default new Calendar();
