import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { ACTION_TYPES_COMMON } from '@/component/paperform-modal/store';

function PaperfromModal(props) {
  console.log('props');
  const { paperformModal, dispatch } = props;
  const { visible } = paperformModal;
  const commonUrl = 'http://znadmin.tprlearn.com/paperform.html';
  return (
    <Modal
      visible={visible}
      footer={null}
      // width='80vw'
      // bodyStyle={{ padding: 0 }}
      onCancel={() => {
        dispatch({ type: ACTION_TYPES_COMMON.CHANGE_PAPERFORM_MODAL_VISIBLE });
      }}
    >
      <div>
        <iframe width={500} height={300} src={`${commonUrl}?id=1hw67gdf`} />
      </div>
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
