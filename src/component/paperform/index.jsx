import React, { useEffect, useState } from 'react';
import { formatModuleData } from '@/pages/index/detail/constants';
import { programStart, programEnd } from '@/pages/index/program/constants';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import { notification, Spin } from 'antd';
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
  const { data, programData, preview = false, callback, ...rest } = props;
  const [iframeUrl, setIframeUrl] = useState('');
  const [loading, setLoading] = useState(true);

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

    if (!preview) {
      // 如果是非预览模式才进行上传数据calback
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
    } else {
      callback && callback();
    }
  };

  /**
   * 监听window.postmessage事件
   */
  useEffect(() => {
    window.addEventListener('message', receiveMessage, false);
    return () => window.removeEventListener('message', () => {});
  }, []);

  // 进来的时候进行数据整合 提交接口
  useEffect(() => {
    setLoading(true);
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
            setIframeUrl(result.data?.url);
          }
        })
        .catch((error) => {
          notification.error(error.message);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        });
    }
  }, [data, programData]);
  return (
    <Spin spinning={loading} style={{ width: '100%', height: '100%' }}>
      <iframe {...rest} src={iframeUrl} />
    </Spin>
  );
};
export default RenderPaperForm;

export { RenderPaperForm };
