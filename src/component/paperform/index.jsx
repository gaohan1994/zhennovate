import React, { useEffect, useState } from 'react';
import { formatModuleData } from '@/pages/index/detail/constants';
import { programStart, programEnd } from '@/pages/index/program/constants';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import { notification } from 'antd';
import { ResponseCode } from '@/common/config';

/**
 * @time 10 13
 * @question iframe的高度放到外层
 * @question 视频和paperfrom结合
 * @question paperfrom会保存做过的状态
 *
 * 渲染paperform function
 *
 * @param {*} props
 * @return {*}
 */
const RenderPaperForm = (props) => {
  const { sign } = useSignSdk();
  const { data, programData, callback, ...rest } = props;
  const [iframeUrl, setIframeUrl] = useState('');

  // if (paperform.type === 'modal') {
  //   return (
  //     <div>
  //       <Button
  //         onClick={() => {
  //           dispatch({
  //             type: 'CHANGE_PAPERFORM_MODAL_VISIBLE',
  //             payload: true,
  //           });
  //         }}
  //       >
  //         open paperform modal
  //       </Button>
  //     </div>
  //   );
  // }

  /**
   * 用户提交通过postmessage来获取参数 然后调用programEnd接口并执行回调跳转至下一个module
   * @param {*} event
   */
  const receiveMessage = (event) => {
    const { data: postMessageData } = event;
    const { progressData } = postMessageData;
    const payload = {
      userId: sign.userinfo?._id,
      programId: progressData?.program,
      sessionId: progressData?.session,
      moduleId: progressData?.module,
      recordId: progressData?.record,
    };
    console.log('payload', payload);
    programEnd(payload)
      .then((result) => {
        if (result.error_code === ResponseCode.success) {
          callback && callback({ postMessageData, data, programData });
        }
      })
      .catch((error) => {
        notification.error(error.message);
      });
  };

  /**
   * 监听window.postmessage事件
   */
  useEffect(() => {
    window.addEventListener('message', receiveMessage, false);
    return () => window.removeEventListener('message', () => {});
  }, []);

  useEffect(() => {}, []);

  // 进来的时候进行数据整合 提交接口
  useEffect(() => {
    if (programData && programData._id) {
      const { programId, sessionId, moduleId, paperformId } = formatModuleData(
        data._id,
        programData,
      );

      const payload = {
        userId: sign.userinfo?._id,
        programId,
        sessionId,
        moduleId,
        paperformId,
      };
      programStart(payload)
        .then((result) => {
          if (result.error_code === ResponseCode.success) {
            console.log('result', result);
            console.log('result.data?.url', result.data?.url);
            setIframeUrl(result.data?.url);
          }
        })
        .catch((error) => {
          notification.error(error.message);
        });
    }
  }, [data, programData]);

  return <iframe {...rest} src={iframeUrl} />;
};
export default RenderPaperForm;

export { RenderPaperForm };
