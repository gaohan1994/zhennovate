/**
 * 分享日历
 * 参考 https://gist.github.com/jakebellacera/635416
 * 参考 https://segmentfault.com/q/1010000016761731
 *
 * @Author: centerm.gaohan
 * @Date: 2020-10-23 10:06:03
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-08 10:12:23
 */

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
    const { start, end, title, address, description, url } = calendarData;
    switch (calendarType) {
      case 'google': {
        const href = [
          'https://www.google.com/calendar/render',
          '?action=TEMPLATE',
          '&text=' + (title || ''),
          '&dates=' + (start || ''),
          '/' + (end || ''),
          '&details=' + (description || ''),
          '&location=' + (address || ''),
          '&sprop=&sprop=name:',
        ].join('');
        return href;
      }

      case 'outlook':
      case 'apple': {
        const href =
          'data:text/calendar;charset=utf8,' +
          [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            'UID:' + `${Math.round(new Date())}`,
            'URL:' + url,
            'DTSTART:' + (start || ''),
            'DTEND:' + (end || ''),
            'SUMMARY:' + (title || ''),
            'DESCRIPTION:' + (description || ''),
            'END:VEVENT',
            'END:VCALENDAR',
          ].join('\n');

        return href;
      }
    }
  }
}

export default new Calendar();
