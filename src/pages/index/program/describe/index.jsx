/**
 * program describe 页面
 * @Author: centerm.gaohan
 * @Date: 2020-10-21 14:11:51
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-04 15:12:14
 */
import React, { useEffect, useState, useRef } from 'react';
import { message } from 'antd';
import { userProgram } from '../constants';
import '../index.less';
import Bread from '../component/bread';
import Card from '../component/card';
import Outcome from '../component/outcome';
import Detail from '../component/detail';
import Skill from '../component/skill';
import Instructor from '../component/instructor';
import Coach from '../component/coach';
import { formatSearch } from '@/common/request';
import imgbg from '@/assets/Hexagon-Background-Pattern.svg';
import QueueAnim from 'rc-queue-anim';
import useStickyComponent from '@/component/sticky';
import useSignSdk from '@/pages/sign/store/sign-sdk';

const prefix = 'page-program';

export default (props) => {
  const searchParams = formatSearch(props.location.search);
  /**
   * @param  programContainerRef programs的容器
   */
  const programContainerRef = useRef(null);
  const { id } = props.match.params;

  /**
   * @param loading 加载中
   */
  const [loading, setLoading] = useState(true);
  /**
   * @param program 详情数据
   */
  const [programDescribe, setProgramDescribe] = useState({});

  const [showSticky, setShowSticky] = useState(false);
  const [showNormal, setShowNormal] = useState(false);

  const { isSticky, left } = useStickyComponent(150, programContainerRef);

  const { userId } = useSignSdk();

  useEffect(() => {
    if (!loading && !!programDescribe.OutComes) {
      if (isSticky) {
        setShowNormal(false);
        setTimeout(() => {
          setShowSticky(true);
        }, 300);
        return;
      }

      if (!isSticky) {
        setShowSticky(false);
        setTimeout(() => {
          setShowNormal(true);
        }, 300);
      }
    }
  }, [loading, isSticky, programDescribe]);

  // 进入页面滑动到顶端
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth',
  //   });
  // }, []);

  // 获取program详情
  useEffect(() => {
    setLoading(true);
    if (id) {
      userProgram({ userId, programId: id })
        .then((result) => {
          setProgramDescribe(result.data);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        })
        .catch((error) => {
          message.error(error.message);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
    }
  }, [id]);

  return (
    <div className={`${prefix}-container`}>
      <div
        style={{ backgroundImage: `url(${imgbg})` }}
        className={`${prefix}-container-bg`}
      />
      <div className={`${prefix}-container-box`}>
        <div className={`${prefix}-container-left`} ref={programContainerRef}>
          <Bread data={programDescribe} entry={searchParams.entry || ''} />
          <div className={`${prefix}-describe-title`}>
            {programDescribe.Name}
          </div>

          <div style={{ width: '100%', height: 32 }} />
          <Detail data={programDescribe} />

          <div style={{ width: '100%', height: 32 }} />
          <Skill data={programDescribe} />

          <div style={{ width: '100%', height: 32 }} />
          <Instructor data={programDescribe} />

          <div style={{ width: '100%', height: 32 }} />
          <Coach data={programDescribe} id={id} />
        </div>

        <div className={`${prefix}-container-right`}>
          {!loading && (
            <QueueAnim
              style={{
                width: 360,
                position: 'fixed',
                top: 64 + 32,
                left: left + 744 + 24,
              }}
              type="top"
            >
              {showSticky
                ? [
                    <Card
                      key="card"
                      isSticky={showSticky}
                      data={programDescribe}
                      id={id}
                    />,
                    <div key="dis" style={{ width: '100%', height: 32 }} />,
                    <Outcome key="outcome" data={programDescribe} />,
                  ]
                : null}
            </QueueAnim>
          )}

          {!loading && (
            <QueueAnim type="top">
              {showNormal
                ? [
                    <div
                      key="normal"
                      style={{ paddingTop: 32 + 32 }}
                      className={`${prefix}-container-ani`}
                    >
                      <Card
                        isSticky={isSticky}
                        data={programDescribe}
                        id={id}
                      />
                      <div style={{ width: '100%', height: 32 }} />
                      <Outcome data={programDescribe} />
                    </div>,
                  ]
                : null}
            </QueueAnim>
          )}
        </div>
      </div>
    </div>
  );
};
