/**
 * coach 页面
 * @Author: centerm.gaohan
 * @Date: 2020-10-21 16:47:44
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-08 16:47:47
 */
import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './index.less';
import { ACTION_TYPES_COMMON } from '@/component/paperform-modal/store';
import useSignSdk from '@/pages/sign/store/sign-sdk';

const prefix = 'program-component';

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { data, id } = props;
  const [coachMenu, setCoachMenu] = useState([]);
  const [activeKey, setActiveKey] = useState(['']);
  const [hoverModuleId, setHoverModuleId] = useState('');
  // const [defaultKeys, setDefaultKeys] = useState([]);

  const { checkSign } = useSignSdk();

  useEffect(() => {
    if (data.Sessions && data.Sessions.length > 0) {
      setCoachMenu(data.Sessions);

      const defaultActiveKeys =
        data.Sessions && data.Sessions.length > 0
          ? data.Sessions.map((session) => session.Title)
          : [];

      setActiveKey(defaultActiveKeys);
    }
  }, [data.Sessions]);

  const onModuleClick = (item) => {
    history.push(`/program/detail/${id}?module_id=${item._id}`);
  };

  // 阻止冒泡
  const onPreview = (event, item) => {
    event.stopPropagation();
    dispatch({
      type: ACTION_TYPES_COMMON.CHANGE_PAPERFORM_MODAL_VISIBLE,
      payload: {
        data,
        visible: true,
        moduleData: item,
      },
    });
  };
  return (
    <div>
      <div className={`${prefix}-coach-title`}>Coaching path</div>
      <Collapse activeKey={activeKey} onChange={(keys) => setActiveKey(keys)}>
        {coachMenu.map((item) => {
          return (
            <Collapse.Panel
              className="custom-collapse"
              key={item.Title}
              style={{
                fontWeight:
                  activeKey.findIndex((k) => k === item.Title) !== -1
                    ? 'bold'
                    : 'normal',
              }}
              header={item.Title}
            >
              {item.Modules &&
                item.Modules.map((moduleItem) => {
                  return (
                    <div
                      key={moduleItem._id}
                      className={`${prefix}-coach-module`}
                      onClick={() => onModuleClick(moduleItem)}
                      onMouseEnter={() => setHoverModuleId(moduleItem._id)}
                      onMouseLeave={() => setHoverModuleId('')}
                    >
                      <div className={`${prefix}-coach-module-dot`} />
                      {moduleItem.Title}
                      {hoverModuleId === moduleItem._id && (
                        <div
                          onClick={(event) => {
                            checkSign(() => onPreview(event, moduleItem));
                          }}
                          className={`${prefix}-coach-preview`}
                        >
                          Preview
                        </div>
                      )}
                    </div>
                  );
                })}
            </Collapse.Panel>
          );
        })}
      </Collapse>
    </div>
  );
};
