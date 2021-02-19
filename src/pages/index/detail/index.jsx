/**
 * @Author: centerm.gaohan
 * @Date: 2020-10-14 09:20:54
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-02-08 10:14:32
 */
import React, { useRef, useEffect, useState } from 'react';
import { Layout, Menu, Spin, notification } from 'antd';
import {
  // CalendarOutlined,
  BookOutlined,
  SolutionOutlined,
  IdcardOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import { userProgram } from '@/pages/index/program/constants';
// import { useHistory } from 'react-router-dom';
import './index.less';
import MyHeader from './component/header';
import { formatSearch } from '@/common/request';
import { formatModuleData } from './constants';
import RenderPaperForm, {
  RenderPaperformKeyTypes,
} from '@/component/paperform';
import { merge } from 'lodash';
import About from './about';
import Entry from './entry';
// import Workshop from './workshop';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import MenuItem from './component/menu-item';
// import imguncheck from '@/assets/3.数据录入-2.Radio单选框-亮色-Icon-未选.png';
import imguncheck from '@/assets/Icon_CoachingPath_Empty_36x36.svg';

const prefix = 'page-detail';

const { Sider, Content, Header } = Layout;

export default (props) => {
  // const history = useHistory();
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

  const [collapsed, setCollapsed] = useState(false);

  const { userId } = useSignSdk();

  // 当前session里完成的module数据
  const [
    currentSessionFinishedModules,
    setCurrentSessionFinishedModules,
  ] = useState([]);

  /**
   * 请求数据
   */
  useEffect(() => {
    if (params.id) {
      userProgram({
        userId,
        programId: params.id,
      })
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
        // {
        //   id: '1',
        //   title: 'Workshops',
        //   icon: <CalendarOutlined />,
        // },
        {
          id: '2',
          title: 'Coaching path',
          children: programData.Sessions ? programData.Sessions : [],
          icon: <BookOutlined />,
        },
        {
          id: '3',
          title: 'Entries',
          icon: <SolutionOutlined />,
        },
        {
          id: '4',
          title: 'About',
          icon: <IdcardOutlined />,
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

  const setSize = () => {
    if (iframeContainerRef.current.clientHeight) {
      setIframeHeight(iframeContainerRef.current.clientHeight - 64);
      setIframeWidth(iframeContainerRef.current.clientWidth);
    }
  };

  useEffect(() => {
    if (iframeContainerRef.current) {
      setSize();
    }
  }, [iframeContainerRef.current]);

  /**
   * 动态设置右侧高度
   * 为剩余屏幕高度
   */
  useEffect(() => {
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, []);

  /**
   * 监听 collapsed 如果改变了触发iframe大小改变
   */
  useEffect(() => {
    setSize();
  }, [collapsed]);

  useEffect(() => {
    if (searchParams.module_id && programData.Sessions) {
      const { moduleData, session } = formatModuleData(
        searchParams.module_id,
        programData,
      );
      // 设置当前的paperform
      setCurrentPaperform(moduleData);
      // 设置当前选中状态的menu的module
      setSelectedKeys([searchParams.module_id]);
      // 设置当前显示的是什么类型的数据
      setCurrentKey(searchParams.module_id);

      setCurrentSessionFinishedModules(session.FinishedModules);
    }
    setUrlParams(searchParams);
  }, [programData, window.location.href]);

  const onSelect = (keys) => {
    setSelectedKeys([keys.key]);
  };

  // 点击 menu 切换 href 重新触发渲染
  const onModuleClick = (item) => {
    // history.push(`/program/detail/${programData._id}?module_id=${item._id}`);
    window.location.href = `#/program/detail/${programData._id}?module_id=${item._id}`;
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
   *
   * @time 01-06 取消自动跳转
   */
  const finishPaperformCallback = (params) => {
    const { programData, postMessageData } = params;
    const {
      session,
      sessionIndex,
      moduleIndex,
      moduleId,
      moduleData,
    } = formatModuleData(postMessageData.progressData.module, programData);
    const hasNextModule = !!session.Modules[moduleIndex + 1];

    const nextFinishedModules = merge([], currentSessionFinishedModules);

    if (!moduleData.CompletePFKey) {
      // 说明没有complete的paperfrom
      nextFinishedModules.push(moduleId);
      setCurrentSessionFinishedModules(nextFinishedModules);
      return;
    }

    if (
      urlParams.paperformKey &&
      urlParams.paperformKey === RenderPaperformKeyTypes.CompletePFKey
    ) {
      // 如果是complete的paperfrom则直接完成
      nextFinishedModules.push(moduleId);
      setCurrentSessionFinishedModules(nextFinishedModules);
      return;
    }

    if (hasNextModule) {
      // 跳转到下一个module
      // const nextModule = session.Modules[moduleIndex + 1];
      // onModuleClick(nextModule);
      // setSelectedKeys([nextModule._id]);
      return;
    }

    const hasNextSession = !!programData.Sessions[sessionIndex + 1];
    if (hasNextSession) {
      // 跳转到下一个session
      // const nextSession = programData.Sessions[sessionIndex + 1];
      // const nextModule = nextSession.Modules[0];
      // setSelectedKeys([nextModule._id]);
      // setOpenKeys(['2', nextSession._id]);
      // onModuleClick(nextSession.Modules[0]);
      return;
    }

    // 结束
    // message.success('Program Finished!');
  };

  const handleMenuClick = (menu) => {
    setCurrentKey(menu.key);
  };

  const MenuTitle = ({ title, icon }) => {
    return (
      <div className={`${prefix}-menu-box`}>
        {icon}
        <span className={`${prefix}-menu-box-title`} style={{fontWeight: 900}}>{title}</span>
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
        <MyHeader data={programData} setCollapsed={setCollapsed} />
      </Header>
      <Layout
        className={`${prefix}-pos`}
        style={{ marginLeft: collapsed ? 80 : 300 }}
      >
        <Sider
          theme="light"
          className={`${
            collapsed ? `${prefix}-slider-collapse` : `${prefix}-slider`
          }`}
          collapsed={collapsed}
        >
          {programData._id && detailMenu.some((d) => d.children) && (
            <Menu
              mode="inline"
              // inlineCollapsed={}
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
                      title={<MenuTitle title={item.title} icon={item.icon} />}
                      key={item.id}
                      // icon={<AuditOutlined />}
                      className={`${
                        isSecondSelected
                          ? 'custom-antd-second-menu-selected'
                          : ''
                      } custom-antd-second-menu`}
                    >
                      {item.children.map((session) => {
                        const { FinishedSessions } = programData;
                        const currentSessionFinished =
                          FinishedSessions &&
                          FinishedSessions.some(
                            // eslint-disable-next-line max-nested-callbacks
                            (m) => m === session._id,
                          );
                        return (
                          <Menu.SubMenu
                            // title={session.Title}
                            title={
                              <MenuTitle
                                title={session.Title}
                                icon={
                                  currentSessionFinished ? (
                                    <CheckCircleFilled
                                      style={{ color: '#2fc25b' }}
                                    />
                                  ) : (
                                    <img
                                      src={imguncheck}
                                      alt=""
                                      style={{
                                        width: 12,
                                        height: 12,
                                        maxWidth: 12,
                                        maxHeight: 12,
                                        marginRight: 10,
                                      }}
                                    />
                                  )
                                }
                              />
                            }
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
                                      <MenuItem
                                        data={module}
                                        session={session}
                                        finishedModules={
                                          currentSessionFinishedModules
                                        }
                                      />
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
                    <MenuTitle title={item.title} icon={item.icon} />
                  </Menu.Item>
                );
              })}
            </Menu>
          )}
        </Sider>

        <Content className={`${prefix}`}>
          <div ref={iframeContainerRef} className={`${prefix}-box`}>
            {/* {currentKey === '1' && <Workshop programData={programData} />} */}
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
