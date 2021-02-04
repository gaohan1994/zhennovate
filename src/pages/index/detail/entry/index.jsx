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
import { Skeleton, Card } from 'antd';
import moment from 'moment';
import Empty from '@/component/empty';
import { ArrowRightOutlined } from '@ant-design/icons';

const prefix = 'page-program';

function RenderEntryData({ data, type }) {
  // 如果是Assessment 则点击查看pdf
  const isAssessment = type === EntryFilter.Assessment;

  return (
    <>
      {data.map((item) => {
        const { Module = {}, PFDatas = [], EndAt = '' } = item;

        if (isAssessment) {
          return (
            <section key={item._id} style={{ marginBottom: 32 }}>
              <Card>
                <RenderHeader
                  title={Module.Title}
                  subTitle={`${moment(EndAt).format('ddd, MMM D, YYYY')}`}
                  icon={imgaction}
                  border={false}
                >
                  <div
                    className="component-home-welcome-check"
                    common-touch="touch"
                    style={{ bottom: '0px', right: '0px' }}
                  >
                    View Report
                    <ArrowRightOutlined
                      style={{ fontSize: 12, marginLeft: 8 }}
                    />
                  </div>
                </RenderHeader>
              </Card>
            </section>
          );
        }

        return (
          <section key={item._id} style={{ marginBottom: 32 }}>
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
}

export const EntryFilter = {
  Action: 'Action',
  Assessment: 'Assessment',
  Reflect: 'Reflect',
};

function RenderHeader(props) {
  const { icon, title, subTitle, border = true, children } = props;
  const prefix = 'page-detail';
  return (
    <div
      className={`${prefix}-custom-header  ${border && `${prefix}-custom`} `}
      zhennovate-border={border ? 'bottom' : ''}
    >
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

      {children}
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

  // const { Action, Assessment, Reflect } = entryData;

  /**
   * @param Action 渲染用的 Action 数据
   * @param Assessment 渲染用的 Assessment 数据
   * @param Reflect 渲染用的 Reflect 数据
   */
  const [Action, setAction] = useState([]);
  const [Assessment, setAssessment] = useState([]);
  const [Reflect, setReflect] = useState([]);

  useEffect(() => {
    if (entryData) {
      setAction(entryData.Action);
      setAssessment(entryData.Assessment);
      setReflect(entryData.Reflect);
    }
  }, [entryData]);

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

    return <RenderEntryData data={Action} />;
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
    return <RenderEntryData data={Assessment} type={EntryFilter.Assessment} />;
  };

  /**
   * @param renderEntryReflect 渲染Reflect
   */
  const renderEntryReflect = () => {
    const showReflect = selectedCategory.some((s) => s === EntryFilter.Reflect);
    if (!hasReflect) {
      return null;
    }
    if (!showReflect) {
      return null;
    }
    return <RenderEntryData data={Reflect} />;
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
          dataSource={entryData}
          setDataSourceHook={setEntryData}
          setSortKey="EndAt"
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
            {renderEntryReflect()}
            {renderEntryAssessment()}
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
