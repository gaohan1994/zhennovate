/**
 * program 面包屑
 * @Author: centerm.gaohan
 * @Date: 2020-10-21 14:32:16
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-21 14:40:26
 */
import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

export default (props) => {
  const { data, entry } = props;
  return (
    <Breadcrumb style={{ marginTop: 32, marginBottom: 32 }}>
      <Breadcrumb.Item>
        <Link to="/program">Program</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to={`/program/${entry}`}>{entry}</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link>{data.Name}</Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};
