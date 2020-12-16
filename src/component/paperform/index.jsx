import React, { useEffect, useState, useRef, useCallback } from 'react';
import { formatModuleData } from '@/pages/index/detail/constants';
import { programStart, programEnd } from '@/pages/index/program/constants';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import { notification, Spin, Modal, Button } from 'antd';
import { ResponseCode } from '@/common/config';
import './index.less';
import useCalendar from '../calendar/store';
import { CalendarType } from '../calendar';

const prefix = 'component-paperform';

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
  const paperformDataRef = useRef(null);
  const paperformDataKeyRef = useRef(null);
  const paperformModalDataRef = useRef(null);

  const { showCalendar } = useCalendar();
  const { sign } = useSignSdk();
  const {
    data,
    programData,
    preview = false,
    /**
     * 渲染的paperfrom-Key
     * 常规是 PFKey
     * reflect的key是 ReflectPFKey
     */
    paperformKey = 'PFKey',
    callback,
    ...rest
  } = props;
  const [iframeUrl, setIframeUrl] = useState('');
  const [loading, setLoading] = useState(true);

  // action 完成之后显示modal
  const [actionCompleteVisible, setActionCompleteVisible] = useState(false);

  useEffect(() => {
    paperformDataKeyRef.current = paperformKey;
  }, [props.paperformKey]);

  // 关闭modal 清空ref数据
  useEffect(() => {
    if (actionCompleteVisible === false) {
      paperformModalDataRef.current = {};
    }
  }, [actionCompleteVisible]);

  /**
   * 用户提交通过postmessage来获取参数 然后调用programEnd接口并执行回调跳转至下一个module
   * @param {*} event
   */
  const receiveMessage = useCallback(
    (event) => {
      const { data: postMessageData } = event;
      const { progressData, paperformData } = postMessageData;

      const payload = {
        userId: sign.userinfo?._id,
        programId: progressData?.program,
        sessionId: progressData?.session,
        moduleId: progressData?.module,
        recordId: progressData?.record,
      };

      // 防止闭包错误的处理在ref中存放 数据
      const data = paperformDataRef.current;
      const paperformKey = paperformDataKeyRef.current;
      if (!preview) {
        // 如果是非预览模式才进行上传数据calback
        programEnd(payload, { paperformData })
          .then((result) => {
            if (result.error_code === ResponseCode.success) {
              /**
               * 如果 type = action 且不是 reflect 添加calendar
               *
               * 如果 type = action 是 reflect 则显示完成modal
               */
              if (data.Type === 'Action' && paperformKey !== 'ReflectPFKey') {
                showCalendar({
                  ...data,
                  calendarType: CalendarType.reflect,
                  program: progressData?.program,
                });
              } else if (
                data.Type === 'Action' &&
                paperformKey === 'ReflectPFKey'
              ) {
                paperformModalDataRef.current = data;
                setActionCompleteVisible(true);
              }
              callback && callback({ postMessageData, data, programData });
            }
          })
          .catch((error) => {
            notification.error(error.message);
          });
      } else {
        callback && callback();
      }
    },
    [paperformDataRef],
  );

  /**
   * 监听window.postmessage事件
   */
  useEffect(() => {
    window.addEventListener('message', (event) => receiveMessage(event), false);
    return () => window.removeEventListener('message', () => {});
  }, []);

  // 进来的时候进行数据整合 提交接口
  useEffect(() => {
    setLoading(true);
    if (programData && programData._id) {
      // 存入 ref 中防止闭包错误
      paperformDataRef.current = data;

      /**
       * 获取正确的要渲染的 paperfrom-key
       */
      const { programId, sessionId, moduleId, paperformId } = formatModuleData(
        data._id,
        programData,
        paperformKey,
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
  }, [data, programData, paperformKey]);
  return (
    <Spin spinning={loading} style={{ width: '100%', height: '100%' }}>
      <iframe {...rest} src={iframeUrl} />

      <Modal
        footer={null}
        width={550}
        centered
        closable={false}
        visible={actionCompleteVisible}
        onCancel={() => setActionCompleteVisible(false)}
      >
        <div className={`${prefix}-modal`}>
          <img src="" />
          <span className={`${prefix}-modal-title`}>Action Completed!</span>
          <span>
            You completed {paperformModalDataRef.current?.Title || ''}! We’re so
            proud of you.
          </span>
          <Button
            type="primary"
            style={{ marginTop: 16 }}
            onClick={() => setActionCompleteVisible(false)}
          >
            Done
          </Button>
        </div>
      </Modal>
    </Spin>
  );
};
export default RenderPaperForm;

export { RenderPaperForm };
