import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { ACTION_TYPES_COMMON } from '@/component/paperform-modal/store';
import RenderPaperForm from '../paperform';

function PaperfromModal(props) {
  const { paperformModal, dispatch } = props;
  const { visible, data, moduleData } = paperformModal;

  return (
    <Modal
      visible={visible}
      footer={null}
      width={860}
      height={558}
      centered
      bodyStyle={{ height: '100%' }}
      title={moduleData.Title}
      onCancel={() => {
        dispatch({
          type: ACTION_TYPES_COMMON.CHANGE_PAPERFORM_MODAL_VISIBLE,
          payload: { visible: false },
        });
      }}
    >
      <RenderPaperForm
        width={812}
        height={452}
        data={moduleData}
        programData={data}
        callback={() => {
          dispatch({
            type: ACTION_TYPES_COMMON.CHANGE_PAPERFORM_MODAL_VISIBLE,
            payload: { visible: false },
          });
        }}
      />
    </Modal>
  );
}

const mapState = (state) => {
  return {
    paperformModal: state.paperformModal,
  };
};

const mapDispatch = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapState, mapDispatch)(PaperfromModal);
