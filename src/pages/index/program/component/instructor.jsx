/**
 * program 老师详情
 * @Author: centerm.gaohan
 * @Date: 2020-10-21 16:29:48
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-12-24 14:22:03
 */
import React from 'react';
// import { Card } from 'antd';
import './index.less';
import ShowMore from './showmore';

const prefix = 'program-component';

export default (props) => {
  const { data } = props;

  // 是否显示更多
  // const [status, setStatus] = useState(false);

  const renderTeacherData =
    data.Teachers && data.Teachers.length > 0
      ? status === true
        ? data.Teachers
        : [data.Teachers[0]]
      : [];

  return (
    <ShowMore title="Instructor">
      {(status) => {
        return (
          <div>
            {renderTeacherData &&
              renderTeacherData.map((item, index) => {
                return (
                  <div key={index} className={`${prefix}-instructor-item`}>
                    {item.Avatar && (
                      <div
                        className={`${prefix}-instructor-item-cover`}
                        style={{ backgroundImage: `url(${item.Avatar})` }}
                      />
                    )}
                    <div className={`${prefix}-instructor-item-detail`}>
                      <div
                        className={`${prefix}-instructor-item-name`}
                        style={{ marginBottom: 12 }}
                      >
                        {item.Name}
                      </div>
                      <div
                        className={`${prefix}-instructor-item-text ${
                          status ? '' : `${prefix}-markdown-overflow`
                        }`}
                      >
                        {item.Desc}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        );
      }}
    </ShowMore>
    // <Card>
    //   <div className={`${prefix}-title`}>Instructor</div>
    //   {}
    //   <div
    //     className={`${prefix}-markdown-more`}
    //     onClick={() => setStatus(!status)}
    //   >
    //     Show {status === true ? 'less' : 'more'}
    //   </div>
    // </Card>
  );
};
