/**
 * @Author: centerm.gaohan
 * @Date: 2020-10-14 09:20:54
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-12-03 14:12:48
 */
import React, { useRef, useEffect, useState } from 'react';
import { Layout, Menu, Spin, notification } from 'antd';
import { AuditOutlined } from '@ant-design/icons';
import { program } from '@/pages/index/program/constants';
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
  const searchParams = formatSearch(props.location.search);
  const { params } = props.match;

  // iframe相关
  const iframeContainerRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(-1);
  const [iframeWidth, setIframeWidth] = useState(-1);

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
  }, [programData]);

  const onSelect = (keys) => {
    setSelectedKeys([keys.key]);
  };

  const onModuleClick = (item) => {
    setCurrentPaperform(item);
  };

  const getDefaultKeys = () => {
    if (searchParams.module_id && programData._id) {
      const { session } = formatModuleData(searchParams.module_id, programData);
      return ['2', session._id];
    } else {
      return [];
    }
  };

  // 做完paperfrom的callback
  const finishPaperformCallback = (data) => {
    console.log('data', data);
  };

  const handleMenuClick = (menu) => {
    console.log('menu', menu);
    setCurrentKey(menu.key);
  };

  return (
    <Layout
      className={`${prefix}-pos`}
      style={{ position: 'fixed', top: 64, left: 0, right: 0, bottom: 0 }}
    >
      <Header style={{ backgroundColor: '#fff', padding: 0, height: 72 }}>
        <MyHeader data={programData} />
      </Header>
      <Layout className={`${prefix}-pos`} style={{ marginLeft: 200 }}>
        <Sider theme="light" className={`${prefix}-slider`}>
          {programData._id && detailMenu.some((d) => d.children) && (
            <Menu
              mode="inline"
              selectedKeys={selectedKeys}
              onSelect={onSelect}
              defaultOpenKeys={searchParams?.module_id ? getDefaultKeys() : []}
              onClick={handleMenuClick}
            >
              {detailMenu.map((item) => {
                if (item.children) {
                  return (
                    <Menu.SubMenu
                      title={item.title}
                      key={item.id}
                      icon={<AuditOutlined />}
                    >
                      {item.children.map((session) => {
                        return (
                          <Menu.SubMenu title={session.Title} key={session._id}>
                            {session.Modules
                              ? session.Modules.map((module) => {
                                  return (
                                    <Menu.Item
                                      style={{ paddingLeft: 48 }}
                                      key={module._id}
                                      onClick={() => onModuleClick(module)}
                                    >
                                      <div className={`${prefix}-menu`}>
                                        <span>{module.Title}</span>
                                        <span
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
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      {item.icon ? (
                        <div
                          className={`${prefix}-icon`}
                          style={{ backgroundImage: `url(${item.icon})` }}
                        />
                      ) : null}
                      {item.title}
                    </div>
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
