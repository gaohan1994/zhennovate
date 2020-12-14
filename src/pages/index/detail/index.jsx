/**
 * @Author: centerm.gaohan
 * @Date: 2020-10-14 09:20:54
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-12-14 16:16:45
 */
import React, { useRef, useEffect, useState } from 'react';
import { Layout, Menu, Spin, notification, message } from 'antd';
import { AuditOutlined, CheckCircleFilled } from '@ant-design/icons';
import { program } from '@/pages/index/program/constants';
import { useHistory } from 'react-router-dom';
import './index.less';
import MyHeader from './component/header';
import { formatSearch } from '@/common/request';
import { formatModuleData } from './constants';
import RenderPaperForm from '@/component/paperform';
import imgwork from '@/assets/Icon-Workshop@2x.png';
import imgcoach from '@/assets/Icon-CoachingPAth@2x.png';
import imgentry from '@/assets/Icon-Entry@2x.png';
import imgabout from '@/assets/Icon-About@2x.png';

import About from './about';
import Entry from './entry';
import Workshop from './workshop';

const prefix = 'page-detail';

const { Sider, Content, Header } = Layout;

export default (props) => {
  const history = useHistory();
  const searchParams = formatSearch(props.location.search);
  const { params } = props.match;

  const [urlParams, setUrlParams] = useState({});
  // iframe相关
  const iframeContainerRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(-1);
  const [iframeWidth, setIframeWidth] = useState(-1);

  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const [detailMenu, setDetailMenu] = useState([]);

  // detail数据
  const [programData, setProgramData] = useState({});

  // 选中的paperform数据
  const [currentPaperform, setCurrentPaperform] = useState({});

  const [currentKey, setCurrentKey] = useState('');

  /**
   * 请求数据
   */
  useEffect(() => {
    if (params.id) {
      program(params.id)
        .then((result) => {
          setProgramData(result.data);
        })
        .catch((error) => {
          notification.error({ message: error.message });
        });
    }
  }, [params.id]);

  /**
   * 创建program侧边栏menu
   */
  useEffect(() => {
    if (programData) {
      const commonMenu = [
        {
          id: '1',
          title: 'Workshops',
          icon: imgwork,
        },
        {
          id: '2',
          title: 'Coaching Path',
          children: programData.Sessions ? programData.Sessions : [],
          icon: imgcoach,
        },
        {
          id: '3',
          title: 'Entries',
          icon: imgentry,
        },
        {
          id: '4',
          title: 'About',
          icon: imgabout,
        },
      ];
      setDetailMenu(commonMenu);
      setCurrentKey('1');
      setSelectedKeys(['1']);

      if (searchParams?.module_id) {
        const defaultOpenKeys = getDefaultKeys();
        setOpenKeys(defaultOpenKeys);
      }
    }
  }, [programData]);

  /**
   * 动态设置右侧高度
   * 为剩余屏幕高度
   */
  useEffect(() => {
    if (iframeContainerRef.current.clientHeight) {
      setIframeHeight(iframeContainerRef.current.clientHeight - 64);
      setIframeWidth(iframeContainerRef.current.clientWidth);
    }
  }, [iframeContainerRef.current]);

  useEffect(() => {
    if (searchParams.module_id && programData.Sessions) {
      const { moduleData } = formatModuleData(
        searchParams.module_id,
        programData,
      );
      setCurrentPaperform(moduleData);
      setSelectedKeys([searchParams.module_id]);
      setCurrentKey(searchParams.module_id);
    }
    setUrlParams(searchParams);
  }, [programData, window.location.href]);

  const onSelect = (keys) => {
    setSelectedKeys([keys.key]);
  };

  // 点击 menu 切换 href 重新触发渲染
  const onModuleClick = (item) => {
    history.push(`/program/detail/${programData._id}?module_id=${item._id}`);
  };

  const getDefaultKeys = () => {
    if (searchParams.module_id && programData._id) {
      const { session } = formatModuleData(searchParams.module_id, programData);
      return ['2', session._id];
    } else {
      return [];
    }
  };

  /**
   * 完成paperform之后
   * 跳转到下一个module如果没有下一个module
   * 则跳转到下一个session的第一个module
   * 如果没有下一个session
   * 则结束
   */
  const finishPaperformCallback = (params) => {
    const { programData, postMessageData } = params;
    const { session, sessionIndex, moduleIndex } = formatModuleData(
      postMessageData.progressData.module,
      programData,
    );
    const hasNextModule = !!session.Modules[moduleIndex + 1];

    if (hasNextModule) {
      // 跳转到下一个module
      const nextModule = session.Modules[moduleIndex + 1];
      onModuleClick(nextModule);
      // setSelectedKeys([nextModule._id]);
      return;
    }

    const hasNextSession = !!programData.Sessions[sessionIndex + 1];
    if (hasNextSession) {
      // 跳转到下一个session
      const nextSession = programData.Sessions[sessionIndex + 1];
      // const nextModule = nextSession.Modules[0];
      // setSelectedKeys([nextModule._id]);
      // setOpenKeys(['2', nextSession._id]);
      onModuleClick(nextSession.Modules[0]);
      return;
    }

    // 结束
    message.success('Program Finished!');
  };

  const handleMenuClick = (menu) => {
    setCurrentKey(menu.key);
  };

  const MenuTitle = ({ title }) => {
    return (
      <div className={`${prefix}-menu-box`}>
        <AuditOutlined />
        <span className={`${prefix}-menu-box-title`}>{title}</span>
      </div>
    );
  };

  return (
    <Layout
      className={`${prefix}-pos`}
      style={{
        position: 'fixed',
        top: 64,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Header style={{ backgroundColor: '#fff', padding: 0, height: 72 }}>
        <MyHeader data={programData} />
      </Header>
      <Layout className={`${prefix}-pos`} style={{ marginLeft: 256 }}>
        <Sider theme="light" className={`${prefix}-slider`}>
          {programData._id && detailMenu.some((d) => d.children) && (
            <Menu
              mode="inline"
              selectedKeys={selectedKeys}
              onSelect={onSelect}
              openKeys={openKeys}
              onOpenChange={setOpenKeys}
              onClick={handleMenuClick}
              className="custom-antd-first-menu"
            >
              {detailMenu.map((item) => {
                if (item.children) {
                  /**
                   * 二级标题适配UI
                   */
                  const isSecondSelected =
                    selectedKeys.findIndex((s) => s.length > 5) > -1;
                  return (
                    <Menu.SubMenu
                      title={<MenuTitle title={item.title} />}
                      key={item.id}
                      // icon={<AuditOutlined />}
                      className={`${
                        isSecondSelected
                          ? 'custom-antd-second-menu-selected'
                          : ''
                      } custom-antd-second-menu`}
                    >
                      {item.children.map((session) => {
                        return (
                          <Menu.SubMenu
                            title={session.Title}
                            key={session._id}
                            className="custom-antd-menu"
                          >
                            {session.Modules
                              ? session.Modules.map((module) => {
                                  return (
                                    <Menu.Item
                                      style={{ paddingLeft: 48 }}
                                      key={module._id}
                                      onClick={() => onModuleClick(module)}
                                    >
                                      <div className={`${prefix}-menu`}>
                                        <div className={`${prefix}-menu-check`}>
                                          <CheckCircleFilled
                                            style={{ color: '#2fc25b' }}
                                          />
                                        </div>
                                        <span
                                          className={`${prefix}-menu-title`}
                                        >
                                          {module.Title}
                                        </span>
                                        <span
                                          className={`${prefix}-menu-desc`}
                                          style={{ marginTop: 2, fontSize: 12 }}
                                        >
                                          {module.Type}
                                          <span className="dot" />
                                          {`${module.Duration} min`}
                                        </span>
                                      </div>
                                    </Menu.Item>
                                  );
                                })
                              : ''}
                          </Menu.SubMenu>
                        );
                      })}
                    </Menu.SubMenu>
                  );
                }
                return (
                  <Menu.Item key={item.id}>
                    <MenuTitle title={item.title} />
                  </Menu.Item>
                );
              })}
            </Menu>
          )}
        </Sider>

        <Content className={`${prefix}`}>
          <div ref={iframeContainerRef} className={`${prefix}-box`}>
            {currentKey === '1' && <Workshop programData={programData} />}
            {currentKey === '3' && <Entry programData={programData} />}
            {currentKey === '4' && <About programData={programData} />}
            {currentKey && currentKey.length > 5 && (
              <div>
                {currentPaperform &&
                currentPaperform._id &&
                iframeHeight !== -1 ? (
                  <RenderPaperForm
                    height={iframeHeight}
                    width={iframeWidth}
                    data={currentPaperform}
                    programData={programData}
                    paperformKey={urlParams?.paperformKey}
                    callback={finishPaperformCallback}
                  />
                ) : (
                  <div className={`${prefix}-spin`}>
                    <Spin size="large" mode="center" />
                  </div>
                )}
              </div>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
