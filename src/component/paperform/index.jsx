/* eslint-disable no-unreachable */
/**
 * paperform 详情页
 * @Author: centerm.gaohan
 * @Date: 2020-12-22 11:06:33
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-04 11:42:15
 */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { formatModuleData } from '@/pages/index/detail/constants';
import { useHistory } from 'react-router-dom';
import { programStart, programEnd } from '@/pages/index/program/constants';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import { notification, Spin, Modal, Button } from 'antd';
import { ResponseCode } from '@/common/config';
import useCalendar from '../calendar/store';
import { CalendarType } from '../calendar';
import PaperformActionModal from './component/modal';
import './index.less';
import imgtodo from '@/assets/modal/Icon_Check_128x128.png';
import imgcalendar from '@/assets/modal/Icon_Calendar_128x128.png';
import ActionFlowCompleteCard from './component/action-flow';
import { RECEIVE_MESSAGE_TYPE } from '@/pages/index/home/constants';

/**
 * @param RenderPaperformKeyTypes
 * 渲染的paperform Key的类别
 */
export const RenderPaperformKeyTypes = {
  PFKey: 'PFKey',
  CompletePFKey: 'CompletePFKey',
};

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
  const history = useHistory();

  /**
   * @param paperformDataRef 存放module数据，防止闭包等问题引发的错误
   */
  const paperformDataRef = useRef(null);

  /**
   * @param paperformDataKeyRef 存放paperfromkey
   */
  const paperformDataKeyRef = useRef(null);

  /**
   * @param paperformModalDataRef
   * module1 做完之后会跳转到 module2
   * paperformModalDataRef数据为 module1
   */
  const paperformModalDataRef = useRef(null);

  /**
   * @param postMessageDataRef 通过iframe的postmessage返回的数据
   */
  const postMessageDataRef = useRef(null);

  const { showCalendar } = useCalendar();
  const { sign } = useSignSdk();

  const {
    data,
    programData,
    /**
     * @param preview 是否是预览模式
     */
    preview = false,
    /**
     * @param paperformKey
     * 渲染的paperfrom-Key
     * 常规是 PFKey
     * reflect的key是 CompletePFKey
     */
    paperformKey = RenderPaperformKeyTypes.PFKey,
    /**
     * @param delay
     * 触发回调的延时 12-29添加默认10秒
     */
    delay = 1,
    callback,
    ...rest
  } = props;
  const [iframeUrl, setIframeUrl] = useState('');
  const [loading, setLoading] = useState(true);

  // action 完成之后显示modal
  const [actionCompleteVisible, setActionCompleteVisible] = useState(false);

  const hideCctionCompleteModal = () => {
    setActionCompleteVisible(false);
  };

  // 添加action 之后是否直接做的 modal
  const [actionChoiceTodoVisible, setActionChoiceTodoVisible] = useState(false);

  /**
   * 跳转至当前module的Complete Paperfrom
   */
  const choiceTodoModalconfirmCallback = () => {
    history.push(
      `/program/detail/${programData._id}?module_id=${paperformDataRef.current._id}&paperformKey=${RenderPaperformKeyTypes.CompletePFKey}`,
    );
  };

  /**
   * 打开add calendar modal
   */
  const choiceTodoModalsecondCallback = () => {
    setActionAddCalendarVisible(true);
  };

  const [actionAddCalendarVisible, setActionAddCalendarVisible] = useState(
    false,
  );

  // 是否显示action flow完成之后不直接做，不添加日历的card
  const [
    showActionFlowCompletedCard,
    setShowActionFlowCompletedCard,
  ] = useState(false);

  const addCalendarModalconfirmCallback = () => {
    // 防止闭包错误的处理在ref中存放 数据
    const data = paperformDataRef.current;
    showCalendar({
      ...data,
      calendarType: CalendarType.reflect,
      program: programData?._id,
    });

    if (callback) {
      callback({
        postMessageData: postMessageDataRef.current,
        data,
        programData,
      });
    }
  };
  // 取消添加日历，则显示 action card
  const addCalendarModalsecondCallback = () => {
    // 防止闭包错误的处理在ref中存放 数据
    setShowActionFlowCompletedCard(true);
  };

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

      console.log('postMessageData', postMessageData);
      // return;

      if (!postMessageData) {
        return;
      }

      if (postMessageData.type !== RECEIVE_MESSAGE_TYPE.MODULE) {
        return;
      }
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
               * 如果 type = action 显示是否现在就做 complete actionChoiceTodoVisible
               * 如果 type = action 是 reflect 则显示完成modal
               */
              if (
                data.Type === 'Action' &&
                paperformKey !== RenderPaperformKeyTypes.CompletePFKey
              ) {
                postMessageDataRef.current = postMessageData;
                setActionChoiceTodoVisible(true);
                return;
              } else if (
                data.Type === 'Action' &&
                paperformKey === RenderPaperformKeyTypes.CompletePFKey
              ) {
                paperformModalDataRef.current = data;
                setActionCompleteVisible(true);
              }

              setTimeout(() => {
                callback && callback({ postMessageData, data, programData });
              }, delay * 1000);
            }
          })
          .catch((error) => {
            notification.error(error.message);
          });
        // eslint-disable-next-line no-unreachable
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
    window.addEventListener('message', receiveMessage, false);
    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, []);

  // 进来的时候进行数据整合 提交接口
  useEffect(() => {
    setLoading(true);
    if (programData && programData._id) {
      // 存入 ref 中防止闭包错误
      paperformDataRef.current = data;

      // 每次更新都重置card显示
      setShowActionFlowCompletedCard(false);

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

  /**
   * @param actionFlowCompleteCardProps 添加action结果的页面
   *
   * @param completeStatus 当前是否是 complete 状态
   *
   * @param onComplete 如果是未完成状态点击 complete action 跳转至 complete 的paperform
   */
  const actionFlowCompleteCardProps = {
    ...rest,
    completeStatus:
      paperformDataKeyRef.current === RenderPaperformKeyTypes.CompletePFKey,
    onComplete: choiceTodoModalconfirmCallback,
  };

  return (
    <Spin spinning={loading} style={{ width: '100%', height: '100%' }}>
      {showActionFlowCompletedCard === false ? (
        <iframe {...rest} src={iframeUrl} />
      ) : (
        <ActionFlowCompleteCard {...actionFlowCompleteCardProps} />
      )}

      <Modal
        footer={null}
        width={550}
        centered
        closable={false}
        visible={actionCompleteVisible}
        onCancel={hideCctionCompleteModal}
      >
        <div className={`${prefix}-modal`}>
          <img src="https://media.giphy.com/media/5xaOcLGvzHxDKjufnLW/giphy.gif" />
          <span className={`${prefix}-modal-title`}>Action Completed!</span>
          <span>
            You completed {paperformModalDataRef.current?.Title || ''}! We’re so
            proud of you.
          </span>
          <Button
            type="primary"
            size="large"
            style={{ marginTop: 16, width: 106 }}
            onClick={hideCctionCompleteModal}
          >
            Done
          </Button>
        </div>
      </Modal>

      <PaperformActionModal
        icon={imgtodo}
        title="Action Added!"
        subTitle="Would you like to completed your action now?"
        visible={actionChoiceTodoVisible}
        setVisible={setActionChoiceTodoVisible}
        confirmButton="Do it now"
        secondButton="Do it later"
        confirmCallback={choiceTodoModalconfirmCallback}
        secondCallback={choiceTodoModalsecondCallback}
      />
      <PaperformActionModal
        icon={imgcalendar}
        title="Add to calendar"
        subTitle="Would you like to add action to your calendar as a reminder?"
        visible={actionAddCalendarVisible}
        setVisible={setActionAddCalendarVisible}
        confirmButton="Add to Calendar"
        secondButton="No Thanks"
        confirmCallback={addCalendarModalconfirmCallback}
        secondCallback={addCalendarModalsecondCallback}
      />
    </Spin>
  );
};
export default RenderPaperForm;

export { RenderPaperForm };
