import { message } from 'antd';

/**
 * @todo 浏览器通知
 * @Author: centerm.gaohan
 * @Date: 2021-01-22 15:04:40
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-01-22 15:11:14
 */
class Notification {
  createNotification(params) {
    const { title, body = '', icon = '' } = params;
    const notification = new Notification(title, { body, icon });
    console.log('[notification:]', notification);
  }

  /**
   * @param {params} 发送notification的参数
   */
  sendNotification(params) {
    /**
     * 浏览器不支持 Notification
     */
    if (!('Notification' in window)) {
      message.error('This browser does not support desktop notification');
      return;
    }

    /**
     * 用户同意接受通知
     */
    if (Notification.permission === 'granted') {
      this.createNotification(params);
      return;
    }

    /**
     * 向用户获取权限
     */
    if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          this.createNotification(params);
        }
      });
    }
  }
}

export default new Notification();
