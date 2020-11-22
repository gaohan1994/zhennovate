/**
 * @Author: centerm.gaohan
 * @Date: 2020-10-14 09:20:54
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2020-10-20 09:17:25
 */
import React, { useRef, useEffect, useState } from 'react';
import { Layout, Menu, Spin, notification } from 'antd';
// import { useDispatch } from 'react-redux';
import { program } from '@/pages/index/program/constants';
import postMessageSdk from '@/common/post-message-sdk';
import './index.less';
import MyHeader from './component/header';
import { formatSearch } from '@/common/request';

const prefix = 'page-detail';

const { Sider, Content, Header } = Layout;

/**
 * @time 10 13
 * @question iframe的高度放到外层
 * @question 视频和paperfrom结合
 * @question paperfrom会保存做过的状态
 *
 * 渲染paperform function
 *
 * @param {*} props
 * @return {*}
 */
const RenderPaperForm = (props) => {
  // const dispatch = useDispatch();
  const commonUrl = 'http://znadmin.tprlearn.com/paperform.html';
  const { data, ...rest } = props;
  console.log('data,', data);
  // if (paperform.type === 'modal') {
  //   return (
  //     <div>
  //       <Button
  //         onClick={() => {
  //           dispatch({
  //             type: 'CHANGE_PAPERFORM_MODAL_VISIBLE',
  //             payload: true,
  //           });
  //         }}
  //       >
  //         open paperform modal
  //       </Button>
  //     </div>
  //   );
  // }
  return (
    <iframe
      {...rest}
      src={`${commonUrl}?id=${data.PFKey}&time=${new Date().getTime()}`}
    />
  );
};

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
      console.log('programData.Sessions', programData.Sessions);
      const commonMenu = [
        {
          id: '1',
          title: 'Workshops',
        },
        {
          id: '2',
          title: 'Coaching Path',
          children: programData.Sessions ? programData.Sessions : [],
        },
        {
          id: '3',
          title: 'Entries',
        },
        {
          id: '4',
          title: 'About',
        },
      ];
      setDetailMenu(commonMenu);
    }
  }, [programData]);

  /**
   * 动态设置右侧高度
   * 为剩余屏幕高度
   */
  useEffect(() => {
    if (iframeContainerRef.current.clientHeight) {
      // console.log(
      //   'iframeContainerRef.current.clientHeight,',
      //   iframeContainerRef.current.clientHeight - 64,
      // );
      setIframeHeight(iframeContainerRef.current.clientHeight - 64);
      setIframeWidth(iframeContainerRef.current.clientWidth);
    }
  }, [iframeContainerRef.current]);

  useEffect(() => {
    if (searchParams.module_id && programData.Sessions) {
      let indexs = [];
      programData.Sessions?.forEach((s, sindex) => {
        const token = s.Modules?.findIndex((m) => {
          return m._id === searchParams?.module_id;
        });

        if (token > -1) {
          indexs = [sindex, token];
        }
      });
      const session = programData.Sessions[indexs[0]];
      const moduleItem = session.Modules[indexs[1]];
      setCurrentPaperform(moduleItem);
    }
  }, [searchParams, programData]);

  /**
   * 监听window.postmessage事件
   */
  useEffect(() => {
    window.addEventListener('message', postMessageSdk.receiveMessage, false);
    return () =>
      window.removeEventListener('message', postMessageSdk.receiveMessage);
  }, []);

  const onSelect = (keys) => {
    // console.log('keys', keys);
    setSelectedKeys([keys.key]);
  };

  const onModuleClick = (item) => {
    setCurrentPaperform(item);
  };

  const defaultKeys = [
    '2',
    programData.Sessions?.find((s) => {
      return s.Modules.some((m) => {
        return m._id === searchParams?.module_id;
      });
    })?._id || '',
  ];
  console.log('defaultKeys, ', defaultKeys);
  return (
    <Layout
      className={`${prefix}-pos`}
      style={{ position: 'fixed', top: 64, left: 0, right: 0, bottom: 0 }}
    >
      <Header style={{ backgroundColor: '#fff', padding: 0, height: 72 }}>
        <MyHeader />
      </Header>
      <Layout className={`${prefix}-pos`} style={{ marginLeft: 200 }}>
        <Sider theme="light" className={`${prefix}-slider`}>
          {detailMenu.some((d) => d.children) && (
            <Menu
              mode="inline"
              selectedKeys={selectedKeys}
              onSelect={onSelect}
              defaultOpenKeys={searchParams?.module_id ? defaultKeys : []}
              defaultSelectedKeys={
                searchParams?.module_id
                  ? [
                      // programData.Sessions?.find((s) => {
                      //   return s.Modules.some((m) => {
                      //     return m._id === searchParams?.module_id;
                      //   });
                      // })?._id || '',
                      searchParams?.module_id,
                    ]
                  : []
              }
              // openKeys={openKeys}
              // onOpenChange={onOpenChange}
            >
              {detailMenu.map((item) => {
                if (item.children) {
                  return (
                    <Menu.SubMenu title={item.title} key={item.id}>
                      {item.children.map((session) => {
                        return (
                          <Menu.SubMenu title={session.Title} key={session._id}>
                            {session.Modules
                              ? session.Modules.map((module) => {
                                  return (
                                    <Menu.Item
                                      key={module._id}
                                      onClick={() => onModuleClick(module)}
                                    >
                                      {module.Title}
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
                return <Menu.Item key={item.id}>{item.title}</Menu.Item>;
              })}
            </Menu>
          )}
        </Sider>

        <Content className={`${prefix}`}>
          <div ref={iframeContainerRef} className={`${prefix}-box`}>
            {currentPaperform && currentPaperform._id && iframeHeight !== -1 ? (
              <RenderPaperForm
                data={currentPaperform}
                height={iframeHeight}
                width={iframeWidth}
              />
            ) : (
              <div className={`${prefix}-spin`}>
                <Spin size="large" />
              </div>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
