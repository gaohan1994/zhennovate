import React, { useEffect, useState } from 'react';
import '@/pages/index/program/index.less';
import Filter from '@/component/fliter';
import Sort from '@/component/sort';
import Markdown from '@/component/markdown';
import '../index.less';
import imgaction from '../../../../assets/Icon-Action@2x.png';
import imgreflection from '../../../../assets/Icon-Reflection@2x.png';
import { programEntry } from '../../program/constants';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import { ResponseCode } from '@/common/config';
import { Skeleton } from 'antd';
import moment from 'moment';
import Empty from '@/component/empty';

export const EntryFilter = {
  Action: 'Action',
  Assessment: 'Assessment',
  Reflect: 'Reflect',
};

const prefix = 'page-program';

function RenderHeader(props) {
  const { icon, title, subTitle } = props;
  const prefix = 'page-detail';
  return (
    <div className={`${prefix}-custom-header ${prefix}-custom`}>
      {icon && (
        <div
          className={`${prefix}-custom-icon`}
          style={{ backgroundImage: `url(${icon})` }}
        />
      )}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 className={`${prefix}-custom-title`}>{title}</h1>
        <span>{subTitle}</span>
      </div>
    </div>
  );
}

export default (props) => {
  const { programData } = props;
  const [loading, setLoading] = useState(true);
  /**
   * @param entryData entry 的数据
   */
  const [entryData, setEntryData] = useState({});
  /**
   * @param selectedCategory 选中的filter
   */
  const [selectedCategory, setSelectedCategory] = useState([
    EntryFilter.Action,
    EntryFilter.Assessment,
    EntryFilter.Reflect,
  ]);
  /**
   * @param useSignSdk 用户相关
   */
  const { userId } = useSignSdk();

  useEffect(() => {
    setLoading(true);
    programEntry({
      userId,
      programId: programData._id,
    }).then((result) => {
      if (result.error_code === ResponseCode.success) {
        setEntryData(result.data);
      }

      setLoading(false);
    });
  }, []);

  const { Action, Assessment, Reflect } = entryData;
  console.log('entryData', entryData);

  /**
   *
   * @param {hasAction} hasAction 是否为空
   * @param {hasAssessment} hasAssessment 是否为空
   * @param {hasReflect} hasReflect 是否为空
   * @param {emptyEntryToken} entry 是否为空
   */
  const hasAction = Action && Action.length > 0;
  const hasAssessment = Assessment && Assessment.length > 0;
  const hasReflect = Reflect && Reflect.length > 0;
  const emptyEntryToken = !hasAction && !hasAssessment && !hasReflect;

  /**
   * @param renderEntryAction 渲染action
   */
  const renderEntryAction = () => {
    const showAction = selectedCategory.some((s) => s === EntryFilter.Action);

    if (!showAction) {
      return null;
    }

    if (!hasAction) {
      return null;
    }

    return (
      <>
        {Action.map((item) => {
          const { Module = {}, PFDatas = [], EndAt = '' } = item;
          return (
            <section key={item._id}>
              <Markdown
                renderHeader={() => (
                  <RenderHeader
                    title={Module.Title}
                    subTitle={`${moment(EndAt).format('ddd, MMM D, YYYY')}`}
                    icon={imgaction}
                  />
                )}
                title="Action Name Written Here"
              >
                {PFDatas.map((data, index) => {
                  return (
                    <p key={data.title} style={{ marginBottom: 20 }}>
                      <p>
                        {`${index + 1}. `}
                        {data.title}
                      </p>
                      <p>{data.value}</p>
                    </p>
                  );
                })}
              </Markdown>
            </section>
          );
        })}
      </>
    );
  };

  /**
   * @param renderEntryAssessment 渲染Assessment
   */
  const renderEntryAssessment = () => {
    const showAssessment = selectedCategory.some(
      (s) => s === EntryFilter.Assessment,
    );

    if (!showAssessment) {
      return null;
    }
    if (!hasAssessment) {
      return null;
    }
    return <div />;
  };

  /**
   * @param renderEntryReflect 渲染Reflect
   */
  const renderEntryReflect = () => {
    if (!hasReflect) {
      return null;
    }
    return <div />;
  };

  return (
    <div
      className={`${prefix}-container-box`}
      style={{ marginLeft: 24, paddingBottom: 100 }}
    >
      <div className={`${prefix}-container-left`}>
        <div style={{ width: '100%', height: 32 }} />
        <Sort
          title="Entries"
          subTitle="Micro copy for entries"
          value="1"
          onChange={() => {}}
          options={[{ label: 'Sort by: Newest to oldest', value: '1' }]}
        />

        {loading ? (
          <>
            <Skeleton loading={loading} active avatar />
            <Skeleton loading={loading} active avatar />
            <Skeleton loading={loading} active avatar />
          </>
        ) : emptyEntryToken ? (
          <Empty
            title="No Entries"
            subTitle="Assessments, Action Results, and Reflections will appear here."
            icon={imgreflection}
          />
        ) : (
          <>
            {renderEntryAction()}

            <div style={{ width: '100%', height: 32 }} />
            {renderEntryAssessment()}

            <div style={{ width: '100%', height: 32 }} />
            {renderEntryReflect()}
          </>
        )}
      </div>
      <div className={`${prefix}-container-right`}>
        <div style={{ width: '100%', height: 32 }} />
        <Filter
          list={entryData}
          category={[
            EntryFilter.Action,
            EntryFilter.Assessment,
            EntryFilter.Reflect,
          ]}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>
    </div>
  );
};
