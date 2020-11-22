/**
 * coach 页面
 * @Author: centerm.gaohan
 * @Date: 2020-10-21 16:47:44
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-22 09:38:04
 */
import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { useHistory } from 'react-router-dom';
import './index.less';

const prefix = 'program-component';

export default (props) => {
  const history = useHistory();
  const { data, id } = props;
  console.log('props', props);
  const [coachMenu, setCoachMenu] = useState([]);
  const [activeKey, setActiveKey] = useState(['']);

  useEffect(() => {
    if (data.Sessions && data.Sessions.length > 0) {
      setCoachMenu(data.Sessions);
    }
  }, [data.Sessions]);

  const onModuleClick = (item) => {
    history.push(`/program/detail/${id}?module_id=${item._id}`);
  };

  return (
    <div>
      <div className={`${prefix}-coach-title`}>Coaching Path</div>
      <Collapse activeKey={activeKey} onChange={(keys) => setActiveKey(keys)}>
        {coachMenu.map((item) => {
          return (
            <Collapse.Panel
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
                    >
                      <div className={`${prefix}-coach-module-dot`} />
                      {moduleItem.Title}
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
