import { ACTION_TYPES_COMMON } from '@/component/paperform-modal/store';
import { store } from '@/module/redux/persist';
/**
 * iframe 通信sdk
 *
 * @param {params} {type: string; data: any}
 *
 * @class PostMessageSdk
 *
 * 在iframe中加入这段代码
 * ```js
 * const data = {
 *  type: 'modal', // modal || iframe
 *  data: {} // 自定义data后期可扩展, 先随便放点东西
 * };
 * parent.postMessage(data, '*');
 * ```
 */
class PostMessageSdk {
  /**
   * 如果是modal形式的paperfrom则关闭弹窗
   *
   * @param {*} params
   * @memberof PostMessageSdk
   */
  receiveMessage = (params) => {
    console.log('PostMessageSdk params', params);
    const { data } = params;
    switch (data.type) {
      case 'modal': {
        store.dispatch({
          type: ACTION_TYPES_COMMON.CHANGE_PAPERFORM_MODAL_VISIBLE,
          payload: false,
        });
        break;
      }
      case 'iframe': {
        break;
      }
      default: {
        break;
      }
    }
  };
}

export default new PostMessageSdk();
