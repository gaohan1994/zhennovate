import React from 'react';
import { Modal, Button } from 'antd';
import '../index.less';

const prefix = 'component-paperform';

function PaperformActionModal(props) {
  const {
    title,
    width = 527,
    subTitle,
    visible,
    setVisible,
    confirmButton,
    confirmCallback,
    secondButton,
    secondCallback,
    icon,
    bodyStyle,
    img,
  } = props;

  const onCancel = () => {
    setVisible(false);
  };

  const onConfirmButtonClick = () => {
    onCancel();
    confirmCallback && confirmCallback();
  };

  const secondButtonClick = () => {
    onCancel();
    secondCallback && secondCallback();
  };

  return (
    <Modal
      footer={null}
      centered
      width={width}
      closable={false}
      visible={visible}
      onCancel={onCancel}
      bodyStyle={bodyStyle || { padding: '40px 90px 32px 90px' }}
    >
      <div className={`${prefix}-modal`}>
        {img && <img src={img} alt="" />}
        {icon && (
          <div
            className={`${prefix}-modal-icon`}
            style={{ backgroundImage: `url(${icon})` }}
          />
        )}

        <span className={`${prefix}-modal-title`}>{title}</span>
        <span className={`${prefix}-modal-subtitle`}>{subTitle}</span>
        {confirmButton && (
          <Button
            type="primary"
            size="large"
            style={{ marginTop: 16, width: 281 }}
            onClick={onConfirmButtonClick}
          >
            {confirmButton}
          </Button>
        )}
        {secondButton && (
          <div
            className={`${prefix}-modal-second`}
            style={{ marginTop: 16 }}
            onClick={secondButtonClick}
          >
            {secondButton}
          </div>
        )}
      </div>
    </Modal>
  );
}

export { PaperformActionModal };
export default PaperformActionModal;
